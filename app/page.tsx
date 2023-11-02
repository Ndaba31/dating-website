'use client'
import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { useDateContext } from './context/dateContext'

const Home = () => {
  const { setIsAuth } = useDateContext();
  setIsAuth(false);

  return (
    <main>
      <Navbar />
      <Hero
        img='/lady.webp'
        altImg='Pumpkin Hero Image'
        btnText='Register Now'
        btnType='link'
        heading='Pumpkin'
        subHeading='Where true love meets fortune'
        reverse={false}
      />
    </main>
  )
}

export default Home