import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as cheerio from "cheerio"
import { WordContext } from './WordContext'
import InputForm from './InputForm'


function Search() {
  const {word, nounWord} = useContext(WordContext)

  return (
    <div>
      <InputForm />
      <div>{word}</div>
      <div>{nounWord?.words}</div>
      <div>
        {
          nounWord?.words.join(", ")
        }
      </div>
    </div>
  )
}

export default Search