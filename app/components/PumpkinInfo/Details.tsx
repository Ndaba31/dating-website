'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

const Details = () => {
    const { data } = useSession();

    return (
        <div>
            <h1 className='text-3xl p-4'>My Profile</h1>
            <form className='flex'>
                <div className="flex">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder={data?.user !== undefined && data?.user.name !== undefined ? data!.user!.name! : ""} />
                </div>
            </form>
        </div>
    )
}

export default Details