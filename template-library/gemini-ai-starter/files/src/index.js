/** @format */

import { generateText, analyzeImage, chat } from './utils/gemini.js'

async function runExamples() {
  console.log('\n--- Text Generation Example ---')
  const textPrompt = 'Write a short story about a robot learning to love.'
  const generatedStory = await generateText(textPrompt)
  console.log('Generated Story:', generatedStory)

  console.log('\n--- Image Analysis Example ---')
  // For image analysis, you'd typically load an image from a file or URL.
  // Here's a placeholder. Replace with actual image loading logic if needed.
  // Example: const imageBuffer = fs.readFileSync('./path/to/your/image.jpg');
  // const imageParts = [{ inlineData: { data: imageBuffer.toString('base64'), mimeType: 'image/jpeg' } }];
  // For demonstration, we'll use a dummy image part.
  const dummyImagePart = {
    inlineData: {
      data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      mimeType: 'image/png',
    },
  }
  const imagePrompt = 'Describe this image.'
  const imageAnalysis = await analyzeImage(imagePrompt, [dummyImagePart])
  console.log('Image Analysis:', imageAnalysis)

  console.log('\n--- Multi-turn Conversation Example ---')
  const history = [
    { role: 'user', parts: ['Hello, Gemini!'] },
    { role: 'model', parts: ['Hello there! How can I help you today?'] },
  ]
  const chatResponse = await chat(history, 'What is the capital of France?')
  console.log('Chat Response:', chatResponse)

  // Example with a different model (if available and suitable for the task)
  // console.log('\n--- Text Generation with specific model ---');
  // const creativeStory = await generateText('Write a poem about the ocean.', MODELS.TEXT_ONLY);
  // console.log('Creative Story:', creativeStory);
}

runExamples()
