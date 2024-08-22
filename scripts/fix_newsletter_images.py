import os
import re
import chardet
from bs4 import BeautifulSoup

base_directory = "../public/images/newsletter-uploads"
images_path = "../public"
ssw_url = "https://www.ssw.com.au/"
ssw_url_alt = "https://ssw.com.au/"

def path_to_relative_url(path):
    return path.replace("\\", "/").replace(images_path, "")

def detect_encoding(file_path: str) -> str:
    with open(file_path, 'rb') as file:
        raw_data = file.read()
    result = chardet.detect(raw_data)
    return result['encoding']

def image_hosted_locally(image_path: str)-> bool:
    return image_path.startswith('/') or  image_path.startswith(ssw_url) or image_path.startswith(ssw_url_alt) or (not image_path.startswith('http')) 

def url_to_file_path(url: str) -> str:
    url = url.replace("%20", " ")
    if(url.startswith("../")):
        url = url.replace("../", "", 1)
    if(url.startswith("/")):
        url = url.replace("/", "", 1)
    if url.startswith(ssw_url):
        url = url.replace(ssw_url, "", 1)
    if url.startswith(ssw_url_alt):
        url = url.replace(ssw_url_alt, "", 1)
    return os.path.join(images_path, url).replace("/", "\\")

def path_to_file(path: str) -> str:
    file = os.path.basename(path)
    return path.rstrip(file)

def find_path_case_insensitive(path: str):
    path = path.replace("/", "\\")
    split_path = path.split("\\")
    return find_path_in_directory(split_path[0], split_path[1:])

def find_path_in_directory(cwd: str, next_paths):
    if len(next_paths) == 0:
        return cwd
    for dir in os.listdir(cwd):
        if dir.lower() == next_paths[0].lower():
            return find_path_in_directory(os.path.join(cwd, dir), next_paths[1:])
        
def fix_elements(element: str, attribute: str, soup: BeautifulSoup, contents: str, html_file_path : str):
    for element in soup.find_all(element):
        if(element.has_attr(attribute)):
            attr = element[attribute]
            if image_hosted_locally(attr):
                full_path = url_to_file_path(attr)
                alt_path = find_path_case_insensitive(full_path)
                if alt_path != full_path:
                    if alt_path is not None:
                        alt_path = path_to_relative_url(alt_path)
                        contents = contents.replace(attr, alt_path)
                    else:
                        print(f"WARNING: no local image found for {attr}")
                        print("Check file: ", html_file_path)
    return contents
def main():
    for root, _, files in os.walk(base_directory):
        for file in files:
            if file.endswith('.html') or file.endswith('.htm'):
                html_file_path = os.path.join(root, file)
                encoding = detect_encoding(html_file_path)
                contents = ""
                with open(html_file_path, 'r', encoding=encoding) as html_file:
                    contents = html_file.read()
                    soup = BeautifulSoup(contents, 'html.parser')
                    contents = fix_elements('img', 'src', soup, contents, html_file_path)
                    contents = fix_elements('td', 'background', soup, contents, html_file_path)
                with open(html_file_path, 'w', encoding=encoding) as html_file:
                    html_file.write(contents)
main()
