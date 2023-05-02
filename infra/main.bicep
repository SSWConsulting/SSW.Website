
param projectName string = 'sswwebsite'
param location string = resourceGroup().location

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

var entropy = substring(guid(subscription().subscriptionId, resourceGroup().id), 0, 4)
var KeyVaultName = 'kv-${projectName}-${entropy}'

param roleName string = 'Key Vault Secrets User'

var roleIdMapping = {
  'Key Vault Administrator': '00482a5a-887f-4fb3-b363-3b7fe8e74483'
  'Key Vault Certificates Officer': 'a4417e6f-fecd-4de8-b567-7b0420556985'
  'Key Vault Crypto Officer': '14b46e9e-c2b7-41b4-b07b-48a6ebf60603'
  'Key Vault Crypto Service Encryption User': 'e147488a-f6f5-4113-8e2d-b22465e65bf6'
  'Key Vault Crypto User': '12338af0-0e69-4776-bea7-57ae8d297424'
  'Key Vault Reader': '21090545-7ca7-4776-b22c-e363652d74d2'
  'Key Vault Secrets Officer': 'b86a8fe4-44ce-4948-aee5-eccb2c155cd7'
  'Key Vault Secrets User': '4633458b-17de-408a-b874-0445c86b69e6'
}

@minValue(1)
param skuCapacity int = 1

@description('The docker image')
param dockerImage string = 'sswwebsite'

param now string = utcNow('yyyy-MM-ddTHH-mm')

var tags = {
  // change this to 'core' when you are ready to deploy to production
  'cost-category': 'dev/test'
}

module acr 'acr.bicep' = {
  name: 'acr-${now}'
  params: {
    projectName: projectName
    location: location
    tags: tags
  }
}
module keyVault 'keyVault.bicep' = {
  name:'keyVault-${now}'
  params: {
    keyVaultName: KeyVaultName
    location: location
  }
}

module appService 'appService.bicep' = {
  name: 'appService-${now}'
  params: {
    projectName: projectName
    location: location
    tags: tags
    skuName: skuName
    skuCapacity: skuCapacity
    acrName: acr.outputs.acrName
    dockerImage: dockerImage
    DOCKER_REGISTRY_SERVER_URL: acr.outputs.acrLoginServer
  }
}

module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'KVRoleAssignment-${now}'
  params: {
    keyVaultName: KeyVaultName
    principalId: appService.outputs.AppPrincipalId
    roleDefinitionId: roleIdMapping[roleName]
  }
  dependsOn:[
    appService
  ]
}

output acrLoginServer string = acr.outputs.acrLoginServer
output appServiceHostName string = appService.outputs.appServiceHostName
