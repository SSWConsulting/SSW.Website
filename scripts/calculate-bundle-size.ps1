param (
  [string]$HtmlFilePath
)

# Read the HTML content
$htmlContent = Get-Content -Path $HtmlFilePath -Raw

# Extract the window.chartData array of objects which contains contains information about each "static/chunks/*"
$match = [regex]::Match($htmlContent, 'window\.chartData\s*=\s*(\[.*?\]);')
if (-not $match.Success) {
  Write-Error "Failed to find window.chartData in $HtmlFilePath"
}

try {
  $chartData = $match.Groups[1].Value | ConvertFrom-Json

  $totalParsedSize = ($chartData | Measure-Object -Property parsedSize -Sum).Sum
  
  $totalParsedSizeMB = [math]::Round($totalParsedSize / (1024 * 1024), 2)
  
  Write-Output "$totalParsedSizeMB MB"
} catch {
  Write-Error "Failed to process chartData"
  exit 1
}
