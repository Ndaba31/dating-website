'use client'
import React from 'react'
import { useDateContext } from '../context/dateContext'
import Question from '../components/Questions';

const Questionnaire = () => {
    const { user } = useDateContext();
    return (
        <main className='p-2'>
            <p className='text-4xl'>Tell us more about yourself {user.firstName} </p>
            <Question
                count={1}
                total={10}
                question="What do the streets know you as?"
                type='text'
            />
        </main>
    )
}

export default Questionnaire