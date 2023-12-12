param location string = resourceGroup().location

var tags = {
  'cost-category': 'core'
}

@allowed([
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_LRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Standard_ZRS'
])
param skuName string

var unique = substring(uniqueString(resourceGroup().id), 0, 12)

// Storage Account Contributor
var roleDefinitionId = '17d1049b-9a84-46fb-8f53-869881c3d3ab'

resource blobStorage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'stsswwebsite${unique}'
  location: location
  tags: tags
  sku: {
    name: skuName
  }
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    publicNetworkAccess: 'Enabled'
    accessTier: 'Hot'
    supportsHttpsTrafficOnly: true
    routingPreference: {
      publishMicrosoftEndpoints: true
      publishInternetEndpoints: true
      routingChoice: 'InternetRouting'
    }
    minimumTlsVersion: 'TLS1_2'
  }
}

resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2022-09-01' = {
  name: 'default'
  parent: blobStorage
  properties: {
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: true
      days: 7
    }
    cors: {
      corsRules: [
        {
          allowedHeaders: [
            '*'
          ]
          allowedMethods: [
            'GET'
            'HEAD'
            'OPTIONS'
          ]
          allowedOrigins: [
            '*'
          ]
          exposedHeaders: [
            '*'
          ]
          maxAgeInSeconds: 86400
        }
      ]
    }
  }
}

resource webContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  name: '$web'
  parent: blobServices
  properties: {
    publicAccess: 'Container'
  }
}

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'id-blob-archive'
  location: location
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, roleDefinitionId)
  scope: resourceGroup()
  properties: {
    // Storage Account Contributor
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}


resource enableStaticSite 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'script-enableStaticSite'
  location: location
  kind: 'AzureCLI'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  dependsOn: [
    blobServices
    roleAssignment
    webContainer
  ]
  properties: {
    azCliVersion: '2.53.0'
    scriptContent: 'az storage blob service-properties update --account-name ${blobStorage.name} --static-website --404-document 404.html --index-document index.html --auth-mode login'
    retentionInterval: 'PT24H'
  }
}

output staticWebsiteUrl string = blobStorage.properties.primaryEndpoints.web
