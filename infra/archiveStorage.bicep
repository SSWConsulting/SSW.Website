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

var unique = substring(uniqueString(resourceGroup().id), 0, 8)

resource blobStorage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'blobsswwebsite${unique}'
  location: location
  tags: tags
  sku: {
    name: skuName
  }
  kind: 'BlobStorage'
  properties: {
    allowBlobPublicAccess: true
    publicNetworkAccess: 'Enabled'
    accessTier: 'Hot'
    supportsHttpsTrafficOnly: true
  }
}

resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2022-09-01' = {
  name: 'default'
  parent: blobStorage
  properties: {
    changeFeed: {
      enabled: false
    }
    restorePolicy: {
      enabled: false
    }
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
  name: 'blob-archive-static-site-script'
  location: location
}


resource enableStaticSite 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'enableStaticSite'
  location: location
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    azPowerShellVersion: '3.0'
    scriptContent: loadTextContent('./scripts/enable-static-site.ps1')
    retentionInterval: 'PT24H'
    environmentVariables: [
      {
        name: 'IndexDocumentPath'
        value: 'index.html'
      }
      {
        name: 'ErrorDocument404Path'
        value: '404.html'
      }
      {
        name: 'ResourceGroupName'
        value: resourceGroup().name
      }
      {
        name: 'StorageAccountName'
        value: blobStorage.name
      }
    ]
  }
}

output staticWebsiteUrl string = blobStorage.properties.primaryEndpoints.web
