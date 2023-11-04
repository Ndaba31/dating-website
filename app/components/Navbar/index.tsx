'use client'
import { useDateContext } from '@/app/context/dateContext'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import Sidebar from '../Sidebar'

const Navbar = () => {
    const { sidebar, setSidebar, isAuth, setIsAuth, user } = useDateContext();

    if (user !== undefined)
        setIsAuth(true)

    if (sidebar)
        return <Sidebar />

    return (
        <header className='fixed backdrop-blur-xl z-10  top-0 w-full'>
            <nav className='flex justify-between items-center py-4 px-16'>
                <div className='flex space-x-2 items-center'>
                    <div className="border-2 rounded-full w-6 h-6 bg-transparent border-white flex justify-center items-center">
                        <div className='bg-white w-[70%] h-[70%] rounded-full'></div>
                    </div>
                    <Link href='/' className='text-3xl'>Pumpkin</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => { setSidebar(!sidebar) }} className='md:hidden'>
                        <FontAwesomeIcon icon={faCircleUser} size='xl' />
                    </button>
                    {
                        !isAuth ? (
                            <>
                                <Link href='login' className='hidden md:block px-4 py-2 text-lg hover:opacity-50 bg=transparent rounded-2xl'>Login</Link>
                                <Link href='signup' className='hidden md:block px-4 py-2 text-lg hover:bg-white hover:text-black bg-[#A238FF] rounded-2xl border-2 border-[#A238FF]'>Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link href='discover' className='hidden md:block px-4 py-2 text-lg hover:opacity-50 bg=transparent rounded-2xl'>Discover</Link>
                                <Link href='redroom' className='hidden md:block px-4 py-2 text-lg hover:opacity-50 bg=transparent rounded-2xl'>Redroom</Link>
                                <Link href='matches' className='hidden md:block px-4 py-2 text-lg hover:opacity-50 bg=transparent rounded-2xl'>Matches</Link>
                                <Link href='profile/my-profile' className='hidden md:block px-4 py-2 text-lg hover:opacity-50 bg=transparent rounded-2xl'>Profile</Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar