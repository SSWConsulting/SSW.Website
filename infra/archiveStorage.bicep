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

resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
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
}
