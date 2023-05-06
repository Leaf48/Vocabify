import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as cheerio from "cheerio"

const api = {
  "noun": "http://localhost:5000/scrape?url=https://www.wordhippo.com/what-is/the-noun-for/",
  "verb": "http://localhost:5000/scrape?url=https://www.wordhippo.com/what-is/the-verb-for/",
  "adjective": "http://localhost:5000/scrape?url=https://www.wordhippo.com/what-is/the-adjective-for/",
  "adverb": "http://localhost:5000/scrape?url=https://www.wordhippo.com/what-is/the-adverb-for/",
}

const scrape = async (url: string, word: string): Promise<Array<string>> => {
  try{
    const fullURL = url + word + ".html"
    const {data} = await axios.get(fullURL)
    const $ = cheerio.load(data)

    const words: Array<string> = []

    $("div table tbody tr .defv2wordtype").each((index, element) => {
      words.push($(element).text())
    })
    
    return words
  }catch(e){
    console.error(e)
    return []
  }
}

const getIP = async (): Promise<string> => {
  const r = await axios.get("https://api.ipify.org/?format=plane")
  return r["data"]
}

function Search() {
  const [ip, setIP] = useState<string>("")
  const [noun, setNoun] = useState<string>("")

  // word
  useEffect(() => {
    console.log("WORD")
    const res = async () => {
      const r = await scrape(api["noun"], "philanthropist")
      console.log(r)
      setNoun(r[0])
    }
    res()
  }, [])

  // ip
  useEffect(() => {
    console.log("IP")
    getIP().then(r => {
      setIP(r)
    })
  }, [])



  













  return (
    <div>
      <div>{ip}</div>
      <div>{noun}</div>
    </div>
  )
}

export default Search