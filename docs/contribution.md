<!-- @format -->

# Contributing to @involvex/create-wizard

We welcome contributions to the `@involvex/create-wizard` project! By contributing, you help us make this CLI tool even better for the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on our GitHub repository. When reporting a bug, please include:

- A clear and concise description of the bug.
- Steps to reproduce the behavior.
- Expected behavior.
- Actual behavior.
- Screenshots or error messages (if applicable).
- Your operating system, Node.js version, and `create-universe` version.

### Suggesting Enhancements

We're always looking for ways to improve `create-universe`. If you have an idea for a new feature or an enhancement to an existing one, please open an issue on GitHub. Describe your suggestion clearly and explain why you think it would be valuable.

### Code Contributions

We encourage code contributions! If you'd like to submit code, please follow these steps:

1.  **Fork the repository**:
    Go to [https://github.com/involvex/create-universe]https://github.com/involvex/create-wizard and click the "Fork" button.

2.  **Clone your forked repository**:

    ```bash
    git clone https://github.com/YOUR_USERNAME/create-universe.git
    cd create-universe
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    ```

4.  **Create a new branch**:
    Choose a descriptive name for your branch (e.g., `feature/add-new-template`, `fix/bug-in-git-init`).

    ```bash
    git checkout -b feature/your-feature-name
    ```

5.  **Make your changes**:
    Implement your feature or bug fix. Ensure your code adheres to the project's coding style and conventions.

6.  **Run tests**:
    Before committing, make sure all existing tests pass and add new tests for your changes if applicable.

    ```bash
    npm test
    ```

7.  **Lint and format your code**:
    Ensure your code is properly linted and formatted.

    ```bash
    npm run check
    ```

8.  **Commit your changes**:
    Write a clear and concise commit message. We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

    ```bash
    git commit -m "feat: add new template for XYZ"
    ```

    (Replace `feat` with `fix`, `docs`, `chore`, etc., as appropriate.)

9.  **Push your branch**:

    ```bash
    git push origin feature/your-feature-name
    ```

10. **Open a Pull Request (PR)**:
    Go to your forked repository on GitHub and open a new pull request to the `main` branch of the original `involvex/create-universe` repository. Provide a clear description of your changes and reference any related issues.

## Code Style and Conventions

- **Linting**: We use ESLint to enforce code quality. Please run `npm run lint` and `npm run lint:fix` before committing.
- **Formatting**: We use Prettier for code formatting. Please run `npm run format` before committing.
- **Commit Messages**: Follow the Conventional Commits specification.

## License

By contributing to `@involvex/create-wizard`, you agree that your contributions will be licensed under the project's MIT License.
