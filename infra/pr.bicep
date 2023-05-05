param slotName string

param appServiceName string = 'app-sswwebsite-9eb3'
param location string = resourceGroup().location
param ACR_LOGIN_SERVER string = 'acrsswwebsite.azurecr.io'
param ACR_Name string = 'acrsswwebsite'
param keyVaultName string = 'kv-sswwebsite-9eb3'


param now string = utcNow('yyyy-MM-ddTHH-mm')

module appServiceSlot 'slot.bicep' = {
  name:'prSlot-${now}'
  params:{
    location:location
    slotName:slotName
    appServiceName: appServiceName
    ACR_LOGIN_SERVER: ACR_LOGIN_SERVER
  }
}

module acrRoleAssignment 'acrRoleAssignment.bicep' = {
  name: 'acrRoleAssignment-${now}'
  params: {
    ACR_Name: ACR_Name
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'ACR Pull'
    slotName: slotName
  }
}

module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'KVRoleAssignment-${now}'
  params: {
    keyVaultName: keyVaultName
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'Key Vault Secrets User'
    slotName: slotName
  }
}

