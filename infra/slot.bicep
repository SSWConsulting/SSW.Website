param location string
param appServiceName string
param slotName string
param ACR_LOGIN_SERVER string


var appSettings = [
  {
    name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
    value: 'false'
  }
  {
    name: 'WEBSITES_PORT'
    value: '3000'
  }
  {
    name: 'DOCKER_REGISTRY_SERVER_URL'
    value: 'https://${ACR_LOGIN_SERVER}'
  }
  {
    name: 'CREATE_LEAD_ENDPOINT'
    value: '@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Create-Lead-Endpoint-Dev/cc1fda66c2374f1897baeaa65dc40074)'
  }
  {
    name: 'GOOGLE_RECAPTCHA_KEY_V2'
    value: '@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Google-Recaptcha-KEY/876516e1ed224b4788065a65fb3d2a52)'
  }
  {
    name: 'GOOGLE_RECAPTCHA_SITE_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Google-Recaptcha-Site-KEY/72fd24e47c324d57b0e64cee02d03549)'
  }
]


resource prodSlot 'Microsoft.Web/sites@2022-03-01' existing =  {
  name: appServiceName
}

resource prSlot 'Microsoft.Web/sites/slots@2021-02-01' = {
  name: slotName
  parent: prodSlot
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: prodSlot.properties.serverFarmId
    siteConfig: {
      appSettings: appSettings
      acrUseManagedIdentityCreds: true
    }
  }
}

output slotPrincipalId string = prSlot.identity.principalId
