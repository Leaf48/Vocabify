import { useContext, useEffect, useState } from 'react'
import { WordContext } from './WordContext'
import InputForm from './InputForm'
import { IWord, IWordDefinition } from './Constants'
import { completion } from './AISummarize'

function Search() {
  const {searchedWord, nounWord, verbWord, adjectiveWord, adverbWord ,submitted, selectedWord, setSelectedWord} = useContext(WordContext)

  const part: Array<IWord | null> = [nounWord, verbWord, adjectiveWord, adverbWord]

  const [summary, setSummary] = useState<string | null>(null)

  useEffect(() => {
    if(selectedWord){
      const sumup = async () => {
        const r = await completion(selectedWord?.meaning ? selectedWord.meaning : "")
        setSummary(r)
      }
      sumup()
    }
  }, [selectedWord])


  const handleClick = (word: IWordDefinition) => {
    setSelectedWord(word)
  }

  return (
    <>
      <InputForm />

      {selectedWord &&
        <div className='text-white text-6xl m-5'>
          <div>{selectedWord.type} / Word: <p className='text-lg my-3'>{selectedWord.word}</p></div>
          {
            summary && summary !== "" &&
              <div>AI Summarize: <p className='text-lg my-3'>{summary}</p></div>
          }
          <div>Definition: <p className='text-lg my-3'>{selectedWord.meaning}</p></div>
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
                          ${(searchedWord === word.word)? "text-orange-400" : ""}
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