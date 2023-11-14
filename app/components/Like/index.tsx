import { useDateContext } from '@/app/context/dateContext'
import Match from '@/app/interfaces/Matches'
import { UserExtended } from '@/app/interfaces/User'
import { faHeart, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Favorite } from '@mui/icons-material'
import React, { useState } from 'react'

// TO DO: -Create a Matches and Users state variable in the context API shindig. 
//        -Finish logic of Likes and matches 

type Props = {
    like: boolean,
    prospect: UserExtended
}

const Like = ({ like, prospect }: Props) => {
    const { userExtended, setAllMatches, allMatches } = useDateContext();
    const [match, setMatch] = useState<Match | undefined>(
        allMatches.find(({ user, pumpkin }) => (
            user.user.email === userExtended.user.email && pumpkin.user.email === prospect.user.email
        ))
    )
    const [checked, setChecked] = useState<boolean>(match?.likes === true)

    const toggleFavourite = () => {

        //Check if the prospect already likes the user
        const interest_shown: boolean = allMatches.find(({ user, pumpkin }) => (
            user.user.email === prospect.user.email && pumpkin.user.email === userExtended.user.email
        )) === undefined

        console.log(interest_shown);

        setChecked(checked ? false : true)

        switch (checked) {
            case true:

                setMatch({
                    user: userExtended,
                    pumpkin: prospect,
                    when: new Date(),
                    likes: false
                })

                setAllMatches((state) => [
                    ...state,
                    match!
                ])

                break;

            case false:

                setAllMatches((state) => (
                    state.filter(({ pumpkin, user }) => (
                        user.user.stem !== match?.user.user.stem && pumpkin.user.stem !== match?.pumpkin.user.stem
                    ))
                ))

                break;
        }
    }

    if (!like)
        return (
            <button type="button" onClick={() => console.log(checked, allMatches)}>
                <FontAwesomeIcon icon={faXmarkCircle} size='2xl' />
            </button>
        )

    return (
        <button type="button" onClick={toggleFavourite} className={`rounded-full flex justify-center items-center border-4 ${checked ? 'border-red-600 text-red-600' : ''} w-[50px] h-[50px]`}>
            {
                checked ? (
                    <Favorite />
                ) : (
                    <FontAwesomeIcon icon={faHeart} />
                )
            }
        </button>
    )
}

export default Like