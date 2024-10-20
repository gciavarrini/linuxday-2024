# LinuxDay 2024

Welcome to the **LinuxDay 2024** repository! \
This project includes slides and a demo application for LinuxDay Pisa 2024.

## Demo

This repository contains a pre-built React app that will be used during the demo to showcase the functionality of the generated TypeScript Axios client.

### Getting Started with Your Own React App

If you want to create your own React app, you can do so by running the following command:

```bash
npx create-react-app <YOUR_REACT_APP_NAME> --template typescript
```

## Installation of OpenAPI Generator

To generate client and server code, you'll need to install the OpenAPI Generator. Please follow the installation steps provided in the
[official docs](https://openapi-generator.tech/docs/installation)

## Code Generation
### Listing Available Generators

To see all available generators (for client, server, documentation, schema, and configuration), run the following command:
`openapi-generator-cli list`

## Generating the Go Gin Server

To generate the Go Gin server code, use the command below, replacing <YOUR_GIT_ID> and <YOUR_GIT_REPO_ID> with your own details:

`openapi-generator-cli generate -g go-gin-server -i linux-day-api.yaml -o ./generated/go-gin-server --git-user-id <YOUR_GIT_ID> --git-repo-id <YOUR_GIT_REPO_ID>>`

After generating the server, edit `main.go` and run it using: `go run main.go`

## Generating the TypeScript Axios Client
To generate the TypeScript Axios client, execute the following command:
`openapi-generator-cli generate -i linux-day-api.yaml -g typescript-axios -o linuxday-react-app/src/generated/ts-axios-client -p npmName=linuxday-org`

For simplicity during the demo, a script is included in the `package.json` of the React app. 
You can run the following command to generate the client: `npm run generate:ts-axios`

Finally, start the client application by running: `npm start`