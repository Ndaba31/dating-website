'use client'
import { useDateContext } from '@/app/context/dateContext';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Sidebar: React.FC = () => {
    const { sidebar, setSidebar } = useDateContext();

    return (
        <div className="fixed top-0 right-0 h-full bg-gray-700 w-1/4 p-4 transition-transform transform translate-x-full z-11">
            <div className='flex justify-around items-center'>
                <button onClick={() => setSidebar(!sidebar)}>
                    <FontAwesomeIcon icon={faCircleXmark} className='text-2xl' />
                </button>
                <h3>Pumpkin</h3>
            </div>
            <ul>
                <li className="mb-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">
                        Login
                    </button>
                </li>
                <li>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full">
                        Signup
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
