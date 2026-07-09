param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param slotName string
param appServiceName string
param acrLoginServer string
param servicePrincipalObjectId string

var dev = {
  'cost-category': 'dev/test'
}

var acrName = replace(acrLoginServer, '.azurecr.io', '')
module keyVault 'keyVault.bicep' = {
  name: '${slotName}-keyVault'
  params: {
    projectName: projectName
    location: location
  }
}

module appInsight 'appInsight.bicep' = {
  name: '${slotName}-appInsight'
  params: {
    projectName: '${projectName}-dev'
    location: location
    tags: dev
  }
}
module appServiceSlot 'appService-create-pr-slot.bicep' = {
  name: '${slotName}-create-slot'
  params:{
    location:location
    slotName:slotName
    appServiceName: appServiceName
    acrLoginServer: acrLoginServer
    keyVaultName: keyVault.outputs.keyVaultName
    appInsightConnectionString: appInsight.outputs.appInsightConnectionString
    tags: dev
  }
}

module acrRoleAssignment 'acrRoleAssignment.bicep' = {
  name: '${slotName}-acrRoleAssignment'
  params: {
    acrName: acrName
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'ACR Pull'
  }
}


module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: '${slotName}-KVRoleAssignment'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    principalId: appServiceSlot.outputs.slotPrincipalId
    roleName: 'Key Vault Secrets User'
  }
}

module kVServicePrincipalRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: '${slotName}-KVServicePrincipalRoleAssignment'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    principalId: servicePrincipalObjectId
    roleName: 'Key Vault Secrets User'
  }
}

