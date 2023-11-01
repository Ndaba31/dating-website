'use client'
import { useDateContext } from '@/app/context/dateContext';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    count: number;
    total: number;
    question: string | string[];
    options?: string[];
    type: string;
}

const Question = ({ count, total, question, options, type }: Props) => {
    const { user } = useDateContext();
    const router = useRouter();

    return (
        <div className='p-2 border-2 border-white'>
            <div className='flex justify-around items-center'>
                {
                    count !== 1 && (
                        <button onClick={() => { count--; router.back(); }}>
                            <FontAwesomeIcon icon={faCircleLeft} className='text-2xl' />
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Question