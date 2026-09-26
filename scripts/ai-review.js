/** @format */

import ModelClient, { isUnexpected } from '@azure-rest/ai-inference'
import { AzureKeyCredential } from '@azure/core-auth'
import env from 'dotenv'
env.config()

const token = env.GH_TOKEN || process.env['GH_TOKEN']
const endpoint = 'https://models.github.ai/inference'
const model = 'openai/gpt-4.1'

export async function main() {
  if (!token) {
    console.error(
      'Missing GH_TOKEN. Set it via a .env file (GH_TOKEN=...) or the GH_TOKEN environment variable.',
    )
    process.exit(1)
  }
  const client = ModelClient(endpoint, new AzureKeyCredential(token))

  const response = await client.path('/chat/completions').post({
    body: {
      messages: [
        { role: 'system', content: 'you are a helpful code review assistant' },
        {
          role: 'user',
          content:
            'summarize the project ' +
            '../package.json' +
            './create-app.js' +
            './create-plugin.js' +
            './create-test-setup.js' +
            '../CHANGELOG.md' +
            '../README.md' +
            '../docs/docs/installation.md' +
            '../docs/docs/usage.md',
        },
      ],
      temperature: 1,
      top_p: 1,
      model: model,
    },
  })

  if (isUnexpected(response)) {
    throw response.body.error
  }

  console.log(response.body.choices[0].message.content)
}

main().catch(err => {
  console.error('The sample encountered an error:', err)
})
