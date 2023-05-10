import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as cheerio from "cheerio"
import { WordContext } from './WordContext'
import InputForm from './InputForm'
import { IWord, IWordDefinition } from './constants'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: ""
})
const openapi = new OpenAIApi(configuration)

const completion =  async (prompt: string) => {
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

  console.log(result.data.choices[0].message?.content)
  return result.data.choices[0].message?.content
}


function Search() {
  const {nounWord, verbWord, adjectiveWord, adverbWord ,submitted, selectedWord, setSelectedWord} = useContext(WordContext)

  const part: Array<IWord | null> = [nounWord, verbWord, adjectiveWord, adverbWord]

  const [summary, setSummary] = useState<string>("")

  useEffect(() => {
    const sumup = async () => {
      const r = await completion(selectedWord?.meaning ? selectedWord.meaning : "")
      setSummary(String(r))
    }
    sumup()
  }, [selectedWord])


  const handleClick = (word: IWordDefinition) => {
    setSelectedWord(word)
  }

  return (
    <>
      <InputForm />

      {selectedWord &&
        <div className='text-white text-6xl'>
          <div>Word: <p className='text-lg'>{selectedWord.word}</p></div>
          <div>Definition: <p className='text-lg'>{summary}</p></div>
        </div>
        
      }

      <div className='p-5 font-serif text-white'>

        {
          submitted &&
          part.map((v, index) => {
            if(v?.words.length !== 0){
              return (

                <div key={index}>

                  <div className='text-6xl mb-3'>
                    <p className='inline text-3xl'>{v?.type} of </p>{v?.word}
                  </div>

                  <div className='text-2xl'>
                    {v?.words.map((word, j) => (
                        <span key={j} onClick={() => handleClick(word)} 
                        className={`
                          hover:text-red-400 ease-in-out duration-300
                          ${(selectedWord?.word === word.word) && (selectedWord.type === word.type) ? "text-red-400" : ""}
                        `}
                        >
                          {word.word}{" "}
                        </span>
                    ))}
                  </div>

                </div>

              )
            }
          })
        }


      </div>
    </>
  )
}

export default Search