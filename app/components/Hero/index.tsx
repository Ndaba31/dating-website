'use client'
import { useDateContext } from '@/app/context/dateContext';
import { users } from '@/app/data';
import User, { UserDB, UserExtended } from '@/app/interfaces/User';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios'
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

const Hero = ({ img, altImg, btnText, btnType, heading, subHeading, reverse, link }: Props) => {
    const [password2, setPassword2] = useState("")
    const [formData, setFormData] = useState<UserDB>({
        firstName: "",
        lastName: "",
        email: "",
        stem: "",
        password: "",
        dateJoined: new Date(),
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

    const { setUser, setIsAuth, setUserExtended, error, setError, isBusy, setIsBusy } = useDateContext();
    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const submitInfo = async (e: any) => {
        e.preventDefault();
        setError('')
        const { firstName, lastName, email, stem, password } = formData
        let stem_edited = stem.trim().replace(' ', '_')

        //Password Error handling
        setError(
            password.length < 8 ?
                'password must be longer than 8 characters' :
                (
                    password !== password2 ?
                        'passwords do not match' :
                        ''
                )
        )

        if (error !== '') {

            return;
        } else {

            console.log({
                stem: stem_edited,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            const postData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stem: stem_edited,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }),
            }

            setIsBusy(true)

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
                    stem: stem_edited,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }).then((result) => {
                    if (result.status === 200) {
                        console.log('Form submitted successfully');
                    }
                }).catch((err) => {
                    console.log(err);
                })

                // if (res.) {
                //     // Handle successful form submission
                //     console.log('Form submitted successfully');
                // } else {
                //     // Handle error
                //     console.error('Form submission failed');
                // }
            } catch (error) {
                console.error('An error occurred during form submission', error);
            }
            setIsBusy(false)
            // // setUser(formData)
            // setIsAuth(true)
            // // router.replace("/questionnaire/1")
        }
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
            setIsAuth(true);
            router.push('/discover')
        }
    }

    return (
        <div className={`bg-gradient-to-r from-[#200B33] via-[#19171C] to=[#19276B] min-h-screen flex flex-col-reverse items-center w-full ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <div className={`w-full bg-opacity-70 p-8 text-center ${btnType === 'submit' || btnType === 'login' ? 'md:1/2' : 'md:w-[40%]'}`}>
                <h1 className="text-4xl text-white font-bold">{heading}</h1>
                <p className="text-lg text-white font-cursive mb-4">{subHeading}</p>
                {
                    btnType === "link" && (
                        <Link href={link === undefined ? 'signup' : link} className="bg-[#A238FF] text-white py-2 px-4 rounded-lg">
                            {btnText}
                        </Link>
                    )
                }
                {
                    btnType === "submit" && (
                        <form onSubmit={submitInfo} method='post'>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="firstName" className='text-left'>First Name</label>
                                    <input type="text" id='firstName' required name='firstName' className='bg-transparent border-b-2 p-2' value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="lastName" className='text-left'>Last Name</label>
                                    <input type="text" id='lastName' required name='lastName' className='bg-transparent border-b-2 p-2' value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='text-left'>Email</label>
                                    <input type="email" id='email' name='email' required className='bg-transparent border-b-2 p-2' value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="stem" className='text-left'>Stem</label>
                                    <input type="text" id='stem' name='stem' required className='bg-transparent border-b-2 p-2' placeholder='Your username/handle' value={formData.stem} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full flex-col md:flex-row my-6 space-x-2">
                                <div className='flex flex-col'>
                                    <label htmlFor="password" className='text-left'>Password</label>
                                    <input type="password" id='password' required name='password' className='bg-transparent border-b-2 p-2' value={formData.password} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col mt-4 md:mt-0'>
                                    <label htmlFor="password2" className='text-left'>Confirm Password</label>
                                    <input type="password" id='password2' required name='password2' className='bg-transparent border-b-2 p-2' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                </div>
                            </div>
                            {
                                error !== '' && (
                                    <p className='text-md rounded-md bg-red-700 capitalize my-4'>{error}</p>
                                )
                            }
                            <button type={btnType} disabled={isBusy} className={`bg-[#A238FF] text-white py-2 px-4 rounded-lg ${isBusy ? 'opacity-70' : ''}`}>
                                {btnText}
                            </button>
                        </form>
                    )
                }
                {
                    btnType === "login" && (
                        <form onSubmit={submitLogin} className='items-center flex flex-col' method='post'>
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
