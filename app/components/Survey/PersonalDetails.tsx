import React from 'react'

interface Props {
    type: string;
    question: string;
    name: string;
    options?: string[];
    count: number;
    total: number;
}

const PersonalDetails = ({ type, question, options, count, total, name }: Props) => {
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="p-5 rounded-xl space-y-5 border-2 w-[300px] capitalize">
            <span>{`${count}/${total}`}</span>
            <h2>{question}</h2>
            <form>
                <div className="text-center">
                    {
                        type === 'text' &&
                        (<>
                            <input
                                type="text"
                                name={name}
                                className='bg-transparent border-2 rounded-lg p-2'
                            />
                            <button type='submit' className='p-2 mt-5 w-[100px] bg-[#ff7518] text-white border-2 rounded-xl hover:bg-transparent hover:text-[#ff7518]'>
                                {count < total ? 'Continue' : 'Finish'}
                            </button>
                        </>)
                    }
                    {
                        type === 'number' &&
                        (<>
                            <input
                                type='number'
                                name={name}
                                className='bg-transparent border-2 rounded-lg p-2'
                                min={0}
                            />
                            <button type='submit' className='p-2 mt-5 w-[100px] bg-[#ff7518] text-white border-2 rounded-xl hover:bg-transparent hover:text-[#ff7518]'>
                                {count < total ? 'Continue' : 'Finish'}
                            </button>
                        </>)
                    }
                    {
                        type === 'date' &&
                        (<>
                            <input
                                type='date'
                                name={name}
                                className='bg-transparent border-2 rounded-lg p-2 w-[200px] text-[#ff7518]'
                                max={today}
                            />
                            <button type='submit' className='p-2 mt-5 w-[100px] bg-[#ff7518] text-white border-2 rounded-xl hover:bg-transparent hover:text-[#ff7518]'>
                                {count < total ? 'Continue' : 'Finish'}
                            </button>
                        </>)
                    }
                    {
                        type === 'notepad' &&
                        (<>
                            <textarea
                                name={name}
                                maxLength={250}
                                rows={8}
                                cols={30}
                                className='bg-transparent border-2 rounded-lg p-2'
                            ></textarea>
                            <button type='submit' className='p-2 mt-5 w-[100px] bg-[#ff7518] text-white border-2 rounded-xl hover:bg-transparent hover:text-[#ff7518]'>
                                {count < total ? 'Continue' : 'Finish'}
                            </button>
                        </>)
                    }
                    {
                        type === 'list' && options?.map((opt, i) => (
                            <button key={i} type='submit' className='p-2 mt-5 w-[200px] border-2 rounded-xl'>{opt}</button>
                        ))
                    }
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails