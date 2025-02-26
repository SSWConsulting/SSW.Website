# pip install azure-ai-inference
# pip install azure.identity
# pip install chardet

# This script finds files with duplicated titles in the /public/images/newsletter-uploads folder and
# generates new titles for them using Azure AI.

# Don't forget to update with your Azure AI endpoint and key on lines 30-31
# Run the script using "python fix-newsletter-titles.py" from script directory

import os
import re
import time
import chardet # type: ignore
from collections import defaultdict

# This script Azure AI, recommended to test things with Azure AI Foundry and get API endpoint and key from there
from azure.ai.inference import ChatCompletionsClient # type: ignore
from azure.ai.inference.models import SystemMessage, UserMessage # type: ignore
from azure.core.credentials import AzureKeyCredential # type: ignore

api_call_count = 0
system_prompt = """
        Provide a title tag value using the provided file name. Also the new title should not exist in the provided existing titles list.
        You can write title in this format: "SSW Update Month Year" - "Your Title".
        YOUR RESPONSE MUST BE UNDER 100 CHARACTERS OR UNDER. DO NOT INCLUDE AIR QUOTES IN YOUR RESPONSE.
    """

# Update with your Azure AI endpoint and key
endpoint = os.getenv("AZURE_INFERENCE_SDK_ENDPOINT", "{{ENDPOINT}}")
key = os.getenv("AZURE_INFERENCE_SDK_KEY", "{{API_KEY}}")
model_name = os.getenv("DEPLOYMENT_NAME", "gpt-4o-mini")
client = ChatCompletionsClient(endpoint=endpoint, credential=AzureKeyCredential(key))

def detect_file_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        return result['encoding']

def clean_title(title):
    return ' '.join(title.split())

def generate_unique_title(file_name, existing_titles):
  global api_call_count

  print(f"\nGenerating new title for {file_name}...")

  try:
    api_call_count += 1

    # Pause for 30 seconds after every 20 API calls
    if api_call_count % 20 == 0:
      time.sleep(30)

    response = client.complete(
      messages=[
        SystemMessage(content = system_prompt),
        UserMessage(content = f"File name: {file_name}\n\nExisting titles: {existing_titles}")
      ],
      model = model_name,
      max_tokens = 800,
      temperature = 0.5,
      top_p = 1,
    )
    generated_title = response.choices[0].message.content.strip()
    return generated_title
  except Exception as e:
    print(f"Error generating title: {e}")
    return None

def update_file_title(file_path, new_title):
  title_pattern = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)
  try:
    encoding = detect_file_encoding(file_path)
    with open(file_path, 'r', encoding=encoding) as f:
      content = f.read()
    
    updated_content = title_pattern.sub(f'<title>{new_title}</title>', content)

    with open(file_path, 'w', encoding=encoding) as f:
      f.write(updated_content)
    
    print(f"Updated file: {file_path} with the new title: {new_title}")
  except Exception as e:
    print(f"Error updating {file_path}: {e}")

def check_duplicate_titles(title_to_files):
  if not title_to_files:
    print("\nNo titles found or an error occurred while processing files.")
    return
  
  print("\nChecking for duplicate titles...")

  existing_titles = list(title_to_files.keys())
  for title, files in title_to_files.items():
    if len(files) > 1:
      for file in files:
        file_name = os.path.basename(file)
        new_title = generate_unique_title(file_name, existing_titles)

        if new_title:
          update_file_title(file, new_title)
          existing_titles.append(new_title)

def find_titles_in_files(folder_path):
  print("\nFinding titles in files and creating a dictionary...")

  title_to_files = defaultdict(list)
  title_pattern = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)

  for root, _, files in os.walk(folder_path):
    for file in files:
      if file.endswith('.htm') or file.endswith('.html'):
        file_path = os.path.join(root, file)
        encoding = detect_file_encoding(file_path)
        with open(file_path, 'r', encoding=encoding) as f:
          content = f.read()
          match = title_pattern.search(content)
          if match:
            title_value = match.group(1)
            cleaned_title = clean_title(title_value)
            title_to_files[cleaned_title].append(file_path)
          else:
            print(f"No <title> tag found in {file_path}")

  return title_to_files

def main():
  script_dir = os.path.dirname(os.path.abspath(__file__))
  folder_path = os.path.join(script_dir, '..', 'public', 'images', 'newsletter-uploads')
  folder_path = os.path.normpath(folder_path)

  if not os.path.exists(folder_path):
    print(f"Error: Folder '{folder_path}' does not exist.")
    return
  
  title_to_files = find_titles_in_files(folder_path)
  check_duplicate_titles(title_to_files)

if __name__ == "__main__":
  main()