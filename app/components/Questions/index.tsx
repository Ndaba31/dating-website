'use client'
import { useDateContext } from '@/app/context/dateContext';
import { questions } from '@/app/data';
import { UserExtended } from '@/app/interfaces/User';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export interface QuestionProps {
    count: number;
    total: number;
    question: string | string[];
    options?: string[];
    type: string;
    inpName: string;
    btnFunction: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: UserExtended;
}

const Question = ({ count, total, question, options, type, inpName, btnFunction, handleChange, formData }: QuestionProps) => {
    const { user, userExtended, setUserExtended } = useDateContext();
    const router = useRouter();
    let nickName: string | undefined
    let city: string | undefined

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (count === 1)
            nickName = formData.nickName;

        if (count === 2)
            city = formData.city;

        setUserExtended({
            user: user,
            nickName: nickName,
            city: city
        })

        console.log(`userExtended: `, userExtended, `\nformData: `, formData);

        if (count < total)
            router.push(`${count + 1}`)
        // else
        //     router.push('/')
    }

    return (
        <div className='p-8 border-2 border-white w-1/2 min-h-400 m-auto rounded-2xl'>
            <div className={`flex items-center px-10 ${count === 1 ? 'justify-end' : 'justify-between'}`}>
                {
                    count !== 1 && (
                        <button type='button' onClick={() => { count - 1; router.back(); }}>
                            <FontAwesomeIcon icon={faCircleLeft} className='text-2xl' />
                        </button>
                    )
                }
                {
                    count < total ? (
                        <Link href={`${count + 1}`} className='hover:opacity-70'>Skip</Link>
                    ) : (
                        <Link href='/' className='hover:opacity-70'>Skip</Link>
                    )
                }
            </div>
            <h6 className='mt-5'>{question}</h6>
            {
                type === 'text' && (
                    <form onSubmit={handleSubmit} className='text-center'>
                        <input
                            type={type}
                            id={inpName}
                            name={inpName}
                            className='bg-transparent border-b-2 p-2 w-full my-4'
                            value={inpName === 'nickName' ? formData.nickName : formData.city}
                            onChange={handleChange}
                        />
                        <button type='submit' className='my-4 bg-[#A238FF] text-white py-2 px-4 rounded-lg mx-auto'>{count === total ? "Finish" : "Continue"}</button>
                    </form>
                )
            }
        </div>
    )
}

export default Question