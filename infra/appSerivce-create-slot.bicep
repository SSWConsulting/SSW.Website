param location string
param appServiceName string
param slotName string
param acrLoginServer string
param keyVaultName string
param appInsightConnectionString string


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
    value: 'https://${acrLoginServer}'
  }
  {
    name: 'CREATE_LEAD_ENDPOINT'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Create-Lead-Endpoint-Dev)'
  }
  {
    name: 'GOOGLE_RECAPTCHA_KEY_V2'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Google-Recaptcha-KEY)'
  }
  {
    name: 'GOOGLE_RECAPTCHA_SITE_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Google-Recaptcha-Site-KEY)'
  }
  {
    name: 'NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING'
    value: appInsightConnectionString
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
