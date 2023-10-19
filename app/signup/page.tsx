'use client'
import React from 'react';
import Image from 'next/legacy/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAppContext } from '../context/appContext';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    email: string;
    password: string;
    password2: string;
}

const Signup = () => {
    const { handleSubmit, control, reset, setError, formState: { errors } } = useForm<FormData>();
    const { busy, setBusy, setIsAuth } = useAppContext();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = async ({ name, email, password, password2 }: FormData) => {
        // Handle form submission here
        if (name.length < 4 || !name.includes(" ")) {
            setError('name', {
                type: "minLength",
                message: "Please include name and surname"
            })
        }
        else if (!email.includes('@') || !email.includes('.')) {
            setError('email', {
                type: "custom",
                message: "Email should contain '@' and '.' symbols"
            })
        }
        else if (password.length < 8) {
            setError('password', {
                type: "minLength",
                message: "Password should be 8 characters or more"
            })
        }
        else if (password !== password2) {
            setError('password2', {
                type: "custom",
                message: "Passwords do not match",
            }, {
                shouldFocus: true
            })
        } else {
            setBusy(true);
            const res = await fetch("api/auth/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }).then((res) => res.json());

            console.log(res);
            setBusy(false);
            setIsAuth(true);
            router.push("/")

            //reset()
        }
    };

    return (
        <div
            className="bg-gradient-to-r from-purple-300 to-orange-500 min-h-screen md:h-screen flex justify-center items-center"
        >
            <div className="bg-gradient-to-tr from-red-600 to-purple-500 rounded-2xl w-[95%] h-[95%] flex flex-col md:flex-row">
                <div className="absolute top-[2%] md:top-[5%] left-1/2 transform -translate-x-1/2 z-30">
                    <Image
                        src="/pumpkin.png" // Replace with your rounded image source
                        alt="Pumpkin Logo"
                        width={100} // Adjust width as needed
                        height={100} // Adjust height as needed
                        className="rounded-full"
                    />
                </div>
                <div className="w-full md:w-1/2 relative bg-gradient-to-tr from-[#DEAC23] to-[#D42223] rounded-l-2xl">
                    <Image
                        src="/login.png" // Replace with your actual image source
                        alt="Login Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className='rounded-l-2xl'
                        priority
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl text-white font-semibold mb-2 text-center">
                        Welcome to Pumpkin. Where true love meets fortune.
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-1">
                            <label htmlFor="firstName" className="block text-white">
                                Name
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field: { value, onChange } }) => (
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        id="name"
                                        className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        placeholder="Enter your name and surname"
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-[#fff847]">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="my-1">
                            <label htmlFor="email" className="block text-white">
                                Email
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field: { value, onChange } }) => (
                                    <input
                                        type="text"
                                        id="email"
                                        value={value}
                                        onChange={onChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        placeholder="Enter your email"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-[#fff847]">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="my-1">
                            <label htmlFor="password" className="block text-white">
                                Password
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field: { value, onChange } }) => (
                                    <input
                                        type="password"
                                        id="password"
                                        value={value}
                                        onChange={onChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        placeholder="Enter your password"
                                    />
                                )}
                            />
                            {errors.password && (
                                <p className="text-[#fff847]">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="my-1">
                            <label htmlFor="password2" className="block text-white">
                                Confirm Password
                            </label>
                            <Controller
                                name="password2"
                                control={control}
                                defaultValue=""
                                render={({ field: { value, onChange } }) => (
                                    <input
                                        type="password"
                                        id="password2"
                                        value={value}
                                        onChange={onChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                                        placeholder="Confirm your password"
                                    />
                                )}
                            />
                            <p className="text-[#fff847]">{errors.password2?.message}</p>
                        </div>
                        <div className="mb-4">
                            <Link
                                href="/login"
                                className="text-white hover:underline hover:text-indigo-500"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                        <div className="mb-6 w-full text-center">
                            <button
                                type="submit"
                                disabled={busy}
                                style={{ opacity: busy ? 0.5 : 1 }}
                                className="bg-[#FE7418] text-white py-2 px-4 m-auto rounded-lg hover:border-2 hover:border-[#FE7418] hover:bg-white hover:text-[#FE7418]"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="m-auto">
                        <div className="flex space-x-4 relative">
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-indigo-500 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-indigo-500 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-indigo-500 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-indigo-500 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-indigo-500 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
