import os
import json
import glob
import re

json_directory = './events-calendar'

output_directory = './presenters'



presenter_name_exceptions = {
  "Microsoft AI MVP": True,
  "Fish bowl Open to anyone!": True,
  "TechEd Melbourne 2014": True,
  "TechEd New Zealand ": True,
  "Microsoft DevOps specialists": True,
  "Fishbowl - Open to anyoone!": True,
  "Fish bowl Open to anyone!": True,
  "Special Guests from NDC Conferences" : True,
  "Microsoft DevOps specialists": True,
  "Special Guests from NDC Conferences": True,
  "TechEd Sydney 2014": True,
  "more" : True,
  
}

presenter_replacements = { 
  "Microsoft/Adam Cogan": "Adam Cogan",
  "Jernej \"JK\" Kavka": "Jernej Kavka",
  "Nick Curran": "Nick Curran",
  "Scott Handselman ": "Scott Handselman",
  "Matt Goldman ": "Matt Goldman",
  "Jernej Kavka (JK)" : "Jernej Kavka",
  "and Andreas Lengkeek": "Andreas Lengkeek",
  "and Alvin Shen": "Alvin Shen",
  "and Bryden Oliver": "Bryden Oliver",
  "and Cameron Shaw": "Cameron Shaw",
  "and Kevin Scott": "Kevin Scott",
  

}
def main():    
  for root, _, files in os.walk(json_directory):
    for file in files:
      file_path = os.path.join(root, file)
      with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        if 'presenterName' in data:
          if 'presenterList' not in data:
                  data['presenterList'] = []
          presenters = re.split(r', | and | & | \| | \/ ',data['presenterName'])
          for presenter in presenters:
            if presenter_name_exceptions[presenter] == True:
              print("Skipping presenter: " + presenter)
              continue
            replacement = presenter_replacements.get(presenter)
            if replacement:
              presenter = replacement
            presenter = presenter.strip(" ")
            md_file = presenter.replace(" ", "-").lower() + ".mdx"
            presenter_md_file = output_directory + "\\" + md_file
            if os.path.exists(presenter_md_file):
              continue
            with open(presenter_md_file, 'w+') as presenter_f:
              presenter_f.write(f"---\n")
              presenter_f.write(f"presenter:\n")
              presenter_f.write(f"  name: {presenter}\n")
              presenter_f.write(f"---\n")
              presenter_entry = {"presenter": f"content/presenters/{md_file}"}
              if presenter_entry not in data['presenterList']:
                data['presenterList'].append(presenter_entry)
          del data['presenterName']
      with open(file_path, 'w', encoding='utf-8') as f:
          json.dump(data, f, indent=4)
main()

