param now string
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

resource blobStorage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'storageaccount-${now}'
  location: location
  tags: tags
  sku: {
    name: skuName
  }
  identity: {
    type: 'SystemAssigned'
  }
  kind: 'BlobStorage'
  properties: {
    allowBlobPublicAccess: true
  }
}

resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2022-09-01' = {
  name: 'default'
  parent: blobStorage
  properties: {
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
    publicAccess: 'Blob'
  }
}

resource enableStaticSite 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'enableStaticSite'
  location: location
  kind: 'AzurePowerShell'
  identity: {
    type: 'SystemAssigned'
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
