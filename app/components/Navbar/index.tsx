'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="fixed top-0 w-full bg-blue-500 p-4 z-100">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">Pumpkin</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/discover">Discover</a>
                    </li>
                    <li>
                        <a href="/matches">Matches</a>
                    </li>
                    <li>
                        <a href="/profile">Profile</a>
                    </li>
                    <li className="relative">
                        <a onClick={toggleDropdown} className="cursor-pointer">
                            <FontAwesomeIcon icon={faCircleUser} className="text-white text-xl" />
                        </a>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border shadow-lg rounded-lg">
                                <Link href='/login' className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    Login
                                </Link>
                                <Link href='/signup' className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
