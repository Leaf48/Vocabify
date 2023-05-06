import React, { useState, useContext } from 'react'
import { WordContext } from './WordContext'

const InputForm = () => {
    const {word, setWord, getNoun} = useContext(WordContext)

    const changeWord = (w: any) => {
        setWord(w.target.value)
    }
    
    return (
        <div>
            <input value={word} onChange={changeWord} type='text'/>
            <button onClick={() => getNoun(word)}>Find</button>
        </div>
    )
}

export default InputForm