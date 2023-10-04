$secrets=("Google-Recaptcha-Site-KEY","MICROSOFT-OAUTH-TENANT-ID","MICROSOFT-OAUTH-CLIENT-ID","MICROSOFT-OAUTH-CLIENT-SECRET",
"SHAREPOINT-SITE-ID","SHAREPOINT-EVENTS-LIST-ID","SHAREPOINT-EXTERNAL-PRESENTERS-LIST-ID")
# Iterate over the secret names
foreach ($secret in $secrets) {
  # Retrieve the secret value from Azure Key Vault
  $secret_value = $(az keyvault secret show --name $secret --vault-name ${{ env.KEY_VAULT }} --query value -o tsv)
  # Mask the secret value in the workflow logs
  echo "::add-mask::$secret_value"
  $secret_name = $secret.replace("-","_")
  echo "$secret_value=$secret_value" >> $env:GITHUB_OUTPUT
}
Write-Host '✅ KV - Secrets retrieved'
