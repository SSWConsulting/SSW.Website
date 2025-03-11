import json

TREEMAP_DATA = "./lighthouseci/www_ssw_com_au-_-2025_03_11_00_23_53.report.json"  # The file containing resourceBytes & unusedBytes

def get_total_and_unused_bytes():
    """Reads script-treemap-data.json and calculates total and unused bytes in MB."""
    try:
        with open(TREEMAP_DATA, "r", encoding="utf-8") as file:
            data = json.load(file)

        # Extract "script-treemap-data" object
        script_data = data.get("audits", {}).get("script-treemap-data", {})

        # Get all nodes inside "script-treemap-data"
        nodes = script_data.get("details", {}).get("nodes", [])

        # Sum resourceBytes and unusedBytes from all nodes
        total_bytes = sum(node.get("resourceBytes", 0) for node in nodes)
        unused_bytes = sum(node.get("unusedBytes", 0) for node in nodes)

        # Convert bytes to MB (1 MB = 1,048,576 bytes)
        return total_bytes / 1048576, unused_bytes / 1048576  # Returns values in MB
    except FileNotFoundError:
        print(f"Error: {TREEMAP_DATA} not found.")
        return 0, 0
    except json.JSONDecodeError:
        print(f"Error: Failed to parse {TREEMAP_DATA}.")
        return 0, 0

def generate_lighthouse_mdx():
    with open("./lighthouseci/manifest.json", "r") as file:
        data = json.load(file)

    mdx_output = [
        "## Lighthouse Report\n",
        "| URL | Performance | Accessibility | Best Practices | SEO |",
        "| --- | ----------- | ------------- | -------------- | --- |"
    ]

    for result in data:
        url = result["url"]
        performance = result["summary"]["performance"] * 100
        accessibility = result["summary"]["accessibility"] * 100
        best_practices = result["summary"]["best-practices"] * 100
        seo = result["summary"]["seo"] * 100
        mdx_output.append(f"| {url} | {performance:.2f} | {accessibility:.2f} | {best_practices:.2f} | {seo:.2f} |")

    return "\n".join(mdx_output)

# Generate and save the report
mdx_content = generate_lighthouse_mdx()

# Get total and unused bytes
bundle_size, unused_size = get_total_and_unused_bytes()

print(f"Total bundle size: {bundle_size:.2f} MB")
print(f"Unused bytes: {unused_size:.2f} MB")

# Output the report string for GitHub Actions
print("::set-output name=report::" + mdx_content.replace("\n", "%0A"))

print("Lighthouse report generated successfully!")
