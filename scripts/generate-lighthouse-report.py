import json
import os
import glob

# Path to the folder where your JSON files are located
TREEMAP_FOLDER = "./.lighthouseci"  # Folder with the JSON files (you may change this path)

def format_url_for_filename(url):
    """Formats the URL to match the filename pattern by removing 'https://' and replacing slashes and dots."""
    formatted_url = url.replace("https://", "").replace("http://", "")

    formatted_url = formatted_url.replace("/", "-_").replace(".", "_")

    return formatted_url

def get_total_and_unused_bytes_for_url(url):
    """Reads the corresponding JSON file for the URL and calculates total and unused bytes in MB."""
    try:
        # Generate the filename pattern for the URL
        formatted_url = format_url_for_filename(url)
        filename_pattern = formatted_url + "*.report.json"
        print(f"Looking for {filename_pattern} in {TREEMAP_FOLDER}")
        matching_files = glob.glob(os.path.join(TREEMAP_FOLDER, filename_pattern))

        if not matching_files:
            print(f"Error: No matching JSON file found for {url}.")
            return 0, 0

        # Assuming we want to pick the first file if multiple matches are found
        treemap_data_file = matching_files[0]

        with open(treemap_data_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        script_data = data.get("audits", {}).get("script-treemap-data", {})

        nodes = script_data.get("details", {}).get("nodes", [])

        total_bytes = sum(node.get("resourceBytes", 0) for node in nodes)
        unused_bytes = sum(node.get("unusedBytes", 0) for node in nodes)

        # Convert bytes to MB (1 MB = 1,048,576 bytes)
        return total_bytes / 1048576, unused_bytes / 1048576  # Returns values in MB

    except FileNotFoundError:
        print(f"Error: {treemap_data_file} not found.")
        return 0, 0
    except json.JSONDecodeError:
        print(f"Error: Failed to parse {treemap_data_file}.")
        return 0, 0

def generate_lighthouse_mdx():
    with open("./lighthouseci/manifest.json", "r") as file:
        data = json.load(file)

    mdx_output = [
        "## Lighthouse Report\n",
        "| URL | Performance | Accessibility | Best Practices | SEO | Total Bundle Size | Unused Bundle Size |",
        "| --- | ----------- | ------------- | -------------- | --- | --------------------- | ---------------------- |"
    ]

    for result in data:
        url = result["url"]
        performance = result["summary"]["performance"] * 100
        accessibility = result["summary"]["accessibility"] * 100
        best_practices = result["summary"]["best-practices"] * 100
        seo = result["summary"]["seo"] * 100

        total_bundle_size, unused_bundle_size = get_total_and_unused_bytes_for_url(url)

        mdx_output.append(f"| {url} | {performance:.2f} | {accessibility:.2f} | {best_practices:.2f} | {seo:.2f} | {total_bundle_size:.2f} MB | {unused_bundle_size:.2f} MB |")

    return "\n".join(mdx_output)

# Generate the report
mdx_content = generate_lighthouse_mdx()

mdx_content = mdx_content.replace("\n", "%0A")

# Output the report string for GitHub Actions
with open(os.environ['GITHUB_OUTPUT'], 'a') as fh:
    print(f"report={mdx_content}", file=fh)

print("Lighthouse report generated successfully!")
