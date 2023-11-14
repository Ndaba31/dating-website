'use client';
// First, create a context
import { createContext, useContext, useState, ReactNode } from 'react';
import User, { UserExtended } from '../interfaces/User';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Match from '../interfaces/Matches';
import { matches, users } from '../data';

interface DateContextProps {
	sidebar: boolean;
	setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	userExtended: UserExtended;
	setUserExtended: React.Dispatch<React.SetStateAction<UserExtended>>;
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	allUsers: UserExtended[];
	setAllUsers: React.Dispatch<React.SetStateAction<UserExtended[]>>;
	allMatches: Match[]
	setAllMatches: React.Dispatch<React.SetStateAction<Match[]>>;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

// Create a custom provider component that wraps your date
interface DateContextProviderProps {
	children: ReactNode;
}

export function DateContextProvider({ children }: DateContextProviderProps) {
	const [sidebar, setSidebar] = useState(false);
	const [user, setUser] = useState<User>({
		firstName: "Nosiphephelo",
		lastName: "Ndabandaba",
		email: "my@mail.com",
		password: "12345",
		stem: "holy_baddie",
		dateJoined: new Date(),
		hickies: 16,
		pumpkins: 5978
	});
	const [userExtended, setUserExtended] = useState<UserExtended>({
		user: user,
		nickName: "boo thang",
		profile_photo: { media: "lesedi.jpeg", alt: `profile photo of ${user.stem}` },
		dob: new Date(),
		id: 9808316100539,
		idImg: { media: "lesedi.jpeg", alt: `ID photo of ${user.stem}` },
		phone: 79835467,
		socials: [{ icon: faComment, social: 'Instagram', link: 'https://www.instagram.com/unclewaffles_/?hl=en' }],
		bio: 'Waffles\nArtist\nInternational Dj\nRepresented by @kreative.kornerr\nEmail: bookings@kreativekornerr.com|\nNOT ON FACEBOOK',
		hobbies: ['dancing', 'singing', 'swimming'],
		occupation: [{ company: 'MTN', title: 'Sales Rep', salary_max: 30000, salary_min: 20000 }],
		ethnicity: 'coloured',
		sex: 'female',
		region: 'Manzini',
		city: 'Matsapha',
		relationship_status: 'In a relationship',
		religion: 'Christian'
	})
	const [allUsers, setAllUsers] = useState(users)
	const [allMatches, setAllMatches] = useState(matches)
	const [isAuth, setIsAuth] = useState(false)

	return (
		<DateContext.Provider
			value={{
				sidebar, setSidebar,
				user, setUser,
				userExtended, setUserExtended,
				isAuth, setIsAuth,
				allUsers, setAllUsers,
				allMatches, setAllMatches
			}}
		>
			{children}
		</DateContext.Provider>
	);
}

// Create a custom hook to access the context values
export function useDateContext() {
	const context = useContext(DateContext);

	if (!context) {
		throw new Error('useDateContext must be used within a DateContextProvider');
	}

	return context;
}
