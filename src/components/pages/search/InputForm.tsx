import React, { useContext, useRef, useEffect } from 'react'
import { WordContext } from './WordContext'

const InputForm = () => {
    const {
        searchedWord, setSearchedWord, getNoun, getVerb, getAdj, getAdv, setSubmitted, selectedWord, setSelectedWord
    } = useContext(WordContext)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus()
        }
    }, [])

    const changeWord = (w: any) => {
        setSearchedWord(w.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getNoun(searchedWord)
        getVerb(searchedWord)
        getAdj(searchedWord)
        getAdv(searchedWord)
        setSubmitted(true)
        setSelectedWord(null)
    }
    
    return (
        <div className='flex items-center justify-center flex-col py-3'>
            <form onSubmit={handleSubmit} className='relative flex flex-row items-center justify-center'>
                <input
                    value={searchedWord} 
                    ref={inputRef}
                    onChange={changeWord} 
                    type='text' 
                    placeholder='bread🍞'
                    className='text-white text-4xl text-center md:w-30 max-md:w-[18rem] h-full border-b border-blue-gray-200 bg-transparent font-mono font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                />
                {
                    searchedWord &&
                    <button
                        type='button'
                        onClick={() => {setSearchedWord(""); inputRef.current?.focus()}}
                        className='absolute top-1/2 right-2 -translate-y-1/2 px-2 text-white text-3xl font-bold focus:outline-none'
                    >
                        ❌
                    </button>
                }
            </form>
            
            <button onClick={() => {
                getNoun(searchedWord); getVerb(searchedWord); getAdj(searchedWord); getAdv(searchedWord); setSubmitted(true); setSelectedWord(null)
            }} 
            className='font-mono text-white text-2xl bg-zinc-800 p-3 rounded-full px-10 my-4 button'>
                Search
            </button>
        </div>
    )
}

export default InputForm