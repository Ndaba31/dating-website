'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { matches } from '../data'
import { useDateContext } from '../context/dateContext'
import DiscoverCard from '../components/DiscoverCard'

const Matches = () => {
    const { user } = useDateContext();
    const hits = matches.filter((match) => match.pumpkin.user.email === user.email)
    console.log(hits);


    return (
        <main>
            <Navbar page='matches' />
            <div className="">
                {
                    hits.map((hit, i) => (
                        <DiscoverCard key={i} user={hit.user} />
                    ))
                }
            </div>
        </main>
    )
}

export default Matches