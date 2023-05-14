const {Configuration, OpenAIApi} = require("openai")
const dotenv = require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API
})
const openapi = new OpenAIApi(configuration)

export const result = async (definition) => {
    await openapi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "Sum up the following definition in 1 sentence."
            },
            {
                role: "assistant",
                content: definition 
            }
        ]
    })
    const res_json = {
        result: String(result.data.choices[0].message?.content)
    }
    return res_json
}