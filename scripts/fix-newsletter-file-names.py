import os
import sys
import re
import json
from pathlib import Path

def clean_filename(filename):
  """
  Clean the filename by:
  - Replacing commas (with optional spaces) with hyphens
  - Replacing all types of spaces and dashes with single hyphens
  - Collapsing multiple hyphens into one
  - Removing leading/trailing hyphens
  """
  # First handle commas and their variations
  cleaned = re.sub(r'[\s]*,[\s]*', '-', filename)

  # Replace all whitespace characters with hyphens
  cleaned = re.sub(r'[\s\u00A0]+', '-', cleaned)
  
  # Replace all dash-like characters with hyphens
  dash_chars = [
      '-',    # hyphen-minus
      '–',    # en dash
      '—',    # em dash
      '‐',    # hyphen
      '−',    # minus sign
  ]
  for dash in dash_chars:
    cleaned = cleaned.replace(dash, '-')
  
  # Collapse multiple hyphens into one
  cleaned = re.sub(r'-+', '-', cleaned)
  
  # Remove leading/trailing hyphens
  cleaned = cleaned.strip('-')
  
  return cleaned

def update_json_references(json_path, old_name, new_name):
  """
  Update all references to old_name with new_name in the JSON file
  Returns True if changes were made, False otherwise
  """
  try:
    with open(json_path, 'r', encoding='utf-8') as f:
      data = json.load(f)
    
    modified = False
    
    # Check if this is a list of newsletters or a single newsletter
    if isinstance(data, dict) and data.get('newsletters'):
      for item in data['newsletters']:
        if isinstance(item, dict) and old_name in item.get('file'):
          item['file'] = item['file'].replace(old_name, new_name)
          modified = True
    
    if modified:
      with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
      return True
    return False
  except Exception as e:
    print(f"Error updating {json_path}: {e}", file=sys.stderr)
    return False

def rename_files(folder_path, dry_run=False):
  """
  Rename all .htm and .html files in the specified folder, replacing spaces with hyphens.
  Returns a list of tuples containing (old_name, new_name) for all renamed files.
  """
  renamed_files = []
    
  for root, _, files in os.walk(folder_path):
    for filename in files:
      if filename.endswith(('.htm', '.html'))  and ' ' in filename:
          original = filename
          new_name = clean_filename(filename)

          if new_name != original:
            year_match = re.match(r'_(\d{4})_\d{2}', filename)
            if year_match:
              year = year_match.group(1)
              json_filename = f'_{year}.json'
              script_dir = os.path.dirname(os.path.abspath(__file__))
              json_path = os.path.join(script_dir, '..', 'content', 'newsletters', json_filename)
              json_path = os.path.normpath(json_path)
            else:
              json_path = None

            newsletter_old_path = os.path.join(root, original)
            newsletter_new_path = os.path.join(root, new_name)

            json_updated = False
            if json_path and os.path.exists(json_path):
              if dry_run:
                print(f"[Dry Run] Would update references in {json_filename}")
                json_updated = True
              else:
                json_updated = update_json_references(json_path, original, new_name)
          
            if not dry_run:
              try:
                  os.rename(newsletter_old_path, newsletter_new_path)
                  print(f"Renamed: {filename} -> {new_name}")
                  if json_updated:
                    print(f"Updated references in {json_filename}")
              except OSError as e:
                  print(f"Error renaming {filename}: {e}", file=sys.stderr)
            else:
              print(f"[Dry Run] Would rename: {original} -> {new_name}")
            
            renamed_files.append((original, new_name))
        
  return renamed_files

def main():
  script_dir = os.path.dirname(os.path.abspath(__file__))
  folder_path = os.path.join(script_dir, '..', 'public', 'images', 'newsletter-uploads')
  folder_path = os.path.normpath(folder_path)
  
  if not os.path.exists(folder_path):
    print(f"Error: Directory not found: {folder_path}", file=sys.stderr)
    sys.exit(1)
  
  # Add dry run option - set to False to actually rename files
  dry_run = False  # Change to False to perform actual renaming
  
  if dry_run:
    print("\nStarting DRY RUN - showing what would be changed without actually renaming")
  else:
    print("\nStarting file renaming process...")
  
  renamed_files = rename_files(folder_path, dry_run=dry_run)
  
  if not renamed_files:
    print("No files needed to be renamed.")
  else:
    print(f"\nTotal files renamed: {len(renamed_files)}")
  
  if dry_run:
    print("\nTo actually perform these renames, set dry_run=False in the script")

if __name__ == "__main__":
    main()