import { useDateContext } from '@/app/context/dateContext'
import { matches } from '@/app/data'
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
    const [checked, setChecked] = useState<boolean>(false)
    const { userExtended } = useDateContext();
    const [combinations, setCombinations] = useState<Match[]>(matches)

    const toggleFavourite = () => {
        switch (checked) {
            case true:
                const match_exist: boolean = matches.find(({ user, pumpkin }) => (
                    user.user.email === userExtended.user.email && pumpkin.user.email === prospect.user.email
                )) === undefined

                const interest_shown: boolean = matches.find(({ user, pumpkin }) => (
                    user.user.email === pumpkin.user.email && pumpkin.user.email === userExtended.user.email
                )) === undefined

                if (!match_exist && !interest_shown) {
                    setChecked(true)
                    if (interest_shown) {
                        matches
                    } else {
                        matches.push({
                            user: userExtended,
                            when: new Date(),
                            pumpkin: prospect,
                            likes: checked
                        })
                    }
                }

                break;

            default:
                break;
        }
    }

    if (!like)
        return (
            <button type="button">
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