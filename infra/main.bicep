
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

@minValue(1)
param skuCapacity int = 1

@description('The docker image')
param dockerImage string = 'sswwebsite'

param now string = utcNow('yyyy-MM-ddTHH-mm')

module acr 'acr.bicep' = {
  name: 'acr-${now}'
  params: {
    projectName: projectName
    location: location
  }
}

module appService 'appService.bicep' = {
  name: 'appService-${now}'
  params: {
    projectName: projectName
    location: location
    skuName: skuName
    skuCapacity: skuCapacity
    acrName: acr.outputs.acrName
    dockerImage: dockerImage
  }
}

output acrLoginServer string = acr.outputs.acrLoginServer
output appServiceHostName string = appService.outputs.appServiceHostName
output appServiceSlotHostName string = appService.outputs.appServiceSlotHostName
