import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from openai import OpenAI
from openpyxl import Workbook

title_field = "  title:"
description_field = "  description:"
seo_field = "seo:"

# MODIFY THIS TO IMPROVE THE SYSTEM PROMPT
system_prompt = """
        Provide a meta description for the content provided assuming it will be hosted on a web 
        page. YOUR RESPONSE MUST BE UNDER 150 CHARACTERS OR UNDER. DO NOT INCLUDE AIR QUOTES IN 
        YOUR RESPONSE.
    """

def export_to_xlsx(data:list[dict], filename: str):
    wb = Workbook()
    ws = wb.active
    if not data:
        raise ValueError("Data is empty")
    keys:list[str] = list(data[0].keys())
    ws.append(keys)
    for row in data:
        ws.append(list(row.values()))
    wb.save(filename)

# TODO - Replace with an olm for reduced cost
def query_meta_description_gpt(query: str) -> str:
    load_dotenv()
    client = OpenAI(
       api_key = os.getenv("OPENAI_API_KEY")
    )
    chat_completion = client.chat.completions.create(
       messages = [
          {
             "role": "system",
             "content": system_prompt
          },
          {
            "role":"user",
            "content": query
          }
       ],
       model="gpt-4",
       temperature=0.2,
    )

    description = chat_completion.choices[0].message.content
    return description

def extract_text_from_html(html_content : str):
    # Read the HTML
    # Create a BeautifulSoup object
    soup = BeautifulSoup(html_content, 'html.parser')
    # Extract all the text
    text = soup.get_text()
    return text

def get_site_text(url):
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Ensure the browser runs in headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Initialize the Chrome driver
    service = ChromeService(executable_path="C:\\selenium\\chromedriver.exe")  # Update the path to the chromedriver
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        # Open the URL
        driver.get(url)
        # Give some extra time for JavaScript to finish executing (optional)
        time.sleep(2)
        page_source = driver.page_source
        page_source = extract_text_from_html(page_source)
    finally:
        driver.quit()
    return page_source

def save_page(url: str, save_path: str):
  chrome_options = Options()
  chrome_options.add_argument("--headless")  # Ensure the browser runs in headless mode
  chrome_options.add_argument("--no-sandbox")
  chrome_options.add_argument("--disable-dev-shm-usage")

  # Initialize the Chrome driver
  service = ChromeService(executable_path="C:\\selenium\\chromedriver.exe")  # Update the path to the chromedriver
  driver = webdriver.Chrome(service=service, options=chrome_options)
  try:
  # Open the URL
    driver.get(url)
        # Give some extra time for JavaScript to finish executing (optional)
    time.sleep(2)
    page_source = driver.page_source
    page_source = extract_text_from_html(page_source)
        # Save the page source to a local file
    path = "\\".join(save_path.split("\\")[:-1])
    if not os.path.exists(path):
      os.makedirs(path)
    with open(save_path, 'w+', encoding='utf-8') as file:
        file.write(page_source)
  finally:
        driver.quit()

def find_term_line_numbers(terms: list[str], lines:list[str] ) -> dict:
    # using a dictionary to reduce the number of times the array must be traversed
    search_term_locations : dict = {}
    for term in terms:
       search_term_locations[term] = -1
    for line_index, line in enumerate(lines):
       # nested loops are yucky
        for term in terms:
          if line.startswith(term):
            if term == title_field:
              # in case the title is spread across multiple lines
              while lines[line_index + 1 ].startswith("    "): 
                line_index += 1
                
              
            search_term_locations[term] = line_index
    return search_term_locations

def path_to_url(path:str):
   ssw_url = "https://ssw.com.au/"
   path = path[2:]
   path = path.replace("\\", "/")
   path = path.replace("index.mdx", "")
   path = path.replace(".mdx", "")
   # There's a routing rule that changes case-study to clients
   path = path.replace("company/case-study","company/clients" )
   path = path.replace("pages/", "")
  
   return ssw_url + path

def append_description(terms_line_number_dict: dict, file: list[str], new_description: str) -> None:
    title_index = terms_line_number_dict[title_field]
    seo_index = terms_line_number_dict[seo_field]
    if title_index != -1:
      file.insert(title_index + 1 ,new_description)
      return
    file.insert(seo_index + 1, new_description) 
  
def find_mdx_with_seo():
  descriptions: list[dict] = []
  for root, _, files in os.walk("../content/"):
      for file in files:
          if file.endswith('.mdx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r+', encoding='utf-8') as f:
              lines : list[str]= f.readlines() 
              line_number_of_terms = find_term_line_numbers([title_field, description_field, seo_field], lines)
              if line_number_of_terms[description_field] != -1:
                continue
              if line_number_of_terms[seo_field] == -1:
                continue
              url = path_to_url(file_path)
              tries = 0
              while True:
                print(f"regenerating description of {url} - Retries: {tries}")
                tries += 1
                description = query_meta_description_gpt(url)
                if len(description) <= 150:
                  break
              append_description(line_number_of_terms, lines, f"  description: {description}\n")
              f.seek(0)
              f.truncate(0)
              f.writelines(lines)
              descriptions.append({"url": url, "description": description, "file name": file})


  if len(descriptions) == 0:
    print("All pages already have meta descriptions")
    return
  export_to_xlsx(descriptions, "seo_descriptions.xlsx")

find_mdx_with_seo()




