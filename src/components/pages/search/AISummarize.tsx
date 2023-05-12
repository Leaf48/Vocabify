import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API
})
const openapi = new OpenAIApi(configuration)

export const completion =  async (prompt: string) => {
    const result = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: "Sum up the following definition in 1 sentence."
      },
      {
        role: "assistant",
        content: prompt
      }
      ]
    })
    return result.data.choices[0].message?.content
}