import json
import os
import glob
from urllib.parse import urlparse

# Define paths
TREEMAP_FOLDER = "./.lighthouseci"
PROD_TREEMAP_FOLDER = "./prod-lighthouseci"
PROD_OUTPUT_FILE_PATH = "prod-lighthouse-report.md"

important_paths = {"/", "/consulting/net-upgrade", "/consulting/web-applications"}
github_output = os.getenv('GITHUB_OUTPUT')
github_event = os.getenv('GITHUB_EVENT_NAME')
prod_scores = []

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

def extract_path(url):
    if url.startswith("⭐ "):
        url = url[2:]
    parsed_url = urlparse(url)
    return parsed_url.path

def get_score_display(score, difference):
    if (difference > 0):
        return f"{int(score)} (⬇️{abs(difference)})"
    elif (difference < 0):
        return f"{int(score)} (⬆️{abs(difference)})"
    else:
        return f"{int(score)}"

def get_display_text(prod_score, pr_score):
    difference = int(prod_score) - int(pr_score)
    return get_score_display(pr_score, difference)

def get_bundle_display(size, difference):
    difference = round(difference, 2)
    if difference > 0:
        return f"{size:.2f} MB (⬇️{abs(difference):.2f} MB)"
    elif difference < 0:
        return f"{size:.2f} MB (⬆️{abs(difference):.2f} MB)"
    else:
        return f"{size:.2f} MB"

def generate_lighthouse_md(treemap_folder):
    manifest_file = glob.glob(os.path.join(treemap_folder, "manifest.json"))
    if not manifest_file:
        raise FileNotFoundError("❌ Error: manifest.json not found in " + treemap_folder)
    with open(manifest_file[0], "r") as file:
        data = json.load(file)

    report_header = "🚀 Lighthouse Report"
    if treemap_folder != PROD_TREEMAP_FOLDER:
        report_header = "🚀 Lighthouse score comparison for PR slot and production"

    md_output = [
        f"## {report_header}\n",
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

        if treemap_folder == PROD_TREEMAP_FOLDER:
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

        if treemap_folder == TREEMAP_FOLDER:
            prod_score = next((entry for entry in prod_scores if extract_path(entry["url_display"]) == extract_path(url_display)), None)
            performance_display = get_display_text(prod_score['performance'], performance)
            accessibility_display = get_display_text(prod_score['accessibility'], accessibility)
            best_practices_display = get_display_text(prod_score['best_practices'], best_practices)
            seo_display = get_display_text(prod_score['seo'], seo)
            total_bundle_display = get_bundle_display(total_bundle_size, prod_score["total_bundle_size"] - total_bundle_size)
            unused_bundle_display = get_bundle_display(unused_bundle_size, prod_score["unused_bundle_size"] - unused_bundle_size)

            md_output.append(
                f"| {url_display} | {performance_display} | {accessibility_display} | {best_practices_display} | {seo_display} | {total_bundle_display} | {unused_bundle_display} |"
            )

    return "\n".join(md_output)

def write_report_to_file(report_content, output_file_path):
    with open(output_file_path, "w", encoding="utf-8") as md_file:
        md_file.write(report_content)

# Generate the report for Production and save it to a file
prod_output = generate_lighthouse_md(PROD_TREEMAP_FOLDER)
write_report_to_file(prod_output, PROD_OUTPUT_FILE_PATH)
print(f"✅ Production Lighthouse report file successfully saved to {PROD_OUTPUT_FILE_PATH}")

# Generate the report for PR slot and output to GitHub Actions step
if github_event == 'pull_request':
    pr_output = generate_lighthouse_md(TREEMAP_FOLDER)
    print(f"✅ PR slot Lighthouse report successfully generated")
    if github_output:
        with open(github_output, 'a') as fh:
            print(f"report<<EOF\n{pr_output}\nEOF", file=fh)
        print("✅ Lighthouse report outputted to GitHub Actions!")
