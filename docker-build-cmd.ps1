# Check if .env file exists
if (-not (Test-Path .env)) {
  Write-Error "Error: .env file not found."
  exit 1
}

# Read the .env file and load each line as environment variables
$envVars = @{} # Use a hashtable for easier access

Get-Content .env | ForEach-Object {
  if ($_ -match "^\s*([A-Za-z0-9_]+)=(.*)\s*$") {
      $envVars[$matches[1]] = $matches[2]
  }
}

# Initialize the docker build command
$dockerCmd = "docker build"

# Add the image name and tag
$imageName = "ssw-website"
$dockerCmd += " -t $imageName"

# Define the list of valid prefixes for environment variables
$validPrefixes = @("NEXT_PUBLIC_", "GOOGLE_", "MICROSOFT_", "KEY_VAULT", "TINA_", "DYNAMICS_", "SITE_URL")

# Loop through the environment variables and add build args for matching prefixes
foreach ($key in $envVars.Keys) {
  foreach ($prefix in $validPrefixes) {
      if ($key.StartsWith($prefix)) {
          $dockerCmd += " --build-arg $key=$($envVars[$key])"
      }
  }
}

# Add the docker build context (assuming current directory is the context)
$dockerCmd += " ."

# Output the final command
Write-Host "Generated Docker build command:"
Write-Host $dockerCmd

# Copy the command to the clipboard
$dockerCmd | Set-Clipboard

Write-Host "Docker build command copied to clipboard."
