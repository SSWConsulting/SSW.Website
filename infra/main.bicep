param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param servicePrincipalObjectId string

@allowed([
  'B1'
  'B2'
  'B3'
  'S1'
  'S2'
  'S3'
  'P1'
  'P2'
  'P3'
  'P1V2'
  'P2V2'
  'P3V2'
  'P1V3'
  'P2V3'
  'P3V3'
])
param skuName string = 'P1V2'


@minValue(1)
param skuCapacity int = 1

@description('The docker image')
param dockerImage string = 'sswwebsite'

param now string = utcNow('yyyy-MM-ddTHH-mm')

var core = {
  'cost-category': 'core'
}

var value = {
  'cost-category': 'value'
}

module acr 'acr.bicep' = {
  name: 'acr-${now}'
  params: {
    projectName: projectName
    location: location
  }
}
module keyVault 'keyVault.bicep' = {
  name:'keyVault-${now}'
  params: {
    projectName: projectName
    location: location
  }
}
module appInsight 'appInsight.bicep' = {
  name: 'appInsight-${now}'
  params: {
    projectName: projectName
    location: location
    tags: value
  }
}

module appService 'appService.bicep' = {
  name: 'appService-${now}'
  params: {
    now: now
    projectName: projectName
    location: location
    tags: core
    skuName: skuName
    skuCapacity: skuCapacity
    acrName: acr.outputs.acrName
    dockerImage: dockerImage
    dockerRegistryServerURL: acr.outputs.acrLoginServer
    appInsightConnectionString: appInsight.outputs.appInsightConnectionString
    keyVaultName: keyVault.outputs.keyVaultName
  }
}

module kVServicePrincipalRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'KVServicePrincipalRoleAssignment-${now}'
  params: {
    keyVaultName: keyVault.outputs.keyVaultName
    principalId: servicePrincipalObjectId
    roleName: 'Key Vault Secrets User'
  }
}

module websiteArchive 'archiveStorage.bicep' = {
  name: 'websiteArchive-${now}'
  params: {
    now: now
    location: location
    skuName: 'Standard_LRS'
  }
}

output acrLoginServer string = acr.outputs.acrLoginServer
output appServiceHostName string = appService.outputs.appServiceHostName
