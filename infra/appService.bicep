param now string
param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param tags object
param dockerRegistryServerURL string
param appInsightConnectionString string
param keyVaultName string
param skuName string
param skuCapacity int

param healthCheckPath string = '/'


param acrName string

@description('The docker image')
param dockerImage string = 'sswwebsite'

var entropy = substring(guid(subscription().subscriptionId, resourceGroup().id), 0, 4)

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' existing = {
  name: acrName
}

resource plan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'plan-${projectName}'
  location: location
  tags: tags
  kind: 'linux'
  sku: {
    name: skuName
    capacity: skuCapacity
  }
  properties: {
    reserved: true //required as this is a linux plan
  }
}

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
    value: 'https://${dockerRegistryServerURL}'
  }
  {
    name: 'GOOGLE_RECAPTCHA_KEY'
    value: '@Microsoft.KeyVault(SecretUri=https://${keyVaultName}.vault.azure.net/secrets/GOOGLE-RECAPTCHA-KEY)'
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

var productionName = 'app-${projectName}-${entropy}'
var kind = 'app,linux,container'

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: productionName
  location: location
  kind: 'app,linux,container'
  identity: {
    type: 'SystemAssigned'
  }
  tags: union(tags, {
    'hidden-related:${plan.id}': 'empty'
  })
  properties: {
    serverFarmId: plan.id
    httpsOnly: true
    siteConfig: {
      appSettings: appSettings
      acrUseManagedIdentityCreds: true
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      linuxFxVersion: 'DOCKER|${acr.properties.loginServer}/${dockerImage}:production'
      healthCheckPath: healthCheckPath
    }
    clientAffinityEnabled: false
  }
}

resource stagingSlot 'Microsoft.Web/sites/slots@2023-01-01' = {
  parent: appService
  name: 'staging'
  location: location
  kind: kind
  identity: {
    type: 'SystemAssigned'
  }
  tags: tags
  properties: {
    serverFarmId: plan.id
    siteConfig: {
      appSettings: appSettings
      acrUseManagedIdentityCreds: true
      healthCheckPath: healthCheckPath
    }
    clientAffinityEnabled: false
  }
}

// Add AcrPull role so that the app service can pull images using managed identity

// This is the ACR Pull Role Definition Id: https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#acrpull
var acrPullRoleDefinitionId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')

resource appServiceAcrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: acr
  name: guid(acr.id, appService.id, acrPullRoleDefinitionId)
  properties: {
    principalId: appService.identity.principalId
    roleDefinitionId: acrPullRoleDefinitionId
    principalType: 'ServicePrincipal'
  }
}

resource stagingSlotAcrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: acr
  name: guid(acr.id, stagingSlot.id, acrPullRoleDefinitionId)
  properties: {
    principalId: stagingSlot.identity.principalId
    roleDefinitionId: acrPullRoleDefinitionId
    principalType: 'ServicePrincipal'
  }
}


module kvAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'kvAppRoleAssignment-${now}'
  params: {
    keyVaultName: keyVaultName
    principalId: appService.identity.principalId
    roleName: 'Key Vault Secrets User'
  }
}


module kvSlotRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'kvSlotRoleAssignment-${now}'
  params: {
    keyVaultName: keyVaultName
    principalId: stagingSlot.identity.principalId
    roleName: 'Key Vault Secrets User'
  }
}

output appServiceHostName string = appService.properties.defaultHostName
