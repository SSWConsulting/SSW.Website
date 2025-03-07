import json

# Load the Lighthouse CI results JSON file
with open("/home/runner/work/SSW.Website/SSW.Website/.lighthouseci/manifest.json", "r") as file:
    data = json.load(file)

# Create the Markdown Table Header
print("## PageSpeed Insights")
print("")
print("| URL                               | Performance | Accessibility | Best Practices | SEO       |")
print("| ---------------------------------- | ----------- | ------------- | -------------- | --------- |")

# Loop through each result and print the corresponding values
for result in data:
    url = result["url"]
    performance = result["summary"]["performance"] * 100  # Multiply by 100
    accessibility = result["summary"]["accessibility"] * 100  # Multiply by 100
    best_practices = result["summary"]["best-practices"] * 100  # Multiply by 100
    seo = result["summary"]["seo"] * 100  # Multiply by 100

    # Print each row with the data for each URL
    print(f"| {url} | {performance:.2f}       | {accessibility:.2f}        | {best_practices:.2f}          | {seo:.2f}       |")
