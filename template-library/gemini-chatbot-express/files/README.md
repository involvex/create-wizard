# Gemini Chatbot with Express.js and Tool Usage

This template provides a basic AI chatbot using Node.js, Express.js, and Google's Gemini API, with integrated tool usage for file interaction and web search.

## Features

*   **Express.js Server**: A simple web server to handle chat requests.
*   **Gemini API Integration**: Communicates with the Gemini API for generating responses.
*   **Tool Usage**: Demonstrates how to enable Gemini to use external tools for tasks like reading/writing files and performing web searches.
*   **Environment Variables**: Securely manage API keys and other configurations.
*   **Basic Message Handling**: A `/chat` endpoint to send messages to the chatbot.

## Project Structure

```
.env.example
package.json
README.md
src/
├── index.js
├── geminiService.js
└── tools/
    ├── fileManager.js
    └── webSearch.js
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
        PORT=3000
        ```

## Usage

1.  **Start the Server**:
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (default: 3000).

2.  **Send Chat Messages**:
    You can send messages to the chatbot by making a `POST` request to `/chat` with a JSON body containing your message. For example, using `curl`:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello, chatbot!"}' http://localhost:3000/chat
    ```

    Or to trigger a tool:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"message": "Please search the web for the current weather in London."}' http://localhost:3000/chat
    ```

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"message": "Can you list the files in the current directory?"}' http://localhost:3000/chat
    ```

## API Key Management

Your `GEMINI_API_KEY` is a sensitive credential. Keep it secure and never commit it directly to version control. The `.env` file is used to load this key securely at runtime.

## Tool Usage Explanation

This chatbot is configured with two custom tools:

*   **`fileManager`**: Allows the Gemini model to interact with the local file system. It includes functions like `read_file`, `write_file`, and `list_directory`.
*   **`webSearch`**: Enables the Gemini model to perform web searches. The `google_web_search` function is a placeholder that simulates a web search; in a production environment, you would integrate it with a real search API.

When you send a message to the chatbot, the Gemini model can decide to call one of these tools if it determines that doing so would help answer your query. The tool's output is then fed back to the model to generate a more informed response.
