import PersonalDetails from '@/app/components/Survey/PersonalDetails'
import React from 'react'

const ProfileSettings = () => {
    const options = [
        "Sugar Mamas",
        "Chicken murder",
        "Thots",
        "Baddies",
        "goodie two shoes"
    ]
    return (
        <PersonalDetails
            type='date'
            name='dob'
            options={options}
            question='Tell us about yourself using 250 characters at most'
            count={3}
            total={15}
        />
    )
}

export default ProfileSettings