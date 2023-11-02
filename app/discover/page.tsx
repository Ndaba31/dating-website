'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useDateContext } from '../context/dateContext'
import { users } from '../data'
import DiscoverCard from '../components/DiscoverCard'

const Discover = () => {
    const { userExtended } = useDateContext();

    return (
        <main>
            <Navbar />
            <Hero
                img={userExtended.profile_photo === undefined ? '/lady.webp' : `/${userExtended.profile_photo.media}`}
                altImg={userExtended.profile_photo === undefined ? '/lady.webp' : `/${userExtended.profile_photo.alt}`}
                btnText='View my profile'
                link={`profile/${userExtended.user.stem}`}
                btnType='link'
                heading={userExtended.user.stem}
                subHeading={userExtended.bio}
                reverse
            />
            {
                users
                    .filter(({ user }) => user.stem !== userExtended.user.stem)
                    .map((user) => (
                        <DiscoverCard
                            key={user.user.stem}
                            user={user}
                        />
                    ))
            }
        </main>
    )
}

export default Discover