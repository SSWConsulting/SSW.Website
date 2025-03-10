import json

def generate_lighthouse_mdx():
    with open("./.lighthouseci/manifest.json", "r") as file:
        data = json.load(file)

    mdx_output = [
        "## Lighthouse Report\n",
        "| URL | Performance | Accessibility | Best Practices | SEO | Total Bundle Size |",
        "| --- | ----------- | ------------- | -------------- | --- | ---------------- |"
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

with open("lighthouse_report.mdx", "w") as file:
    file.write(mdx_content)

# Output the report string for GitHub Actions
print("::set-output name=report::" + mdx_content.replace("\n", "%0A"))

print("Lighthouse report generated successfully!")
