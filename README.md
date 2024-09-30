# Programming Agent UI

## Description

Your Programming Agent allows you to discuss with an AI chatbot what sort of custom web app you'd like it to create for you. Within a few seconds you'll see the results! 

This repo contains the main frontend code.

For the backend repo, see the [Programming Agent Server](https://github.com/stephen1cowley/programming-agent-server). For the contents of the user app Docker container (editted live by the AI), see the [User React App](https://github.com/stephen1cowley/user-react-app).

## Features
See [Programming Agent Server](https://github.com/stephen1cowley/programming-agent-server) for a detailed description of the app's features and usage examples.

## Architecture

See [Programming Agent Server](https://github.com/stephen1cowley/programming-agent-server) for a detailed description of the app's network and services architecture.


## Installation
### Prerequisites
- Node.js installed (see [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
- npm installed (see [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

To run a local development server:
```bash
npm install
npm start
```

To overcome the login, either set up a User Pool on AWS and configure `src/aws-exports.js` accordingly, or for a quick solution, remove the `Authenticator` component from `src/App.js` but ensure the `user.username` variable is correctly passed in to the other functions, as it is a header in API calls to the backend, which is assumed to be a subfolder name in the S3 buckets and the primary key `userID` of the DynamoDB table.
