param slotName string
param isAlreadyExit bool

param appServiceName string = 'app-sswwebsite-9eb3'
param location string = resourceGroup().location
param ACR_LOGIN_SERVER string = 'acrsswwebsite.azurecr.io'
param ACR_Name string = 'acrsswwebsite'
param keyVaultName string = 'kv-sswwebsite-9eb3'


param now string = utcNow('yyyy-MM-ddTHH-mm')

module appServiceSlot 'slot.bicep' = if(!isAlreadyExit) {
  name:'prSlot-${now}'
  params:{
    location:location
    slotName:slotName
    appServiceName: appServiceName
    ACR_LOGIN_SERVER: ACR_LOGIN_SERVER
  }
}


module acrRoleAssignment 'acrRoleAssignment.bicep' =  if(!isAlreadyExit) {
  name: 'acrRoleAssignment-${now}'
  params: {
    ACR_Name: ACR_Name
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'ACR Pull'
    slotName: slotName
  }
}

module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = if(!isAlreadyExit) {
  name: 'KVRoleAssignment-${now}'
  params: {
    keyVaultName: keyVaultName
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'Key Vault Secrets User'
    slotName: slotName
  }
}


resource existingSlot 'Microsoft.Web/sites/slots@2021-02-01' existing = if(isAlreadyExit) {
  name:slotName
}

resource ApplyingAppSettings 'Microsoft.Web/sites/slots/config@2022-09-01' = if(isAlreadyExit) {
  name: '${appServiceName}/${slotName}/appsettings'
  properties:{
    WEBSITES_ENABLE_APP_SERVICE_STORAGE: 'false'
    WEBSITES_PORT:'300'
    DOCKER_REGISTRY_SERVER_URL: 'https://${ACR_LOGIN_SERVER}'
    CREATE_LEAD_ENDPOINT:'@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Create-Lead-Endpoint-Dev/cc1fda66c2374f1897baeaa65dc40074)'
    GOOGLE_RECAPTCHA_KEY_V2: '@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Google-Recaptcha-KEY/876516e1ed224b4788065a65fb3d2a52)'
    GOOGLE_RECAPTCHA_SITE_KEY: '@Microsoft.KeyVault(SecretUri=https://tempv222.vault.azure.net/secrets/Google-Recaptcha-Site-KEY/72fd24e47c324d57b0e64cee02d03549)'
  }
  dependsOn:[
    existingSlot
  ]
}
