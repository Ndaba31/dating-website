'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { matches } from '../data'
import { useDateContext } from '../context/dateContext'
import DiscoverCard from '../components/DiscoverCard'
import Link from 'next/link'

const Matches = () => {
    const { user, allMatches } = useDateContext();
    const hits = allMatches.filter((match) => match.pumpkin.user.email === user.email) || undefined
    //console.log(hits);

    if (hits === undefined) {
        return (
            <main className='flex flex-col justify-center items-center w-full h-screen space-y-8 p-2'>
                <h1 className='text-4xl'>No matches found</h1>
                <h4 className='text-center text-2xl'>Navigate to the discover page to make some connections</h4>
                <Link href='/discover' className='text-lg hover:opacity-70'>Discover page</Link>
            </main>
        )
    }

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