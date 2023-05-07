import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as cheerio from "cheerio"
import { WordContext } from './WordContext'
import InputForm from './InputForm'


function Search() {
  const {word, nounWord, submitted} = useContext(WordContext)

  return (
    <>
      <InputForm />

      <div className='p-5 font-serif text-white'>
        {
          submitted &&
          <div className='text-6xl mb-3'>
            <p className='inline text-3xl'>{nounWord?.type} of </p>{nounWord?.word}
          </div>
        }
        <div>
          {
            nounWord?.words.join(", ")
          }
        </div>
      </div>
    </>
  )
}

export default Search