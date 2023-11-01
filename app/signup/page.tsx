import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const SignUp = () => {
    return (
        <main>
            <Navbar />
            <Hero
                img='/pumpkin.png'
                altImg='Pumpkin Logo'
                reverse
                heading='Pumpkin'
                subHeading='Sign up to meet your "Forever Yena!"'
                btnText='Confirm'
                btnType='submit'
            />
        </main>
    )
}

export default SignUp