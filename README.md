# TODO App

This is the repository for React Todo App, written in React with Typescript. 
This project aims to provide users the possibility to create and manage tasks.

##Prerequisites

- [Node.js version 12 or above](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com/download) or any other Javascript IDE
- [Yarn (recommended)](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) or any other package manager

## Getting started

1. Install dependencies.

   ```bash
   yarn install
   ```

2. Start dev server with hot reload at http://localhost:3000.
   ```bash
   yarn dev
   ```

## What's inside?

- [ReactJS](https://reactjs.org), a JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev), a build tool that comes with a dev server, and it bundles your code for production.
- [TypeScript](https://www.typescriptlang.org) for strong type checking.
- [Jest](https://jestjs.io) for unit testing with React.
- [Testing Library](https://testing-library.com) for easier DOM query when testing.
- [Cypress](https://www.cypress.io) for e2e testing.
- [ESLint](https://eslint.org) for clean and quality code.
- [Prettier](https://prettier.io) for formatting code and avoid conflicting code style in code review.
- [Commitlint](https://commitlint.js.org) for checking commit messages.
- [Polyfills](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#readme) to provide support for legacy browsers that do not support [native ESM](https://caniuse.com/es6-module). 
- [Tailwind CSS 3](https://tailwindcss.com/), a utility-first CSS framework that supports many built-in classes.

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Other commands

### Lint commands

```bash
yarn eslint
```

### Build commands

```bash
yarn build
```

### Run the app in production mode at http://localhost:3000.

```bash
yarn serve
```

### Test commands

- Start dev server at http://localhost:3000
  ```bash
  yarn dev
  ```
- Run e2e tests with Cypress on terminal
  ```bash
  yarn cy:run
  ```
- Run e2e tests with Cypress user interface
  ```bash
  yarn cy:open
  ```
