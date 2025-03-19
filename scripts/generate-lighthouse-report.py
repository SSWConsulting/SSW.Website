import json
import os
import glob
# test
# Define paths
TREEMAP_FOLDER = "./.lighthouseci"
OUTPUT_FILE_PATH = "lighthouse-report.mdx"  # The MDX file to be created
from urllib.parse import urlparse


important_paths = {"/", "/consulting/net-upgrade", "/consulting/web-applications"}

def format_url_for_filename(url):
    """Formats the URL to match the filename pattern by removing 'https://' and replacing slashes and dots."""
    formatted_url = url.replace("https://", "").replace("http://", "")
    return formatted_url.replace("-", "_").replace("/", "-_",1).replace("/", "_").replace(".", "_")

def get_total_and_unused_bytes_for_url(url):
    """Reads the corresponding JSON file for the URL and calculates total and unused bytes in MB."""
    try:
        formatted_url = format_url_for_filename(url)
        filename_pattern = formatted_url + "*.report.json"

        print(f"🔍 Searching for {filename_pattern} in {TREEMAP_FOLDER}...")

        matching_files = glob.glob(os.path.join(TREEMAP_FOLDER, filename_pattern))

        if not matching_files:
            print(f"❌ Error: No matching JSON file found for {url}.")
            return 0, 0

        treemap_data_file = matching_files[0]
        with open(treemap_data_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        script_data = data.get("audits", {}).get("script-treemap-data", {})
        nodes = script_data.get("details", {}).get("nodes", [])

        total_bytes = sum(node.get("resourceBytes", 0) for node in nodes)
        unused_bytes = sum(node.get("unusedBytes", 0) for node in nodes)

        return total_bytes / 1048576, unused_bytes / 1048576  # Convert bytes to MB

    except FileNotFoundError:
        print(f"❌ Error: {treemap_data_file} not found.")
        return 0, 0
    except json.JSONDecodeError:
        print(f"❌ Error: Failed to parse {treemap_data_file}.")
        return 0, 0

def generate_lighthouse_mdx():
    """Generates an MDX-formatted Lighthouse report from the manifest.json file."""
    manifest_file = glob.glob(os.path.join(TREEMAP_FOLDER, "manifest.json"))

    if not manifest_file:
        raise FileNotFoundError("❌ Error: manifest.json not found in " + TREEMAP_FOLDER)

    with open(manifest_file[0], "r") as file:
        data = json.load(file)

    mdx_output = [
        "## 🚀 Lighthouse Report\n",
        "| 🌐 URL | ⚡ Performance | ♿ Accessibility | ✅ Best Practices | 🔍 SEO | 📦 Bundle Size | 🗑️ Unused Bundle |",
        "| --- | ----------- | ------------- | -------------- | --- | ---------------- | ---------------- |"
    ]

    for result in data:
        url = result["url"]
        performance = result["summary"]["performance"] * 100
        accessibility = result["summary"]["accessibility"] * 100
        best_practices = result["summary"]["best-practices"] * 100
        seo = result["summary"]["seo"] * 100

        total_bundle_size, unused_bundle_size = get_total_and_unused_bytes_for_url(url)
        parsed_url = urlparse(url)
        url_display = f"⭐ {url}" if parsed_url.path in important_paths else url

        mdx_output.append(
            f"| {url_display} | {int(performance)} | {int(accessibility)} | {int(best_practices)} | {int(seo)} | {total_bundle_size:.2f} MB | {unused_bundle_size:.2f} MB |"
        )

    return "\n".join(mdx_output)

# Generate the report and save to an MDX file
mdx_content = generate_lighthouse_mdx()

# Write the MDX content to a file
with open(OUTPUT_FILE_PATH, "w", encoding="utf-8") as mdx_file:
    mdx_file.write(mdx_content)

print(f"✅ Lighthouse report successfully saved to {OUTPUT_FILE_PATH}!")

# Output to GitHub Actions (if running in GitHub Actions)
github_output = os.getenv('GITHUB_OUTPUT')

if github_output:
    with open(github_output, 'a') as fh:
        print(f"report<<EOF\n{mdx_content}\nEOF", file=fh)
    print("✅ Lighthouse report outputted to GitHub Actions!")
