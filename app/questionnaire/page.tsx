'use client'
import React from 'react'
import { useDateContext } from '../context/dateContext'

const Questionnaire = () => {
    const { user } = useDateContext();
    return (
        <div>
            <h1>Hi {user.firstName + " " + user.lastName}</h1>
            <p>Your email is {user.email}</p>
            <p>Your stem is {user.stem}</p>
            <p>Your Password is {user.password}</p>
        </div>
    )
}

export default Questionnaire