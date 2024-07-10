const fs = require('fs').promises;
const path = require('path');

async function findAndFixUrls(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await findAndFixUrls(fullPath); // Recurse into subdirectories
    } else if (entry.isFile() && path.extname(entry.name) === '.json') {
      await fixUrlInJsonFile(fullPath); // Fix URLs in JSON files
    }
  }
}

async function fixUrlInJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  let json = JSON.parse(data);
  let modified = false;

  // Correct the 'url' field if it exists and is incorrect
  if (json.url && json.url.startsWith('http://http://')) {
    json.url = json.url.replace('http://http://', 'http://');
    modified = true;
  }

  // Add other URL fields if necessary, e.g., 'thumbnail', 'liveStreamUrl.url', etc.
  // Example for 'liveStreamUrl.url':
  if (json.liveStreamUrl && json.liveStreamUrl.url && json.liveStreamUrl.url.startsWith('http://http://')) {
    json.liveStreamUrl.url = json.liveStreamUrl.url.replace('http://http://', 'http://');
    modified = true;
  }

  // If modifications were made, write the file back
  if (modified) {
    await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log(`Fixed URLs in ${filePath}`);
  }
}

// Example usage
const startDirectory = '.'; // Start from the current directory
findAndFixUrls(startDirectory).then(() => console.log('Done fixing URLs.'));