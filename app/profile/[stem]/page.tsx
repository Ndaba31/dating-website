'use client'
import Navbar from '@/app/components/Navbar'
import Posts from '@/app/components/Posts'
import { useDateContext } from '@/app/context/dateContext'
import { users } from '@/app/data'
import { UserExtended } from '@/app/interfaces/User'
import Image from 'next/legacy/image'
import React, { useState } from 'react'

const ProfileDetail = ({ params }: { params: { stem: string } }) => {
    const { userExtended } = useDateContext();
    const [showAll, setShowAll] = useState(false);
    const user = params.stem === 'my-profile' ?
        users.find(({ user }) => user.stem === userExtended.user.stem) :
        users.find(({ user }) => user.stem === params.stem)

    const age = new Date().getFullYear() - userExtended.dob!.getFullYear();
    const maxChar = 150

    const toggleReadMore = () => {
        setShowAll(!showAll)
    }

    return (
        <div>
            <Navbar />
            <div className='mt-16 flex flex-col md:flex-row'>
                <div className='md:w-1/2'>
                    <Image
                        src={`/${user?.profile_photo?.media}`}
                        alt={user !== undefined && user.profile_photo !== undefined && user.profile_photo.alt !== undefined ? user.profile_photo.alt : ''}
                        height={500}
                        width={700}
                        quality={100}
                        className='md:rounded-br-2xl'
                    />
                </div>
                <article className='md:w-1/2 p-8'>
                    <section>
                        <h1 className="text-xl font-bold">{user?.user.firstName + ' ' + user?.user.lastName + ', ' + age}</h1>
                        <p className='text-m'>AKA {user?.nickName}</p>
                        {
                            user?.occupation?.map(({ title }, i) => (
                                <p key={i} className='text-m'>{title}</p>
                            ))
                        }
                    </section>
                    {
                        user !== undefined && (user.city !== undefined || user.region !== undefined) && (
                            <section className='my-4'>
                                <h1 className="text-lg font-bold">Location</h1>
                                {<p className='text-m'>{user?.city + (user.region !== undefined ? (', ' + user.region + ' region') : '')}</p>}
                            </section>
                        )}
                    {
                        user !== undefined && user.bio !== undefined && (
                            <section className='my-4'>
                                <h1 className="text-lg font-bold">About</h1>
                                <p className="text-m">{showAll ? user.bio : user.bio.slice(0, maxChar)}</p>
                                {user.bio.length > maxChar && (
                                    <button onClick={toggleReadMore} className='text-blue-500'>
                                        {showAll ? 'Read Less' : 'Read More'}
                                    </button>
                                )}
                            </section>
                        )
                    }
                    {
                        user !== undefined && user.hobbies !== undefined && (
                            <section className='my-4'>
                                <h1 className="text-lg font-bold">Hobbies</h1>
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        user.hobbies.map((hobby, i) => (
                                            <button key={i} className="border-2 p-2 rounded-md cursor-not-allowed" disabled>
                                                {hobby}
                                            </button>
                                        ))
                                    }
                                </div>
                            </section>
                        )
                    }
                </article>
            </div>
            <div className='p-4'>
                {
                    user !== undefined && user.posts !== undefined && (
                        <>
                            <h1 className="font-bold text-center mb-8">Gallery</h1>
                            <Posts posts={user.posts} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileDetail