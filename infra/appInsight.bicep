param projectName string
param location string = resourceGroup().location

var entropy = substring(guid(subscription().subscriptionId, resourceGroup().id), 0, 4)
var logAnalyticsWorkspaceName = 'log-${projectName}-${entropy}'
var appInsightName = 'appInsight-${projectName}-${entropy}'

@description('Tags to add to the resources')
param tags object = {}

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: logAnalyticsWorkspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Disabled'
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightName
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
    Flow_Type: 'Bluefield'
  }
}

output applicationInsightsId string = applicationInsights.id
