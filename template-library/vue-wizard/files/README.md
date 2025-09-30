# Project Name

> A brief description of your project.

[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/<OWNER>/<REPO>/actions/workflows/pages.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/pages.yml)
[![GitHub release](https://img.shields.io/github/release/<OWNER>/<REPO>.svg)](https://github.com/<OWNER>/<REPO>/releases)

This project is a Vue.js application built with Vite, TypeScript, Pinia, and Vue Router. It's set up with a full development environment, including linting, formatting, testing, and CI/CD.

## Features

- **Vue 3**: Composition API, `<script setup>`
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety for your code
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **GitHub Actions**: CI/CD for testing, building, and deploying to GitHub Pages
- **Dark/Light Mode**: Theme switcher
- **Responsive UI**: Adapts to different screen sizes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/<OWNER>/<REPO>.git
    cd <REPO>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server, run:

```bash
npm run dev
```

### Build

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

To run the unit tests, run:

```bash
npm run test
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Runs the unit tests.
- `npm run lint`: Lints the code.
- `npm run format`: Formats the code with Prettier.
- `npm run typecheck`: Checks for TypeScript errors.

## CI/CD

This project uses GitHub Actions for CI/CD. The following workflows are configured:

- **CI**: Runs on every push to the `dev` branch. It installs dependencies, runs tests, lints the code, and checks for type errors.
- **Deploy to GitHub Pages**: Runs on every push to the `main` branch. It builds the project and deploys it to GitHub Pages.
- **Release**: Can be manually triggered to create a new release and tag.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
