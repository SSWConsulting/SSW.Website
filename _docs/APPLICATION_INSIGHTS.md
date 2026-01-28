# Application Insights Configuration

This document explains how Application Insights is configured in the SSW.Website project for optimal cost management and monitoring.

## Overview

Application Insights is used for monitoring the website's performance and tracking errors. The implementation uses both server-side (Node.js) and client-side (browser) tracking with configurable sampling to optimize Azure Log Analytics costs.

## Cost Optimization Strategy

The default configuration implements **20% sampling** for both server and client-side telemetry, which reduces data ingestion by approximately **75-80%** while maintaining sufficient visibility into application behavior and errors.

### Expected Cost Impact
- **Before Optimization**: ~$55/month (28GB data: 19GB requests + 9GB dependencies)
- **After Optimization**: ~$12-15/month (7GB data with 20% sampling)
- **Cost Reduction**: 75-80%

## Environment Variables

All Application Insights features can be controlled via environment variables without requiring code changes or redeployment.

### Server-Side Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `APPINSIGHTS_SAMPLING_PERCENTAGE` | `20` | Percentage of requests/dependencies to track (1-100). Lower = less cost. |
| `APPINSIGHTS_ENABLE_CONSOLE_COLLECTION` | `false` | When `true`, collects console output from third-party loggers (Winston, Bunyan). When `false`, disables all console collection. |
| `APPINSIGHTS_COLLECT_NATIVE_CONSOLE` | `false` | When `true`, also collects native console methods (console.log, console.error, etc.). When `false`, only third-party logger output is collected. Requires `APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=true` to work. |
| `APPINSIGHTS_ENABLE_LIVE_METRICS` | `false` | Enable real-time metrics streaming. **Expensive feature** - only enable when actively debugging. |

### Client-Side Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE` | `20` | Percentage of client-side events to track (1-100). |
| `NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS` | `true` | Track Core Web Vitals metrics (TTFB, FCP, LCP, FID, CLS, INP). |

### Connection String

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING` | Yes | Azure Application Insights connection string. Set in Azure App Service configuration. |

## Architecture

### Server-Side Monitoring
- **File**: `appInsight-api.js`
- **Loaded by**: `instrumentation.ts` (Next.js instrumentation hook)
- **Tracks**:
  - HTTP requests (with sampling)
  - Dependencies (with sampling)
  - Exceptions (always tracked, no sampling)
  - Console errors/logs (configurable)
  - User-agent information

### Client-Side Monitoring
- **File**: `context/app-insight-client.tsx`
- **Type**: React Context Provider
- **Tracks**:
  - Page views (with sampling)
  - AJAX calls (with sampling)
  - Browser exceptions (always tracked)
  - Page visit time
  - Web Vitals metrics (configurable)

## Configuration Examples

### Production (Cost-Optimized)
```bash
APPINSIGHTS_SAMPLING_PERCENTAGE=20
APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=false
APPINSIGHTS_COLLECT_NATIVE_CONSOLE=false
APPINSIGHTS_ENABLE_LIVE_METRICS=false
NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE=20
NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS=true
```

### Development (Full Visibility)
```bash
APPINSIGHTS_SAMPLING_PERCENTAGE=100
APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=true
APPINSIGHTS_COLLECT_NATIVE_CONSOLE=true
APPINSIGHTS_ENABLE_LIVE_METRICS=true
NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE=100
NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS=true
```

### Debugging Issues (Temporary High Visibility)
```bash
APPINSIGHTS_SAMPLING_PERCENTAGE=100
APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=true
APPINSIGHTS_COLLECT_NATIVE_CONSOLE=true
APPINSIGHTS_ENABLE_LIVE_METRICS=true
NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE=100
NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS=true
```
⚠️ **Remember to reset to production values after debugging to avoid high costs**

### Minimal Monitoring (Maximum Cost Savings)
```bash
APPINSIGHTS_SAMPLING_PERCENTAGE=10
APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=false
APPINSIGHTS_COLLECT_NATIVE_CONSOLE=false
APPINSIGHTS_ENABLE_LIVE_METRICS=false
NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE=10
NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS=false
```

## Updating Configuration in Azure

### Via Azure Portal
1. Navigate to your App Service in Azure Portal
2. Go to **Settings** → **Configuration**
3. Click **New application setting** for each variable
4. Add/update the variable name and value
5. Click **Save** (application will restart automatically)

### Via Azure CLI
```bash
# Set server-side sampling to 30%
az webapp config appsettings set \
  --name <app-name> \
  --resource-group <resource-group> \
  --settings APPINSIGHTS_SAMPLING_PERCENTAGE=30

