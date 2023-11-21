param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param slotName string
param appServiceName string
param acrLoginServer string
param servicePrincipalObjectId string

param now string = utcNow('yyyy-MM-ddTHH-mm')

var dev = {
  'cost-category': 'dev/test'
}

var acrName = replace(acrLoginServer, '.azurecr.io', '')
module keyVault 'keyVault.bicep' = {
  name:'keyVault-${now}'
  params: {
    projectName: projectName
    location: location
  }
}

module appInsight 'appInsight.bicep' = {
  name: '${slotName}-appInsight-${now}'
  params: {
    projectName: '${projectName}-dev'
    location: location
    tags: dev
  }
}
module appServiceSlot 'appService-create-pr-slot.bicep' = {
  name:'${slotName}-create-slot-${now}'
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

module kVServicePrincipalRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: '${slotName}-KVServicePrincipalRoleAssignment-${now}'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    principalId: servicePrincipalObjectId
    roleName: 'Key Vault Secrets User'
  }
}


