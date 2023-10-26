import { useAppContext } from '@/app/context/appContext'
import { faCaretDown, faCaretUp, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

interface Props {
    showDropdown: boolean,
    sidebar: boolean,
    toggleDropdown: () => void,
    toggleSidebar: () => void
}

const AuthNavbar = ({ showDropdown, sidebar, toggleDropdown, toggleSidebar }: Props) => {
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
                        {
                            sidebar ? (
                                <div className={`flex justify-center space-x-2 ${showDropdown ? 'bg-[#ff7518] text-white' : ''}`}>
                                    <p>Account</p>
                                    {
                                        showDropdown ? (
                                            <FontAwesomeIcon icon={faCaretUp} className="text-xl" />
                                        ) : (
                                            <FontAwesomeIcon icon={faCaretDown} className="text-xl" />
                                        )
                                    }
                                </div>
                            ) : (
                                <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
                            )
                        }
                    </a>
                    {!sidebar && showDropdown && (
                        <div className="absolute z-200 right-0 mt-2 py-2 w-48 bg-white border shadow-lg rounded-lg">
                            <h1 className='text-center'>{data?.user?.name?.split(" ")[0]}</h1>
                            <button onClick={() => { signOut(); }} className="block px-4 py-2 w-full text-left text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                                Logout
                            </button>
                        </div>
                    )}
                    {sidebar && showDropdown && (
                        <ul className='mt-2'>
                            <li>
                                <button onClick={() => signOut()}>Logout</button>
                            </li>
                        </ul>
                    )}
                </li>
            </>
        )
    }

    return (
        <>
            <li className="relative">
                <a onClick={toggleDropdown} className="cursor-pointer">
                    {
                        sidebar ? (
                            <div className={`flex justify-center space-x-2 ${showDropdown ? 'bg-[#ff7518] text-white' : ''}`}>
                                <p>Account</p>
                                {
                                    showDropdown ? (
                                        <FontAwesomeIcon icon={faCaretUp} className="text-xl" />
                                    ) : (
                                        <FontAwesomeIcon icon={faCaretDown} className="text-xl" />
                                    )
                                }
                            </div>
                        ) : (
                            <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
                        )
                    }
                </a>
                {!sidebar && showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border shadow-lg rounded-lg">
                        <Link href='/auth/login' className="block px-4 py-2 text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                            Login
                        </Link>
                        <Link href='/auth/signup' className="block px-4 py-2 text-black hover:text-[#ff7518] hover:bg-[#e0e0db]">
                            Sign Up
                        </Link>
                    </div>
                )}
                {sidebar && showDropdown && (
                    <ul className='mt-2 space-y-2'>
                        <li>
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/auth/signup">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </li>
        </>
    )
}

export default AuthNavbar