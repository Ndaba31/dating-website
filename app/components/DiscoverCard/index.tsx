import { UserExtended } from '@/app/interfaces/User'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Like from '../Like'

interface Props {
    user: UserExtended
}

const DiscoverCard = ({ user }: Props) => {

    return (
        <div className="flex justify-center w-full py-16 px-4">
            <div className='flex flex-col md:flex-row w-[90%] h-500 rounded-2xl overflow-hidden'>
                <div className='w-full md:w-[60%] p-0 rounded-2xl'>
                    <Image
                        width={500}
                        height={500}
                        alt={user.profile_photo === undefined || user.profile_photo.alt === undefined ? '' : user.profile_photo.alt}
                        src={user.profile_photo === undefined ? '' : '/' + user.profile_photo.media}
                        className='h-full w-full'
                    />
                </div>
                <div className='w-full md:w-[40%] text-center p-10 bg-gradient-to-br from-[#0559E0] to-[#BAA9BF]'>
                    <h1 className='text-4xl'>{user.user.stem}</h1>
                    <div className='my-8'>
                        <h1 className='text-2xl'>{user.user.firstName} {user.user.lastName}</h1>
                        {user.occupation !== undefined && (<p className=''>Works in {user.occupation[0].company} as a {user.occupation[0].title}</p>)}
                        {user.bio !== undefined && (<p className=''>{user.bio}</p>)}
                    </div>
                    <div className='text-xl flex flex-col items-center justify-end space-y-8'>
                        <div className="flex space-x-10">
                            <p>{user.user.pumpkins} Pumpkins</p>
                            <p>{user.user.hickies} Hickies</p>
                        </div>
                        <div className="flex space-x-10 items-center">
                            <p>See more of me</p>
                            <Link href={`profile/${user.user.stem}`}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-4xl' />
                            </Link>
                        </div>
                        <div className={`flex space-x-8 items-center justify-around text-2xl`}>
                            <Like like={false} prospect={user} />
                            <Like like={true} prospect={user} />
                        </div>
                        {/* <div className='flex space-x-8 items-center'>
                            {
                                user.socials
                                    ?.map(({ icon, social, link }) => (
                                        <Link href={link} key={social}>
                                            <FontAwesomeIcon icon={icon} />
                                        </Link>
                                    ))
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverCard