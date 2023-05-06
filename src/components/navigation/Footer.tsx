import React, { useEffect, useState } from 'react'
import axios from "axios"
import countryJson from "./country.json"

interface IGeolocation {
  ip: string
  country: string
}

function Footer() {
  const [geolocation, setGeolocation] = useState<IGeolocation | null>(null)
  const [coFlag, setCoFlag] = useState<string | null>(null)

  useEffect(() => {
    const fetchIp = async () => {
      try{
        const response = (await axios.get("https://api.country.is/")).data
        setGeolocation(response)

      }catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }
    fetchIp()
  }, [])

  useEffect(() => {
    if(geolocation?.country){
      const foundCountryEmoji = Object.entries(countryJson).find(
        ([code,]) => geolocation?.country === code
      )

      if(foundCountryEmoji){
        const [, detail] = foundCountryEmoji
        setCoFlag(detail.emoji)
      }else{
        setCoFlag("❌")
      }
    }

  }, [geolocation])

  return (
    <footer className='bg-zinc-800'>
      <div className='relative md:p-10'>
        <p className='max-md:text-center font-mono text-red-200 md:absolute md:bottom-3 md:right-2'>
          Your IP Address: {geolocation?.ip ? geolocation.ip : "Loading..."}, 
          Country: {coFlag ? coFlag : "Loading..."}
        </p>
      </div>
    </footer>
  )
}

export default Footer