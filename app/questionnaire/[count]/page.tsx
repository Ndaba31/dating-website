'use client'
import Question, { QuestionProps } from '@/app/components/Questions';
import { useDateContext } from '@/app/context/dateContext';
import { questions } from '@/app/data';
import { UserExtended } from '@/app/interfaces/User';
import React, { useState } from 'react'

const Ask = ({ params }: { params: { count: number } }) => {
  const count = Number(params.count);
  const { user } = useDateContext();
  const [formData, setFormData] = useState<UserExtended>({
    user: user,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <main className='flex min-h-screen items-center'>
      {
        questions
          .filter(({ id }) => id === count)
          .map(({ id, question, type, inpName }) => (
            <Question
              key={id}
              count={count}
              total={questions.length}
              question={question}
              type={type}
              inpName={inpName}
              btnFunction={() => { }}
              handleChange={handleChange}
              formData={formData}
            />
          ))
      }
    </main>
  )
}

export default Ask