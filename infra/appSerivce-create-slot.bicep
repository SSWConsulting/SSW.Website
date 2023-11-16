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
    name: 'CREATE_LEAD_ENDPOINT'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Create-Lead-Endpoint-Dev)'
  }
  {
    name: 'GOOGLE_RECAPTCHA_KEY'
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
  {
    name: 'NEWSLETTERS_ENDPOINT'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/Newsletters-Endpoint-Dev)'
  }
  {
    name: 'MICROSOFT_OAUTH_TENANT_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/MICROSOFT-OAUTH-TENANT-ID)'
  }
  {
    name: 'MICROSOFT_OAUTH_CLIENT_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/MICROSOFT-OAUTH-CLIENT-ID)'
  }
  {
    name: 'MICROSOFT_OAUTH_CLIENT_SECRET'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/MICROSOFT-OAUTH-CLIENT-SECRET)'
  }
  {
    name: 'SHAREPOINT_SITE_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/SHAREPOINT-SITE-ID)'
  }
  {
    name: 'SHAREPOINT_EVENTS_LIST_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/SHAREPOINT-EVENTS-LIST-ID)'
  }
  {
    name: 'SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/SHAREPOINT-EXTERNAL-PRESENTERS-LIST-ID)'
  }
  {
    name: 'RECAPTCHA_BYPASS_SECRET'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/SECRET-KEY-TO-BYPASS-RECAPTCHA)'
  }
  {
    name: 'DYNAMICS_CLIENT_ID'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/DYNAMICS-CLIENT-ID)'
  }
  {
    name: 'DYNAMICS_CLIENT_SECRET'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/DYNAMICS-CLIENT-SECRET)'
  }
  {
    name: 'YOUTUBE_PRIVATE_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/YOUTUBE-PRIVATE-KEY)'
  }
]


resource prodSlot 'Microsoft.Web/sites@2022-03-01' existing =  {
  name: appServiceName
}

resource prSlot 'Microsoft.Web/sites/slots@2021-02-01' = {
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
