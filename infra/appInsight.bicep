param projectName string
param location string = resourceGroup().location

var entropy = substring(guid(subscription().subscriptionId, resourceGroup().id), 0, 4)
var logAnalyticsWorkspaceName = 'log-${projectName}-${entropy}'
var appInsightName = 'appInsight-${projectName}-${entropy}'

@description('Tags to add to the resources')
param tags object = {}


resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: logAnalyticsWorkspaceName
  location: location
  tags: tags
  properties: {
    sku:{
      name:'PerGB2018'
    }
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightName
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    Request_Source: 'rest'
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

output applicationInsightsId string = applicationInsights.id
output appInsightConnectionString string = applicationInsights.properties.ConnectionString
