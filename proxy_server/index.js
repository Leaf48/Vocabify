const express = require("express")
const axios = require("axios")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const {result} = require("./src/api_ai")

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const session = require("express-session")

const app = express()
const port = 5000

app.use(cors({
    origin: [process.env.HOST_URL, "http://" + process.env.HOST_URL],
    optionsSuccessStatus: 200
}), session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}))

app.get("/hello", (req, res) => {
    // if(!req.session.id){
    //     req.session.id = req.sessionID
    // }
    // res.json({
    //     session_id: req.session.id
    // })
    res.send("hello")
})

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
        try{
            const r = await result(definition)
            res.send(r)
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