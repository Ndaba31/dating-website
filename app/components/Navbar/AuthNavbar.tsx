import { useAppContext } from '@/app/context/appContext'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'

interface Props {
    showDropdown: boolean,
    toggleDropdown: () => void
}

const AuthNavbar = ({ showDropdown, toggleDropdown }: Props) => {
    const { isAuth, setIsAuth } = useAppContext();
    const { data, status } = useSession();

    setIsAuth(status === "authenticated")

    if (isAuth) {

        return (
            <>
                <li>
                    <a href="/matches">Matches</a>
                </li>
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li className="relative">
                    <a onClick={toggleDropdown} className="cursor-pointer">
                        <FontAwesomeIcon icon={faCircleUser} className=" text-xl" />
                    </a>
                    {showDropdown && (
                        <div className="absolute z-200 right-0 mt-2 py-2 w-48 bg-white border shadow-lg rounded-lg">
                            <h1 className='text-center'>{data?.user?.name?.split(" ")[0]}</h1>
                            <button onClick={() => { signOut(); }} className="block px-4 py-2 w-full text-left text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                                Logout
                            </button>
                        </div>
                    )}
                </li>
            </>
        )
    }

    return (
        <>
            <li className="relative">
                <a onClick={toggleDropdown} className="cursor-pointer">
                    <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
                </a>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border shadow-lg rounded-lg">
                        <Link href='/auth/login' className="block px-4 py-2 text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                            Login
                        </Link>
                        <Link href='/auth/signup' className="block px-4 py-2 text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                            Sign Up
                        </Link>
                    </div>
                )}
            </li>
        </>
    )
}

export default AuthNavbar