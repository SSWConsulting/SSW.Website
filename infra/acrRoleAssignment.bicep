param roleName string
param principalId string
param acrName string
param slotName string

var roleIdMapping = {
  'ACR Pull': '7f951dda-4ed3-4680-a7ca-43fe172d538d'
}

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' existing =  {
  name: acrName
}


resource addRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(acr.id, roleIdMapping[roleName], slotName)
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', roleIdMapping[roleName])
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