# Enable live metrics
az webapp config appsettings set \
  --name <app-name> \
  --resource-group <resource-group> \
  --settings APPINSIGHTS_ENABLE_LIVE_METRICS=true

# Set multiple variables at once
az webapp config appsettings set \
  --name <app-name> \
  --resource-group <resource-group> \
  --settings \
    APPINSIGHTS_SAMPLING_PERCENTAGE=20 \
    APPINSIGHTS_ENABLE_CONSOLE_COLLECTION=false \
    APPINSIGHTS_COLLECT_NATIVE_CONSOLE=false \
    APPINSIGHTS_ENABLE_LIVE_METRICS=false \
    NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE=20 \
    NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS=true
```

## Monitoring Best Practices

### What Gets Tracked (Always)
- ✅ **Exceptions**: Tracked with exception auto-collection enabled
- ✅ **Failed Requests**: Captured to identify issues
- ✅ **Console Errors**: Tracked to identify client and server-side issues

**Note**: While exception tracking is enabled, the configured sampling percentage applies to most telemetry types including exceptions. The sampling is designed to give a representative view of application behavior while reducing costs.

### What Gets Sampled
- 📊 **Successful Requests**: Only a percentage is tracked (default 20%)
- 📊 **Dependencies**: Database and API calls sampled (default 20%)
- 📊 **Page Views**: Client-side navigation sampled (default 20%)
- 📊 **Web Vitals**: Performance metrics sampled (default 20%)

### Sampling Strategy
- **Sampling is random but consistent** - all telemetry for a given request is either included or excluded together
- **20% sampling** means you still get a representative view of traffic patterns and performance
- **Exception tracking is enabled** and will be sampled along with other telemetry
- For a mostly static site, 20% sampling provides sufficient visibility while significantly reducing costs

## Troubleshooting

### Issue: High Log Analytics Costs
**Solution**: Verify environment variables are set correctly in Azure App Service. Check that sampling is enabled (default 20%).

### Issue: Missing Error Data
**Problem**: With sampling enabled, some errors might not be captured.
**Solution**: If you need to capture all errors temporarily, increase sampling to 100%:
```bash
az webapp config appsettings set \
  --name <app-name> \
  --resource-group <resource-group> \
  --settings APPINSIGHTS_SAMPLING_PERCENTAGE=100
```
⚠️ Remember to reset to 20% after investigating the issue.

### Issue: No Telemetry Data
**Problem**: Connection string might be missing or invalid.
**Verification**: 
1. Check that `NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING` is set in Azure
2. Check browser console for "Client side logging is turned on!" message
3. Check server logs for "App Insights - Server Side logging is turned on!" message

### Issue: Need More Visibility Temporarily
**Solution**: Increase sampling percentage temporarily:
```bash
az webapp config appsettings set \
  --name <app-name> \
  --resource-group <resource-group> \
  --settings APPINSIGHTS_SAMPLING_PERCENTAGE=100
```
⚠️ Remember to reset to 20% after debugging!

## Files Modified for Cost Optimization

- `appInsight-api.js` - Server-side configuration with sampling
- `context/app-insight-client.tsx` - Client-side configuration with sampling
- `app/components/web-vitals.tsx` - Configurable Web Vitals tracking
- `components/layout/layout.tsx` - Removed duplicate Web Vitals tracking
- `.env.example` - Added all configuration variables

## Related Issues

- [GitHub Issue #4187](https://github.com/SSWConsulting/SSW.Website/issues/4187) - Original cost optimization request

## Questions?

For questions or issues related to Application Insights configuration, please open a GitHub issue or contact the SSW.Website team.
