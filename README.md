
![SSW Banner](https://user-images.githubusercontent.com/17246482/213943898-d3d7268c-0636-4469-ad47-4052302cf567.png)
# SSW.Website v3!


This repository is a v3 of the SSW.Website. This website uses NextJS with TinaCMS.

## See the important Documents
- Instructions - Compile (F5 Experience)
- Instructions - Deployment
- Business
- Technologies and Architecture
- Alternative Solutions Considered
- Definition of Done
- Definition of Ready

## Architecture Overview
![Architecture-Diagram](https://user-images.githubusercontent.com/17246482/213943914-a98f32b5-4b65-4316-82ca-9cd308f3f315.png)

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.
- A [TinaCMS](https://app.tina.io) account for live editing.

## Get Started

Install the project's dependencies:

```
yarn install
```

Run the project locally:

```
yarn dev
```

### Local URLs

- http://localhost:3000 : browse the website
- http://localhost:3000/admin : connect to Tina Cloud and go in edit mode
- http://localhost:3000/exit-admin : log out of Tina Cloud
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation

## Pull Requests

Each Pull Request will be deployed to its own staging environment, the URL to the environment is available in the PR thread.

## Getting Help

- [Email SSW](mailto:info@ssw.com.au) to schedule a call.
- Reach out through the chat widget on [ssw.com.au](https://ssw.com.au)

- Visit the [documentation](https://tina.io/docs/) to learn about Tina.
- [Join the Tina Discord](https://discord.gg/zumN63Ybpf) to share feedback for Tina to improve.