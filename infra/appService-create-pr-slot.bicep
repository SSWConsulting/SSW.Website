param location string
param appServiceName string
param slotName string
param acrLoginServer string
param keyVaultName string
param appInsightConnectionString string
param tags object


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
    name: 'GOOGLE_RECAPTCHA_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Google-Recaptcha-KEY)'
  }
  {
    name: 'NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING'
    value: appInsightConnectionString
  }
  {
    name: 'YOUTUBE_PRIVATE_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/YOUTUBE-PRIVATE-KEY)'
  }
  {
    name: 'WEBSITE_TIME_ZONE'
    value: 'Australia/Sydney'
  }
]


resource prodSlot 'Microsoft.Web/sites@2023-01-01' existing = {
  name: appServiceName
}

resource prSlot 'Microsoft.Web/sites/slots@2023-01-01' = {
  name: slotName
  parent: prodSlot
  location: location
  tags:tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: prodSlot.properties.serverFarmId
    siteConfig: {
      appSettings: appSettings
      acrUseManagedIdentityCreds: true
    }
    clientAffinityEnabled: false
  }
}

output slotPrincipalId string = prSlot.identity.principalId
