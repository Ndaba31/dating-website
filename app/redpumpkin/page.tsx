import React from 'react'
import { peopleData } from '../page'
import PumpkinInfo from '../components/PumpkinInfo'
import Footer from '../components/Footer'
import { Metadata } from 'next'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
    title: 'Redroom',
}

const RedPumpkin = () => {
    return (
        <main>
            <Navbar />
            {
                peopleData.map(({ name, bio, imgSrc, hickies, pumpkins, instagram, profile }, index) => (
                    <PumpkinInfo
                        key={index}
                        page='matches'
                        name={name}
                        bio={bio}
                        imgSrc={imgSrc}
                        hickies={hickies}
                        pumpkins={pumpkins}
                        instagram={instagram}
                        profile={profile}
                    />
                ))
            }
            <Footer />
        </main>
    )
}

export default RedPumpkin