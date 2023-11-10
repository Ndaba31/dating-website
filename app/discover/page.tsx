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
            <Navbar page='discover' />
            <Hero
                img={userExtended.profile_photo === undefined ? '/lady.webp' : `/${userExtended.profile_photo.media}`}
                altImg={userExtended.profile_photo === undefined ? '/lady.webp' : `/${userExtended.profile_photo.alt}`}
                btnText='View my profile'
                link={`profile/my-profile`}
                btnType='link'
                heading={userExtended.user.stem}
                subHeading={userExtended.bio}
                reverse
            />
            <div>
                <h1 className='text-center capitalize my-8'>Discover more dates</h1>
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
            </div>
        </main>
    )
}

export default Discover