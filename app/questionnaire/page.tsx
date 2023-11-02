'use client'
import React, { useState } from 'react'
import { useDateContext } from '../context/dateContext'
import Question from '../components/Questions';

const Questionnaire = () => {
    const { user } = useDateContext();
    const [formData, setFormData] = useState({})
    return (
        <main className='p-2'>
            <p className='text-4xl'>Tell us more about yourself {user.firstName} </p>
            {/* <Question
                count={1}
                total={10}
                question="What do the streets know you as?"
                type='text'
                inpName='nickName'
                btnFunction={() => setFormData}
            /> */}
        </main>
    )
}

export default Questionnaire