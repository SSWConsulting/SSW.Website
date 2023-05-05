param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param slotName string
param appServiceName string
param ACR_LOGIN_SERVER string
param ACR_Name string

param now string = utcNow('yyyy-MM-ddTHH-mm')
module keyVault 'keyVault.bicep' = {
  name:'keyVault-${now}'
  params: {
    projectName: projectName
    location: location
  }
}
module appServiceSlot 'appSerivce-create-slot.bicep' = {
  name:'${slotName}-create-slot-${now}'
  params:{
    location:location
    slotName:slotName
    appServiceName: appServiceName
    ACR_LOGIN_SERVER: ACR_LOGIN_SERVER
    keyVaultName: keyVault.outputs.keyVaultName
  }
}

module acrRoleAssignment 'acrRoleAssignment.bicep' = {
  name: '${slotName}-acrRoleAssignment-${now}'
  params: {
    ACR_Name: ACR_Name
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'ACR Pull'
    slotName: slotName
  }
}

module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: '${slotName}-KVRoleAssignment-${now}'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'Key Vault Secrets User'
  }
}

