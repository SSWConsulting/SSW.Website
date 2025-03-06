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

# Initialize the docker build command as an array
$dockerCmdArray = @("docker", "build")

# Add the image name and tag
$imageName = "ssw-website"
$dockerCmdArray += "-t", "$imageName"

# Define the list of valid prefixes for environment variables
$validPrefixes = @("NEXT_PUBLIC_", "GOOGLE_", "MICROSOFT_", "KEY_VAULT", "TINA_", "DYNAMICS_", "SITE_URL")

# Loop through the environment variables and add build args for matching prefixes
foreach ($key in $envVars.Keys) {
  foreach ($prefix in $validPrefixes) {
      if ($key.StartsWith($prefix)) {
          $dockerCmdArray += "--build-arg", "$key=$($envVars[$key])"
      }
  }
}

# Add the docker build context (assuming current directory is the context)
$dockerCmdArray += "."

# Join the array with spaces and newlines for output
$dockerCmd = $dockerCmdArray -join "`n"

# Output the final command
Write-Host "Generated Docker build command:"
Write-Host $dockerCmd

# Join the array with spaces for clipboard
$dockerCmdClipboard = $dockerCmdArray -join " "

# Copy the command to the clipboard
$dockerCmdClipboard | Set-Clipboard

Write-Host "Docker build command copied to clipboard."
