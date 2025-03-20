import json
import os
import glob
from urllib.parse import urlparse

# Define paths
TREEMAP_FOLDER = "./.lighthouseci"
PROD_TREEMAP_FOLDER = "./prod-lighthouseci"
OUTPUT_FILE_PATH = "lighthouse-report.md"
PROD_OUTPUT_FILE_PATH = "prod-lighthouse-report.md"

important_paths = {"/", "/consulting/net-upgrade", "/consulting/web-applications"}

github_event_name = os.getenv("GITHUB_EVENT_NAME")
print(f"🔍 GitHub event name: {github_event_name}")

def format_url_for_filename(url):
    """Formats the URL to match the filename pattern by removing 'https://' and replacing slashes and dots."""
    formatted_url = url.replace("https://", "").replace("http://", "")
    return formatted_url.replace("-", "_").replace("/", "-_",1).replace("/", "_").replace(".", "_")

def get_total_and_unused_bytes_for_url(url, treemap_folder):
    """Reads the corresponding JSON file for the URL and calculates total and unused bytes in MB."""
    try:
        formatted_url = format_url_for_filename(url)
        filename_pattern = formatted_url + "*.report.json"

        print(f"🔍 Searching for {filename_pattern} in {treemap_folder}...")

        matching_files = glob.glob(os.path.join(treemap_folder, filename_pattern))

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

prod_scores = []

def extract_path(url):
    if url.startswith("⭐ "):
        url = url[2:]
    parsed_url = urlparse(url)
    return parsed_url.path

def generate_lighthouse_md(treemap_folder):
    manifest_file = glob.glob(os.path.join(treemap_folder, "manifest.json"))
    if not manifest_file:
        raise FileNotFoundError("❌ Error: manifest.json not found in " + treemap_folder)
    with open(manifest_file[0], "r") as file:
        data = json.load(file)

    md_output = [
        "## 🚀 Lighthouse Report\n",
        "| 🌐 URL | ⚡ Performance | ♿ Accessibility | ✅ Best Practices | 🔍 SEO | 📦 Bundle Size | 🗑️ Unused Bundle |",
        "| --- | ----------- | ------------- | -------------- | --- | ---------------- | ---------------- |"
    ]

    for result in data:
        url = result["url"]
        url_display = f"⭐ {url}" if extract_path(url) in important_paths else url
        performance = (result["summary"]["performance"] or 0) * 100
        accessibility = (result["summary"]["accessibility"] or 0) * 100
        best_practices = (result["summary"]["best-practices"] or 0) * 100
        seo = (result["summary"]["seo"] or 0) * 100
        total_bundle_size, unused_bundle_size = get_total_and_unused_bytes_for_url(url, treemap_folder)

        if github_event_name == "pull_request" and treemap_folder == PROD_TREEMAP_FOLDER:
            prod_scores.append({
                "url_display": url_display,
                "performance": int(performance),
                "accessibility": int(accessibility),
                "best_practices": int(best_practices),
                "seo": int(seo),
                "total_bundle_size": total_bundle_size,
                "unused_bundle_size": unused_bundle_size
            })
            md_output.append(
                f"| {url_display} | {int(performance)} | {int(accessibility)} | {int(best_practices)} | {int(seo)} | {total_bundle_size:.2f} MB | {unused_bundle_size:.2f} MB |"
            )

        if github_event_name == "pull_request" and treemap_folder == TREEMAP_FOLDER:
            prod_score = next((entry for entry in prod_scores if extract_path(entry["url_display"]) == extract_path(url_display)), None)
            md_output.append(
                f"| {url_display}\n{prod_score['url']} | {int(performance)} / {prod_score['performance']} | {int(accessibility)} / {prod_score['accessibility']} | {int(best_practices)} / {prod_score['best_practices']} | {int(seo)} / {prod_score['seo']} | {total_bundle_size:.2f} MB / {prod_score['total_bundle_size']} MB | {unused_bundle_size:.2f} MB / {prod_score['unused_bundle_size']} MB |"
            )

        if github_event_name != "pull_request":
            md_output.append(
                f"| {url_display} | {int(performance)} | {int(accessibility)} | {int(best_practices)} | {int(seo)} | {total_bundle_size:.2f} MB | {unused_bundle_size:.2f} MB |"
            )

    return "\n".join(md_output)

def write_report_to_file(report_content, output_file_path):
    with open(output_file_path, "w", encoding="utf-8") as md_file:
        md_file.write(report_content)

# Generate the report for already deployed production site and write to file
if github_event_name == "pull_request":
    prod_md_content = generate_lighthouse_md(PROD_TREEMAP_FOLDER)
    write_report_to_file(prod_md_content, PROD_OUTPUT_FILE_PATH)
    print(f"✅ Production Lighthouse report successfully saved to {PROD_OUTPUT_FILE_PATH}")

    md_content = generate_lighthouse_md(TREEMAP_FOLDER)

# Generate the report for just deployed site and write to file
# TODO: compare with prod report if it is pull request event and generate comparison report
# md_content = generate_lighthouse_md(TREEMAP_FOLDER)
# write_report_to_file(md_content, OUTPUT_FILE_PATH)
# print(f"✅ Lighthouse report successfully saved to {OUTPUT_FILE_PATH}!")

# Output to GitHub Actions (if running in GitHub Actions)
github_output = os.getenv('GITHUB_OUTPUT')

if github_output:
    with open(github_output, 'a') as fh:
        print(f"report<<EOF\n{md_content}\nEOF", file=fh)
    print("✅ Lighthouse report outputted to GitHub Actions!")
