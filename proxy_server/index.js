const express = require("express")
const axios = require("axios")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const {Configuration, OpenAIApi} = require("openai")
const dotenv = require("dotenv").config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API
})
const openapi = new OpenAIApi(configuration)

const app = express()
const port = 5000

app.use(cors({
    origin: [process.env.HOST_URL, "http://" + process.env.HOST_URL],
    optionsSuccessStatus: 200
}))

app.get("/scrape", async(req, res) => {
    const url = req.query["url"]

    try{
        const response = await axios.get(url)

        res.send(response.data)
    } catch(err) {
        res.status(500).send({error: "Error fetching the URL"})
    }
})

const chatGPTLimiter = rateLimit({
    windowMs: 1000 * 60 * 10,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
})
app.get("/ai", chatGPTLimiter, async (req, res) => {
    
    const definition = req.query["definition"]

    if(definition && definition !== ""){
        const result = await openapi.createChatCompletion({
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

        try{
            const res_json = {
                result: String(result.data.choices[0].message?.content)
            }
            res.send(res_json)
        }catch(error){
            res.status(500).send({error: "Definition is not provided"})
        }
    }else{
        res.status(500).send({error: "Definition is not provided"})
    }


})

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
})