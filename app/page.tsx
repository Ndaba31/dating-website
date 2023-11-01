import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const Home = () => {
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