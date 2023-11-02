import { users } from '@/app/data'
import React from 'react'

const ProfileDetail = ({ params }: { params: { stem: string } }) => {
    const user = users.find(({ user }) => user.stem === params.stem)

    return (
        <div>{user?.user.firstName} {user?.user.lastName}</div>
    )
}

export default ProfileDetail