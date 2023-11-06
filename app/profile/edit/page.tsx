'use client'
import { useDateContext } from '@/app/context/dateContext'
import { ethinicities, regions, sex } from '@/app/data'
import Occupation from '@/app/interfaces/Occupation'
import { AddCircle, Cancel, DeleteForever } from '@mui/icons-material'
import Image from 'next/image'
import React, { useState } from 'react'

const EditProfile = () => {
    const { userExtended, setUserExtended } = useDateContext();
    const [hob, setHob] = useState("")
    const [occ, setOcc] = useState<any>()
    const separator = '/'
    const birthday = `${userExtended.dob?.getFullYear()}${separator}${userExtended.dob!.getMonth() + 1 < 10 ? `0${userExtended.dob!.getMonth() + 1}` : `${userExtended.dob!.getMonth() + 1}`}${separator}${userExtended.dob!.getDate() < 10 ? `0${userExtended.dob!.getDate()}` : `${userExtended.dob!.getDate()}`}`;

    const onHobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHob(e.target.value)
    }

    const onOccChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOcc((prevState: Occupation) => ({
            ...prevState,
            [name]: value
        }))
    }

    const popHobbies = (hobby: string) => {
        const hobbies: string[] = userExtended.hobbies!.filter((interest) => interest !== hobby);
        setUserExtended((prevState) => ({
            ...prevState,
            hobbies: hobbies
        }))
    }

    const pushHobbies = (hobby: string) => {
        const hobbies: string[] = userExtended.hobbies!;
        hobbies.push(hobby)

        setUserExtended((prevState) => ({
            ...prevState,
            hobbies: hobbies
        }))
    }

    const pushOccupation = () => {
        const occupation = userExtended.occupation
        occupation?.push(occ)
        setUserExtended((prevState) => ({
            ...prevState,
            occupation: occupation
        }))
    }

    const popOccupation = (job: Occupation) => {
        const occupations: Occupation[] = userExtended.occupation!.filter((work) => work.company !== job.company && work.title !== job.title);
        setUserExtended((prevState) => ({
            ...prevState,
            occupation: occupations
        }))
    }

    return (
        <main className='p-2'>
            <h4 className='my-2'>Edit Profile</h4>
            <hr />
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-2 flex flex-col items-center">
                    <h6 className='font-bold my-2'>Profile</h6>
                    <div className="w-150 h-150 rounded-xl border-2">
                        <Image width={150} height={150} className='rounded-xl' src={'/' + userExtended.profile_photo?.media || ''} alt={userExtended.profile_photo?.alt || ''} />
                    </div>
                    <div className='text-center my-4 text-lg'>
                        <p className='font-bold'>{userExtended.user.firstName} {userExtended.user.lastName}</p>
                        <p className='font-semi-bold'>{userExtended.nickName}</p>
                        <p className='text-purple-200'>@{userExtended.user.stem}</p>
                    </div>
                    <div className='flex flex-col'>
                        <button className="bg-[#A238FF] text-white py-2 px-8 rounded-lg my-1">
                            Upload Photo
                        </button>
                        <button className="bg-red-700 text-white py-2 px-8 rounded-lg my-1">
                            Delete Photo
                        </button>
                    </div>
                    {
                        userExtended.bio !== 'undefined' && (
                            <div className='my-4 flex flex-col items-center p-2'>
                                <p className="text-lg font-bold uppercase mb-2">biography</p>
                                <p className='text-center'>{userExtended.bio}</p>
                            </div>
                        )
                    }
                </div>
                <div className="w-full md:w-2/3 p-2">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold m-auto md:m-0 md:text-left">Basic Info</h1>
                        <div className="hidden md:flex space-x-4">
                            <button className="border-[#A238FF] border-2 text-white py-2 px-8 rounded-lg my-1">
                                Cancel
                            </button>
                            <button className="bg-[#A238FF] text-white py-2 px-8 rounded-lg my-1">
                                Save
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4">
                        <div className='flex flex-col'>
                            <label htmlFor="firstName" className='text-left'>First Name</label>
                            <input type="text" id='firstName' name='firstName' placeholder={userExtended.user.firstName} className='bg-transparent border-b-2 p-2' /*value={formData.firstName} onChange={handleChange}*/ />
                        </div>
                        <div className='flex flex-col mt-4 md:mt-0'>
                            <label htmlFor="lastName" className='text-left'>Last Name</label>
                            <input type="text" id='lastName' name='lastName' placeholder={userExtended.user.lastName} className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4">
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-left'>Email</label>
                            <input type="email" id='email' name='email' placeholder={userExtended.user.email} className='bg-transparent border-b-2 p-2' /*value={formData.firstName} onChange={handleChange}*/ />
                        </div>
                        <div className='flex flex-col mt-4 md:mt-0'>
                            <label htmlFor="stem" className='text-left'>Stem</label>
                            <input type="text" id='stem' name='stem' placeholder={userExtended.user.stem} className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold mb-4">About</h1>
                        <textarea className='bg-transparent border-2 w-full p-2 rounded-lg' name="bio" id="bio" rows={10}>{userExtended.bio}</textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4">
                        <div className='flex flex-col mt-4 md:mt-0'>
                            <label htmlFor="dob" className='text-left'>Date of birth: {birthday}</label>
                            <input type="text" id='dob' name='dob' className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="sex" className='text-left'>Sex</label>
                            <select name="sex" id="sex" className='bg-transparent border-b-2 p-2'>
                                <option value="" className='bg-transparent'>Please choose one</option>
                                {
                                    sex.map((gender, i) => (
                                        <option className='bg-transparent text-black' key={i} value={gender}>{gender}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold mb-4">Location</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4">
                            <div className='flex flex-col mt-4 md:mt-0'>
                                <label htmlFor="city" className='text-left'>Closest City</label>
                                <input type="text" id='city' name='city' placeholder={userExtended.city} className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="region" className='text-left'>Region</label>
                                <select name="region" id="region" className='bg-transparent border-b-2 p-2'>
                                    <option value="" className='bg-transparent'>Please choose one</option>
                                    {
                                        regions.map((region, i) => (
                                            <option className='bg-transparent text-black' key={i} value={region}>{region}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold mb-4">Hobbies</h1>
                        <div className="flex space-x-4 items-center justify-center">
                            <input type="text" id='city' name='city' placeholder='Add a hobby' className='bg-transparent border-b-2 p-2' onChange={onHobChange}  /*value={formData.lastName}*/ />
                            <button onClick={() => pushHobbies(hob)}>
                                <AddCircle />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 my-4">
                            {
                                userExtended.hobbies!.map((hobby, i) => (
                                    <button key={i} onClick={() => popHobbies(hobby)} className="border-2 p-2 flex space-x-4 justify-center hover:border-red-400 hover:text-red-400 rounded-md capitalize">
                                        <p>{hobby}</p>
                                        <DeleteForever />
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold mb-4">More Info</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 my-4">
                            <div className='flex flex-col mt-4 md:mt-0'>
                                <label htmlFor="nickName" className='text-left'>Nick Name</label>
                                <input type="text" id='nickName' name='nickName' className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                            </div>
                            <div className='flex flex-col mt-4 md:mt-0'>
                                <label htmlFor="phone" className='text-left'>Phone Number</label>
                                <input type="number" id='phone' min={0} name='phone' className='bg-transparent border-b-2 p-2' /*value={formData.lastName} onChange={handleChange}*/ />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="ethnicity" className='text-left'>Ethnicity</label>
                                <select name="ethnicity" id="ethnicity" className='bg-transparent border-b-2 p-2'>
                                    <option value="" className='bg-transparent'>Please choose one</option>
                                    {
                                        ethinicities.map((ethnicity, i) => (
                                            <option className='bg-transparent text-black' key={i} value={ethnicity}>{ethnicity}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold mb-4">Occupation(s)</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <input type="text" id='company' name='company' placeholder='What company?' className='bg-transparent border-b-2 p-2' onChange={onOccChange} />
                            <input type="text" id='title' name='title' placeholder='What position?' className='bg-transparent border-b-2 p-2' onChange={onOccChange} />
                            <input type="text" id='salary1' name='salary1' placeholder='Min income' className='bg-transparent border-b-2 p-2' onChange={onOccChange} />
                            <input type="text" id='salary2' name='salary2' placeholder='Max income' className='bg-transparent border-b-2 p-2' onChange={onOccChange} />
                            <button onClick={pushOccupation} className="bg-purple-600 border-2 p-2 flex space-x-4 justify-center hover:border-green-500 hover:bg-transparent hover:text-green-500 rounded-md capitalize">
                                <p>Add</p>
                                <AddCircle />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-4 my-4">
                            {
                                userExtended.occupation!.map(({ company, title, salary_min, salary_max }, i) => (
                                    <button key={i} className='grid grid-cols-3 gap-2 border-2 p-2 rounded-md capitalize hover:border-red-400 hover:text-red-400'>
                                        <p>{title}</p>
                                        <p>At {company}</p>
                                        {
                                            salary_max === undefined || salary_min === undefined && (<p>Earning between {salary_min} and {salary_max}</p>)
                                        }
                                        <button key={i} onClick={() => popOccupation({ company, title, salary_min, salary_max })} className='text-right'>
                                            <Cancel />
                                        </button>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditProfile