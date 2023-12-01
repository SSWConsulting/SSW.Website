param now string
param location string = resourceGroup().location

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
param skuName string = 'Standard_LRS'

resource blobStorage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'storageaccount-${now}'
  location: location
  sku: {
    name: skuName
  }
  kind: 'BlobStorage'
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
