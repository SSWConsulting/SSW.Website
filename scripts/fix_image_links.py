import os
import re
from bs4 import BeautifulSoup

def find_image_paths(html_content):
    img_paths = re.findall(r'<img[^>]+src="([^">]+)"', html_content)
    return img_paths

def check_image_exists(image_path, base_directory):
    """Check if the image exists on the drive."""
    full_path = os.path.join(base_directory, image_path)
    return os.path.exists(full_path)



def image_path_is_relative(image_path: str)-> bool:
    image_path.startswith('/') or (not image_path.startswith('http'))


def main():
    base_directory = "../public/images/Newsletters"
    image_path = "../public/"

    for root, _, files in os.walk(base_directory):
        for file in files:
            if file.endswith('.html'):
                html_file_path = os.path.join(root, file)

                with open(html_file_path, 'r', encoding='utf-8') as html_file:

                    soup = BeautifulSoup(open(html_file_path), 'html.parser')
                    for img_tag in soup.find_all('img'):
                    
                        if(img_tag.has_attr('src')):
                            img_src = img_tag['src']
                            if(image_path_is_relative()):

    
                    # html_content = html_file.read()
                    image_paths = find_image_paths(html_content)
                    
                    for image_path in image_paths:
                        if not check_image_exists(image_path, base_directory):
                            print(f"Error: Image '{image_path}' not found in '{html_file_path}'")
                            # Example of replacing the missing image path with a placeholder
                            html_content = html_content.replace(image_path, 'placeholder.png')
                
                # Write the modified content back to the file
                with open(html_file_path, 'w', encoding='utf-8') as html_file:
                    html_file.write(html_content)

if __name__ == "__main__":
    main()