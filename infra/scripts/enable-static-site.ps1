$ErrorActionPreference = 'Stop'
$storageAccount = Get-AzStorageAccount -ResourceGroupName $env:ResourceGroupName -Name $env:StorageAccountName

$ctx = $storageAccount.Context
Enable-AzStorageStaticWebsite -Context $ctx -IndexDocument $env:IndexDocumentPath -ErrorDocument404Path $env:ErrorDocument404Path
