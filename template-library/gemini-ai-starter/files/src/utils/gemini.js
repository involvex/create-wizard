/** @format */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { GEMINI_API_KEY, getModel, MODELS } from '../config.js'

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in your .env file.')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

async function generateText(prompt, modelType = MODELS.TEXT_ONLY) {
  try {
    const model = genAI.getGenerativeModel({ model: getModel(modelType) })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating text:', error)
    throw error
  }
}

async function analyzeImage(prompt, imageParts, modelType = MODELS.TEXT_AND_IMAGE) {
  try {
    const model = genAI.getGenerativeModel({ model: getModel(modelType) })
    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error analyzing image:', error)
    throw error
  }
}

async function chat(history, message, modelType = MODELS.TEXT_ONLY) {
  try {
    const model = genAI.getGenerativeModel({ model: getModel(modelType) })
    const chat = model.startChat({ history })
    const result = await chat.sendMessage(message)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error in chat:', error)
    throw error
  }
}

export { generateText, analyzeImage, chat }
