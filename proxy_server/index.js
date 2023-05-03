const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
const port = 5000

app.use(cors())

app.get("/scrape", async(req, res) => {
    const url = req.query["url"]

    try{
        const response = await axios.get(url)

        res.send(response.data)
    } catch(err) {
        res.status(500).send({error: "Error fetching the URL"})
    }
})

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
})