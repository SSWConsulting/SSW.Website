@description('Specifies the name of the key vault.')
param projectName string

var entropy = substring(guid(subscription().subscriptionId, resourceGroup().id), 0, 4)
var keyVaultName = 'kv-${projectName}-${entropy}'


@description('Specifies whether the key vault is a standard vault or a premium vault.')
@allowed([
  'premium'
  'standard'
])
param skuName string = 'standard'

@description('Specifies the Azure location where the key vault should be created.')
param location string = resourceGroup().location

@description('Specifies whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.')
param enabledForDeployment bool = false

@description('Specifies whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.')
param enabledForDiskEncryption bool = false

@description('Specifies whether Azure Resource Manager is permitted to retrieve secrets from the key vault.')
param enabledForTemplateDeployment bool = true

@description('Specifies the Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. Get it by using Get-AzSubscription cmdlet.')
param tenantId string = subscription().tenantId

resource KeyVault 'Microsoft.KeyVault/vaults@2021-11-01-preview' = {
  name: keyVaultName
  location: location
  properties: {
    enabledForDeployment: enabledForDeployment
    enabledForDiskEncryption: enabledForDiskEncryption
    enabledForTemplateDeployment: enabledForTemplateDeployment
    enableRbacAuthorization: true
    tenantId: tenantId
    sku: {
      name: skuName
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
  }
}

module kVAppRoleAssignment 'keyVaultRoleAssignment.bicep' = {
  name: 'KVRoleAssignment-techlead'
  params: {
    keyVaultName: KeyVault.name
    principalId: 'a22f44fc-2871-4853-ba22-7c03b73a233b'
    principalType: 'User'
    roleName:  'User Access Administrator'
  }
}

output keyVaultName string = KeyVault.name

