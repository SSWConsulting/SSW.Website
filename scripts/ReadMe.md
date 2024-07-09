# Meta Description Generator

## Description

Similar to [rules](https://github.com/SSWConsulting/SSW.Rules.Content/blob/main/scripts/generateSeoDescriptions/README.md) we have a generator for our main website. Their implementation uses Llama 3 whereas ours uses GPT 4 for the time being. This means that the script will cost a small amount of money to run. $0.06 per page (assuming the the api call doesn't fail).

## Requirements

- Python
- Google Chrome
- Chrome Driver
- An Open AI Api Key
- ##### Run the following cli commands to install the required python modules

## Running the script

1. navigate to `SSW.Website/scripts`
2. create a file called `.env` at the base of this route
3. Add the following: OPENAI_API_KEY = <YOUR API KEY> **Note** If you don't have an API Key see the steps under "Getting an API Key"
4. Download [Chrome Driver](https://developer.chrome.com/docs/chromedriver/downloads), save it somewhere on your local machine. Then add the following variable to .env `CHROME_DRIVER_PATH = <PATH TO CHROME DRIVER>`
5. run `python seo_description_filler.py` from the base of `ssw.website/scripts`
6. If all of the markdown pages already have descriptions
7. Create a pull request with all of the new .mdx files generated. **Note** you will also see a file at the base of
   `/scripts` called `seo_descriptions.xlsx`. DO NOT INCLUDE THIS IN YOU PULL REQUEST. Instead include it in your PR description to make it easier for others to review.

## Getting an API Key

1. Navigate to `https://platform.openai.com/settings/organization/billing/overview`
2. Click "Add credit to balance"
3. Enter your desired amount, You'll need about $0.06 per page. (It's unreasonable to expect people to pay to run the script so I've created a todo for replacing this implementation with an olm)
4. Navigate to `https://platform.openai.com/api-keys`
5. Click "+ Create new secret key" | Create new secret key **Note**
6. Save the key in Keeper or your password manager of choice
