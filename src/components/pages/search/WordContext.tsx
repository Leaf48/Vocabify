import axios from "axios";
import * as cheerio from "cheerio"
import { createContext, useState } from "react";
import { IWord, IWordDefinition } from "./Constants";

import jwt from "jsonwebtoken";

interface IWordContext{
    word: string
    setWord: React.Dispatch<React.SetStateAction<string>>
    getNoun(word: string): void
    getVerb(word: string): void
    getAdj(word: string): void
    getAdv(word: string): void
    submitted: boolean
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    selectedWord: IWordDefinition | null
    setSelectedWord: React.Dispatch<React.SetStateAction<IWordDefinition | null>>
    nounWord: IWord | null
    setNounWord: React.Dispatch<React.SetStateAction<IWord | null>>
    verbWord: IWord | null
    setVerbWord: React.Dispatch<React.SetStateAction<IWord | null>>
    adjectiveWord: IWord | null
    setAdjectiveWord: React.Dispatch<React.SetStateAction<IWord | null>>
    adverbWord: IWord | null
    setAdverbWord: React.Dispatch<React.SetStateAction<IWord | null>>
}

const apis = {
    "noun": process.env.REACT_APP_PROXY_SERVER + "scrape?url=https://www.wordhippo.com/what-is/the-noun-for/",
    "verb": process.env.REACT_APP_PROXY_SERVER + "scrape?url=https://www.wordhippo.com/what-is/the-verb-for/",
    "adjective": process.env.REACT_APP_PROXY_SERVER + "scrape?url=https://www.wordhippo.com/what-is/the-adjective-for/",
    "adverb": process.env.REACT_APP_PROXY_SERVER + "scrape?url=https://www.wordhippo.com/what-is/the-adverb-for/",
}

export const WordContext = createContext<IWordContext>({
    word: "",
    setWord: () => {},
    getNoun: () => {},
    getVerb: () => {},
    getAdj: () => {},
    getAdv: () => {},
    submitted: false,
    setSubmitted: () => {},
    selectedWord: null,
    setSelectedWord: () => {},
    nounWord: null,
    setNounWord: () => {},
    verbWord: null,
    setVerbWord: () => {},
    adjectiveWord: null,
    setAdjectiveWord: () => {},
    adverbWord: null,
    setAdverbWord: () => {},
})

const createToken = (): string => {
    const secretKey = String(process.env.REACT_APP_SECRET)
    const token = jwt.sign({timestamp: Date.now()}, secretKey, {expiresIn: "1m"})
    return String(token)
}

// scrape only word
const scrape = async (url: string, word: string, type: "Noun" | "Verb" | "Adjective" | "Adverb"): Promise<IWord | null> => {
    try{
        const token = createToken()
        const URL = url + word + ".html"
        const {data} = await axios.get(URL)
        const $ = cheerio.load(data)

        const wordDetail: IWord = {
            type: type,
            word: word,
            words: []
        }

        const _words: string[] = []
        const _meaning: string[] = []

        $("div table tbody tr .defv2wordtype").each((index, element) => {
            _words.push($(element).text())
        })
        $("div table tbody tr .defv2relatedwords").each((index, element) => {
            _meaning.push($(element).text() === "" ? "" : $(element).text())
        })

        console.log(_words.length)
        console.log(_meaning.length)
        const wordObjects: IWordDefinition[] = _words.map((w, i) => ({
            type: type,
            word: w,
            meaning: _meaning[i]
        }))

        wordDetail.words = wordObjects

        console.log(wordDetail)


        return wordDetail

    } catch(e){
        console.error(e)
        return null
    }
}


export const WordProvider = (props: any) => {
    const {children} = props

    // set word
    const [word, setWord] = useState<string>("")

    // 品詞
    const [nounWord, setNounWord] = useState<IWord | null>(null)
    const [verbWord, setVerbWord] = useState<IWord | null>(null)
    const [adjectiveWord, setAdjectiveWord] = useState<IWord | null>(null)
    const [adverbWord, setAdverbWord] = useState<IWord | null>(null)

    // is form submitted
    const [submitted, setSubmitted] = useState<boolean>(false)

    // is word selected
    const [selectedWord, setSelectedWord] = useState<IWordDefinition | null>(null)

    const getNoun = async (word: string) => {
        const w = await scrape(apis["noun"], word, "Noun")

        setNounWord(w)
    }
    const getVerb = async (word: string) => {
        const w = await scrape(apis["verb"], word, "Verb")

        setVerbWord(w)
    }
    const getAdj = async (word: string) => {
        const w = await scrape(apis["adjective"], word, "Adjective")

        setAdjectiveWord(w)
    }
    const getAdv = async (word: string) => {
        const w = await scrape(apis["adverb"], word, "Adverb")

        setAdverbWord(w)
    }


    return (
        <WordContext.Provider value={{
            word, setWord, 
            getNoun, getVerb, getAdv, getAdj, 
            nounWord, setNounWord, verbWord, setVerbWord, adjectiveWord, setAdjectiveWord, adverbWord, setAdverbWord,
            submitted, setSubmitted,
            selectedWord, setSelectedWord
        }}>
            {children}
        </WordContext.Provider>
    )
}