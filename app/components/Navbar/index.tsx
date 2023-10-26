'use client'
import React, { useState } from 'react';
import AuthNavbar from './AuthNavbar';
import { useAppContext } from '@/app/context/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { sidebar, setSidebar, isAuth } = useAppContext();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const { data } = useSession();

    return (
        <>
            <nav className={`sticky top-0 ${showDropdown ? "" : "overflow-hidden"} w-full bg-black p-4 z-100`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className=" text-2xl font-bold">Pumpkin</div>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <FontAwesomeIcon icon={faBars} className="text-xl" />
                    </button>
                    <ul className="hidden md:flex md:space-x-4">
                        <li>
                            <a href="/discover">Discover</a>
                        </li>
                        <li>
                            <a href="/redpumpkin">Red Pumpkin</a>
                        </li>
                        <AuthNavbar showDropdown={showDropdown} toggleDropdown={toggleDropdown} sidebar={sidebar} toggleSidebar={toggleSidebar} />
                    </ul>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[75%] bg-black p-4 transition-transform transform md:translate-x-0 ${sidebar ? '' : 'translate-x-full'} md:hidden`}>
                <ul className="flex flex-col space-y-4 text-center">
                    <li className='flex items-center p-2'>
                        <button onClick={toggleSidebar} className='mr-5'>
                            <FontAwesomeIcon icon={faCircleXmark} className="text-3xl" />
                        </button>
                        <h1 className='text-xl font-bold mb-2 capitalize'>{isAuth ? data?.user?.name?.split(" ")[0] : "Pumpkin"}</h1>
                    </li>
                    <hr />
                    <li>
                        <Link href="/discover">Discover</Link>
                    </li>
                    <li>
                        <Link href="/redpumpkin">Red Pumpkin</Link>
                    </li>
                    <AuthNavbar sidebar={sidebar} showDropdown={showDropdown} toggleDropdown={toggleDropdown} toggleSidebar={toggleSidebar} />
                </ul>
            </div>
        </>
    );
};

export default Navbar;
