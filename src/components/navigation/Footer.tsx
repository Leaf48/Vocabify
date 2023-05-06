import React, { useEffect, useState } from 'react'
import axios from "axios"

function Footer() {
  const [ip, setIp] = useState<string | null>(null)


  useEffect(() => {
    const fetchIp = async () => {
      try{
        const response = await axios.get("https://api.ipify.org/?format=plane")
        setIp(response.data)
      }catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }

    fetchIp()
  }, [])

  return (
    <footer className='bg-zinc-800'>
      <div className='relative md:p-10'>
        <p className='max-md:text-center font-mono text-red-200 md:absolute md:bottom-3 md:right-2'>Your IP Address: {ip ? ip : "Loading..."}</p>
      </div>
    </footer>
  )
}

export default Footer