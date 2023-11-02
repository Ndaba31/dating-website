import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Login = () => {
    return (
        <main>
            <Navbar />
            <Hero
                img='/pumpkin.png'
                altImg='Pumpkin Logo'
                reverse
                heading='Pumpkin'
                subHeading='Hello, I come back! Login satan!'
                btnText='Login'
                btnType='login'
            />
        </main>
    )
}

export default Login