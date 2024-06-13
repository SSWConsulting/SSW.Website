import os
import frontmatter

title_field = "  title:"
description_field = "  description:"
seo_field = "seo:"

# O(1) complexity
def find_term_line_numbers(terms: list[str], lines:list[str] ) -> dict:
    # using a dictionary to reduce the number of times the array must be traversed
    search_term_locations : dict = {}
    for term in terms:
       search_term_locations[term] = -1
    for line_index, line in enumerate(lines):
       # nested loops are yucky
        for term in terms:
          if line.startswith(term):
            search_term_locations[term] = line_index
    return search_term_locations

def append_description(line_number_of_term: dict, file: list[str]) -> None:
    title_index = line_number_of_term[title_field]
    seo_index = line_number_of_term[seo_field]
    new_description = "  description: >- this is a horrendous description\n"
    if title_index != -1:
      file.insert(title_index + 1 ,new_description)

      print(f"appending {new_description}")
      return
    file.insert(seo_index + 1, new_description) 
   
  
def find_mdx_with_seo():
    for root, _, files in os.walk("./"):
        for file in files:
            if file.endswith('.mdx'):
              file_path = os.path.join(root, file)
              with open(file_path, 'r+', encoding='utf-8') as f:
                lines : list[str]= f.readlines() 
                # for line in lines:
                #    print(line)
                
                line_number_of_term = find_term_line_numbers([title_field, description_field, seo_field], lines)
                if line_number_of_term[description_field] != -1:
                  continue
                if line_number_of_term[seo_field] == -1:
                  continue
                append_description(line_number_of_term, lines)
                # Skip if the page already has a meta description

                f.seek(0)
                f.truncate(0)
                f.writelines(lines)
                
find_mdx_with_seo()
