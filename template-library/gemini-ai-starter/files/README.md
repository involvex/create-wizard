# Gemini AI Starter Project

This template provides a basic setup for interacting with the Google Gemini AI API, demonstrating text generation, image analysis, and multi-turn conversations.

## Project Structure

```
.env.example
package.json
README.md
src/
├── index.js
├── config.js
└── utils/
    └── gemini.js
```

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Get Your Gemini API Key**:
    *   Go to the [Google AI Studio](https://aistudio.google.com/)
    *   Create a new API key.

3.  **Configure Environment Variables**:
    *   Rename `.env.example` to `.env`.
    *   Open `.env` and replace `YOUR_GEMINI_API_KEY` with your actual API key:
        ```
        GEMINI_API_KEY=your_actual_api_key_here
        ```

## Usage

To run the example code:

```bash
npm start
```

This will execute `src/index.js`, which demonstrates various Gemini API interactions.

## API Key Management

Your `GEMINI_API_KEY` is a sensitive credential. Keep it secure and never commit it directly to version control. The `.env` file is used to load this key securely at runtime.

## Model Selection Logic

The `src/config.js` file defines the available Gemini models and provides a `getModel` function for selection:

*   `MODELS.TEXT_ONLY`: Used for text-based prompts (e.g., `gemini-pro`).
*   `MODELS.TEXT_AND_IMAGE`: Used for multimodal prompts involving text and images (e.g., `gemini-pro-vision`).

The `getModel` function ensures that a valid model is used, falling back to `gemini-pro` if an unrecognized model type is requested. You can extend the `MODELS` object in `config.js` to include other Gemini models as they become available.

## Examples in `src/index.js`

*   **Text Generation**: Demonstrates how to send a text prompt and receive a text response.
*   **Image Analysis**: Shows how to send a text prompt along with image data (base64 encoded) for analysis. (Note: A dummy image part is used; replace with actual image loading for real use cases).
*   **Multi-turn Conversation**: Illustrates how to maintain conversation history for a more natural chat experience.
