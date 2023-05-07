import axios from "axios";
import * as cheerio from "cheerio"
import { createContext, useState } from "react";

interface IWordContext{
    word: string
    setWord: React.Dispatch<React.SetStateAction<string>>
    getNoun(word: string): void
    getVerb(word: string): void
    getAdj(word: string): void
    getAdv(word: string): void
    nounWord: IWord | null
    setNounWord: React.Dispatch<React.SetStateAction<IWord | null>>
    submitted: boolean
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

interface IWord {
    status: "Success" | "Failed"
    type: "Noun" | "Verb" | "Adjective" | "Adverb"
    word: string
    words: Array<string>
}

const apis = {
    "noun": "http://192.168.2.169:5000/scrape?url=https://www.wordhippo.com/what-is/the-noun-for/",
    "verb": "http://192.168.2.169:5000/scrape?url=https://www.wordhippo.com/what-is/the-verb-for/",
    "adjective": "http://192.168.2.169:5000/scrape?url=https://www.wordhippo.com/what-is/the-adjective-for/",
    "adverb": "http://192.168.2.169:5000/scrape?url=https://www.wordhippo.com/what-is/the-adverb-for/",
  }

export const WordContext = createContext<IWordContext>({
    word: "",
    setWord: () => {},
    getNoun: () => {},
    getVerb: () => {},
    getAdj: () => {},
    getAdv: () => {},
    nounWord: null,
    setNounWord: () => {},
    submitted: false,
    setSubmitted: () => {}
})

// scrape only word
const scrape = async (url: string, word: string): Promise<Array<string> | null> => {
    try{
        const URL = url + word + ".html"
        const {data} = await axios.get(URL)
        const $ = cheerio.load(data)

        const words: Array<string> = []

        $("div table tbody tr .defv2wordtype").each((index, element) => {
            words.push($(element).text())
        })

        return words

    } catch(e){
        console.error(e)
        return null
    }
}


export const WordProvider = (props: any) => {
    const {children} = props

    // set word
    const [word, setWord] = useState<string>("")

    // noun
    const [nounWord, setNounWord] = useState<IWord | null>(null)

    // is form submitted
    const [submitted, setSubmitted] = useState<boolean>(false)

    const getNoun = async (word: string) => {
        const w = await scrape(apis["noun"], word)

        setNounWord({
            status: w ? "Success" : "Failed",
            type: "Noun",
            word: word,
            words: w ? w : []
        })
    }
    const getVerb = async (word: string) => {
        // smth
    }
    const getAdj = async (word: string) => {
        // smth
    }
    const getAdv = async (word: string) => {
        // smth
    }


    return (
        <WordContext.Provider value={{
            word, setWord, 
            getNoun, getVerb, getAdv, getAdj, 
            nounWord, setNounWord,
            submitted, setSubmitted
        }}>
            {children}
        </WordContext.Provider>
    )
}