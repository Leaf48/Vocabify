import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

const api = {
  noun: 'http://localhost:5000/scrape?url=https://www.wordhippo.com/what-is/the-noun-for/',
};

const scrape = async (url: string, word: string): Promise<Array<string>> => {
  try {
    const fullURL = url + word + '.html';
    const { data } = await axios.get(fullURL);
    const $ = cheerio.load(data);

    const words: Array<string> = []
    $('div table tbody tr .defv2wordtype').each((nm, elm) => {
      const w = $(elm).text()
      words.push(w)
    })

    console.log(words)
    return words;
  } catch (e) {
    console.error(e);
    return [];
  }
};

function Search() {
  const [noun, setNoun] = useState<string>('');

  console.log('hello');

  useEffect(() => {
    console.log('USEEFFECT');
    const res = async () => {
      const r = await scrape(api['noun'], 'philanthropist');
      setNoun(r[0]);
    };
    res();
  }, []);

  return (
    // <div>{ip}</div>
    <div>{noun}</div>
  );
}

export default Search;
