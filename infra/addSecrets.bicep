param KeyVaultName string = 'Kv-SSW-v3'
@description('Please provide a valid key name. Key names can only contain alphanumeric characters and dashes. The value you provide may be copied globally for the purpose of running the service. The value provided should not include personally identifiable or sensitive information.')
param SecretName string
@secure()
param SecretValue string

resource keyVault 'Microsoft.KeyVault/vaults@2019-09-01' existing = {
  name: KeyVaultName
}

resource secret 'Microsoft.KeyVault/vaults/secrets@2019-09-01' = {
  name: SecretName
  parent: keyVault  // Passing key vault symbolic name as a parent for the secret
  properties: {
    value: SecretValue
  }
}

output secretUri string = secret.properties.secretUriWithVersion
