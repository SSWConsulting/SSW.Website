
param ([string]$KEY_VAULT)

$GoogleRecaptchaSiteKey = (az keyvault secret show --name Google-Recaptcha-Site-KEY --vault-name $KEY_VAULT --query value -o tsv)
$MICROSOFT_OAUTH_TENANT_ID = (az keyvault secret show --name MICROSOFT-OAUTH-TENANT-ID --vault-name $KEY_VAULT --query value -o tsv)
$MICROSOFT_OAUTH_CLIENT_ID = (az keyvault secret show --name MICROSOFT-OAUTH-CLIENT-ID --vault-name $KEY_VAULT --query value -o tsv)
$MICROSOFT_OAUTH_CLIENT_SECRET = (az keyvault secret show --name MICROSOFT-OAUTH-CLIENT-SECRET --vault-name $KEY_VAULT --query value -o tsv)
$SHAREPOINT_SITE_ID = (az keyvault secret show --name SHAREPOINT-SITE-ID --vault-name $KEY_VAULT --query value -o tsv)
$SHAREPOINT_EVENTS_LIST_ID = (az keyvault secret show --name SHAREPOINT-EVENTS-LIST-ID --vault-name $KEY_VAULT --query value -o tsv)
$SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID = (az keyvault secret show --name SHAREPOINT-EXTERNAL-PRESENTERS-LIST-ID --vault-name $KEY_VAULT --query value -o tsv)
# Masking the secrets
echo "::add-mask::$GoogleRecaptchaSiteKey"
echo "::add-mask::$MICROSOFT_OAUTH_TENANT_ID"
echo "::add-mask::$MICROSOFT_OAUTH_CLIENT_ID"
echo "::add-mask::$MICROSOFT_OAUTH_CLIENT_SECRET"
echo "::add-mask::$SHAREPOINT_SITE_ID"
echo "::add-mask::$SHAREPOINT_EVENTS_LIST_ID"
echo "::add-mask::$SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID"
# GITHUB_OUTPUT
echo "GoogleRecaptchaSiteKey=$GoogleRecaptchaSiteKey" >> $env:GITHUB_OUTPUT
echo "MICROSOFT_OAUTH_TENANT_ID=$MICROSOFT_OAUTH_TENANT_ID" >> $env:GITHUB_OUTPUT
echo "MICROSOFT_OAUTH_CLIENT_ID=$MICROSOFT_OAUTH_CLIENT_ID" >> $env:GITHUB_OUTPUT
echo "MICROSOFT_OAUTH_CLIENT_SECRET=$MICROSOFT_OAUTH_CLIENT_SECRET" >> $env:GITHUB_OUTPUT
echo "SHAREPOINT_SITE_ID=$SHAREPOINT_SITE_ID" >> $env:GITHUB_OUTPUT
echo "SHAREPOINT_EVENTS_LIST_ID=$SHAREPOINT_EVENTS_LIST_ID" >> $env:GITHUB_OUTPUT
echo "SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID=$SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID" >> $env:GITHUB_OUTPUT

Write-Host '✅ KV - Secret retrieved'
