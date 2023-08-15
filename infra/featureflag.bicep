param location string = resourceGroup().location
param configurationStoreName string
param featureFlagExists bool
param featureFlagName string

// Create the configuration store
resource configurationStore 'Microsoft.AppConfiguration/configurationStores@2023-03-01' = {
  name: configurationStoreName
  location: location
  // tags: {
  //   tagName1: 'tagValue1'
  //   tagName2: 'tagValue2'
  // }
  sku: {
    name: 'Standard'
  }
  identity: {
    type: 'string'
    userAssignedIdentities: {}
  }
  properties: {
    createMode: 'Default'
    disableLocalAuth: false
    enablePurgeProtection: false
    // encryption: {
    //   keyVaultProperties: {
    //     identityClientId: 'string'
    //     keyIdentifier: 'string'
    //   }
    // }
    publicNetworkAccess: 'Disabled'
    softDeleteRetentionInDays: 7
  }
}

// Only create the feature flag if not exists
resource featureFlag 'Microsoft.AppConfiguration/configurationStores/keyValues@2021-10-01-preview' = if (!featureFlagExists) {
  name: '.appconfig.featureflag~2F${featureFlagName}'
  parent: configurationStore
  properties: {
    contentType: 'application/vnd.microsoft.appconfig.ff+json;charset=utf-8'
    tags: {}
    value: '{"id": "${featureFlagName}", "description": "", "enabled": false, "conditions": {"client_filters":[]}}'
  }
}
