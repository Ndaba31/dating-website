'use client'
import { useDateContext } from '@/app/context/dateContext';
import { users } from '@/app/data';
import User, { UserExtended } from '@/app/interfaces/User';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
    img: string;
    altImg: string;
    btnText: string;
    btnType: string;
    heading: string;
    subHeading?: string;
    link?: string;
    reverse: boolean;
}

const Hero = ({ img, altImg, btnText, btnType, heading, subHeading, reverse }: Props) => {
    const [password2, setPassword2] = useState("")
    const [formData, setFormData] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        stem: "",
        password: "",
        dateJoined: new Date(),
        pumpkins: 0,
        hickies: 0
    })
    const [loginFormData, setLoginFormData] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        stem: "",
        password: "",
        dateJoined: new Date(),
        pumpkins: 0,
        hickies: 0
    })

    const { setUser, user, setUserExtended } = useDateContext();
    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const submitInfo = (e: any) => {
        e.preventDefault();
        console.log(formData, password2);
        setUser(formData)
        router.replace("/questionnaire/1")
    }

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const submitLogin = (e: any) => {
        e.preventDefault();
        console.log(loginFormData);
        const person: UserExtended | undefined = users.find(({ user }) => user.email === loginFormData.email)

        if (person !== undefined) {
            setUser(person.user);
            setUserExtended(person);

            router.push('/')
        }
    }

    return (
        <div className={`bg-gradient-to-r from-[#200B33] via-[#19171C] to=[#19276B] min-h-screen flex flex-col-reverse items-center w-full ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className={`w-full bg-opacity-70 p-8 text-center ${btnType === 'submit' || btnType === 'login' ? 'md:1/2' : 'md:w-[40%]'}`}>
                <h1 className="text-4xl text-white font-bold">{heading}</h1>
                <p className="text-lg text-white font-cursive mb-4">{subHeading}</p>
                {
                    btnType === "link" && (
                        <Link href='signup' className="bg-[#A238FF] text-white py-2 px-4 rounded-lg">
                            {btnText}
                        </Link>
                    )
                }
                {
                    btnType === "submit" && (
                        <form onSubmit={submitInfo}>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="firstName" className='text-left'>First Name</label>
                                    <input type="text" id='firstName' name='firstName' className='bg-transparent border-b-2 p-2' value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="lastName" className='text-left'>Last Name</label>
                                    <input type="text" id='lastName' name='lastName' className='bg-transparent border-b-2 p-2' value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='text-left'>Email</label>
                                    <input type="email" id='email' name='email' className='bg-transparent border-b-2 p-2' value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="stem" className='text-left'>Stem</label>
                                    <input type="text" id='stem' name='stem' className='bg-transparent border-b-2 p-2' placeholder='Your username/handle' value={formData.stem} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="password" className='text-left'>Password</label>
                                    <input type="password" id='password' name='password' className='bg-transparent border-b-2 p-2' value={formData.password} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="password2" className='text-left'>Confirm Password</label>
                                    <input type="password" id='password2' name='password2' className='bg-transparent border-b-2 p-2' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                </div>
                            </div>
                            <button type={btnType} className="bg-[#A238FF] text-white py-2 px-4 rounded-lg">
                                {btnText}
                            </button>
                        </form>
                    )
                }
                {
                    btnType === "login" && (
                        <form onSubmit={submitLogin} className='items-center flex flex-col'>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className='bg-transparent border-b-2 w-1/2 p-2 my-4'
                                value={loginFormData.email}
                                onChange={handleLoginChange}
                            />
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='bg-transparent border-b-2 w-1/2 p-2 my-4'
                                value={loginFormData.password}
                                onChange={handleLoginChange}
                            />
                            <button type='submit' className="bg-[#A238FF] text-white py-2 px-4 rounded-lg">
                                {btnText}
                            </button>
                        </form>
                    )
                }
            </div>
            <div className={`w-full ${btnType === 'submit' ? 'md:1/2' : 'md:w-[60%]'}`}>
                <Image src={img} width={500} height={500} quality={100} priority alt={altImg} className="w-full h-full shadow-l-xl image-blurred-edge-inset" />
            </div>
        </div>
    );
};

export default Hero;
