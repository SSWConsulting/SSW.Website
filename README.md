# SSW.Website

![SSW Banner](https://user-images.githubusercontent.com/17246482/213943898-d3d7268c-0636-4469-ad47-4052302cf567.png)

This repository is a v3 of the zzSSW.Website. This website uses NextJS with TinaCMS.

[SSW Website - Editing with TinaCMS](https://www.youtube.com/watch?v=K0WVfM7yCKg&t=9s)

## See the important Documents

- [Instructions - Compile (F5 Experience)](<https://github.com/SSWConsulting/SSW.Website/wiki/Instructions---Compile-(F5-Experience)>)
- [Instructions - Deployment](https://github.com/SSWConsulting/SSW.Website/wiki/Instructions---Deployment)
- [Business](https://github.com/SSWConsulting/SSW.Website/wiki/Business)
- [Technologies and Architecture](https://github.com/SSWConsulting/SSW.Website/wiki/Technologies-and-Architecture)
- [Alternative Solutions Considered](https://github.com/SSWConsulting/SSW.Website/wiki/Alternative-Solutions-Considered)
- [Definition of Done](https://github.com/SSWConsulting/SSW.Website/wiki/Definition-of-Done)
- [Definition of Ready](https://github.com/SSWConsulting/SSW.Website/wiki/Definition-of-Ready)
- [SSW Website - Power Automate flows](https://github.com/SSWConsulting/SSW.Website/wiki/Power-Automate-Flows)

## Architecture Overview

![architecture-diagram](https://user-images.githubusercontent.com/17246482/213947700-2ab46353-5e1b-4e65-9681-9fddf69fdda0.png)

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.
- A [TinaCMS](https://app.tina.io) account for live editing.

## Get Started

Install the project's dependencies:

```bash
yarn install
```

Run the project locally:

```bash
yarn dev
```

Build the project:

```bash
yarn build
```

## Get Started with Dev Container

### How to

1. Open Command Palette in VSCode

```vscode
> Dev Containers: Reopen in Container
```

2. Develop as you would normally

### **Don't want to use Dev Container any more?**

1. Close VSCode connected with the Dev Container
2. Open project folder on host machine
3. Remove node_modules and reinstall dependencies

```bash
yarn install
```

## Updating the project's dependencies

```bash
yarn upgrade-interactive
```

Test locally to make sure everything still works.

To keep the `yarn.lock` file up to date, ensure syncyarnlock is installed globally:

```bash
yarn global add syncyarnlock
```

Then run:

```bash
syncyarnlock -s -k
```

### Local URLs

- <http://localhost:3000> : browse the website
- <http://localhost:3000/admin> : connect to Tina Cloud and go in edit mode
- <http://localhost:3000/exit-admin> : log out of Tina Cloud
- <http://localhost:4001/altair/> : GraphQL playground to test queries and browse the API documentation

## Pull Requests

Each Pull Request will be deployed to its own staging environment, the URL to the environment is available in the PR thread.

## Getting Help

- [Email SSW](mailto:info@ssw.com.au) to schedule a call.
- Reach out through the chat widget on [ssw.com.au](https://www.ssw.com.au)

- Visit the [documentation](https://tina.io/docs/) to learn about Tina.
- [Join the Tina Discord](https://discord.gg/zumN63Ybpf) to share feedback for Tina to improve.
