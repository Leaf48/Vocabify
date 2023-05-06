import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as cheerio from "cheerio"
import { WordContext } from './WordContext'
import InputForm from './InputForm'


function Search() {
  const {word, nounWord} = useContext(WordContext)

  return (
    <>
      <InputForm />

      <div className=''>
        <div>{nounWord?.type}: {word}</div>
          <p>{nounWord?.type}</p>
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