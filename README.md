# Heard App

## Quick Start

```bash
# Clone the repository (forked from https://github.com/crsandeep/simple-react-full-stack)
git clone https://github.com/xugao/heard-app

# Go inside the directory
cd heard-app

# Install dependencies
yarn install

# Start client and server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run tests
yarn test
```

## Initial Project

The initial code includes the following ...

- General
  - Supports both JS and TS
  - Support linting & auto-formatting using prettier
  - Configured production and dev server builds
  - Configured `jest` as testing framework
- Server side
  - Using node.js + express
  - NoSQL DB connected using MongoDB
  - `/test` route for testing boilerplate code
- Client side
  - _Rendering framework:_ ReactJS + Redux (state management)
  - _Utilities:_ 3rd party component library `@fluentui/react`, CSS-in-JS library `@fluentui/merge-styles`
  - Client side routing using `react-router`
  - Boilerplate code for rendering a dummy home page and `/foo` page, calling dummy API, and setting up the redux store

## Feature Requirements

https://hackmd.io/E4Ds-KIfTnKrHB7pcyNfWg
