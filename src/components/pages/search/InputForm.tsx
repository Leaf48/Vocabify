import React, { useContext } from 'react'
import { WordContext } from './WordContext'

const InputForm = () => {
    const {word, setWord, getNoun} = useContext(WordContext)

    const changeWord = (w: any) => {
        setWord(w.target.value)
    }
    
    return (
        <div className='flex items-center justify-center flex-col py-3'>
            <input value={word} onChange={changeWord} type='text'/>
            <button onClick={() => getNoun(word)} 
            className='font-mono text-white text-2xl bg-zinc-800 p-3 rounded-full px-10 my-4 button'>
                Search
            </button>
        </div>
    )
}

export default InputForm