import axios from "axios";
import * as cheerio from "cheerio"
import { createContext, useState } from "react";

interface IWordContext{
    word: string
    setWord: React.Dispatch<React.SetStateAction<string>>,
    getNoun(word: string): Promise<void>,
    getVerb(word: string): Promise<void>,
    getAdj(word: string): Promise<void>,
    getAdv(word: string): Promise<void>,
    nounWord: IWord | null
}

interface IWord {
    type: "Noun" | "Verb" | "Adjective" | "Adverb"
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
    getNoun: () => Promise.resolve(),
    getVerb: () => Promise.resolve(),
    getAdj: () => Promise.resolve(),
    getAdv: () => Promise.resolve(),
    nounWord: null
})

const scrape = async (url: string, word: string): Promise<Array<string>> => {
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
        return []
    }
}


export const WordProvider = (props: any) => {
    const {children} = props

    const [word, setWord] = useState<string>("")

    const [nounWord, setNounWord] = useState<IWord | null>(null)

    const getNoun = async (word: string): Promise<void> => {
        const w = await scrape(apis["noun"], word)

        setNounWord({
            type: "Noun",
            words: w
        })

    }
    const getVerb = async (word: string): Promise<void> => {
        // smth
    }
    const getAdj = async (word: string): Promise<void> => {
        // smth
    }
    const getAdv = async (word: string): Promise<void> => {
        // smth
    }


    return (
        <WordContext.Provider value={{
            word, setWord, getNoun, getVerb, getAdv, getAdj, nounWord
        }}>
            {children}
        </WordContext.Provider>
    )
}