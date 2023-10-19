'use client'
import React, { useState } from 'react';
import AuthNavbar from './AuthNavbar';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={`sticky top-0 ${showDropdown ? "" : "overflow-hidden"} w-full bg-black p-4 z-100`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className=" text-2xl font-bold">Pumpkin</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/discover">Discover</a>
                    </li>
                    <li>
                        <a href="/redpumpkin">Red Pumpkin</a>
                    </li>
                    <AuthNavbar showDropdown={showDropdown} toggleDropdown={toggleDropdown} />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
