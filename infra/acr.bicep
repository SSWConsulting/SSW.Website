param projectName string = 'sswwebsite'
param location string = resourceGroup().location
param tags object

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' = {
  name: 'acr${projectName}'
  location: location
  tags: tags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
  }
}

output acrName string = acr.name
output acrLoginServer string = acr.properties.loginServer
