param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param slotName string
param appServiceName string
param acrLoginServer string

param now string = utcNow('yyyy-MM-ddTHH-mm')

var acrName = replace(acrLoginServer, '.azurecr.io', '')
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
    acrLoginServer: acrLoginServer
    keyVaultName: keyVault.outputs.keyVaultName
  }
}

module acrRoleAssignment 'acrRoleAssignment.bicep' = {
  name: '${slotName}-acrRoleAssignment-${now}'
  params: {
    acrName: acrName
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

