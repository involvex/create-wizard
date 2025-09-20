/** @format */

import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { fileManager } from './tools/fileManager.js'
import { webSearch } from './tools/webSearch.js'

dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in your .env file.')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-pro',
  tools: [fileManager, webSearch],
})

const chat = model.startChat({
  history: [],
})

export async function sendMessageToGemini(message) {
  try {
    const result = await chat.sendMessage(message)
    const response = await result.response

    if (response.functionCall) {
      const { name, args } = response.functionCall
      const tool = [...fileManager.tools, ...webSearch.tools].find(t => t.name === name)

      if (tool) {
        const toolResponse = await tool.execute(args)
        const toolResult = await chat.sendMessage({
          functionResponse: { name, content: JSON.stringify(toolResponse) },
        })
        return toolResult.response.text()
      } else {
        return 'Tool not found.'
      }
    } else {
      return response.text()
    }
  } catch (error) {
    console.error('Error communicating with Gemini API:', error)
    return 'An error occurred while processing your request.'
  }
}
