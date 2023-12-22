// First, create a context
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';

const DateContext = createContext(undefined);

// Create a custom provider component that wraps your date
const DateContextProvider = ({ children }) => {
	const { data: session } = useSession();
	const [sidebar, setSidebar] = useState(false);
	const [user, setUser] = useState({
		stem: '',
		firstName: '',
		lastName: '',
		dateJoined: new Date(),
		email: '',
		password: '',
		hickies: 0,
		pumpkins: 0,
	});
	const [isAuth, setIsAuth] = useState(session ? true : false);
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [allUsers, setAllUsers] = useState([]);
	const [occupations, setOccupations] = useState([]);
	const [allOccupations, setAllOccupations] = useState([]);
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [location, setLocation] = useState({});
	const [posts, setPosts] = useState([]);
	const [socials, setSocials] = useState([]);
	const [allMatches, setAllMatches] = useState([]);
	const [specificMatch, setSpecificMatch] = useState({});

	return (
		<DateContext.Provider
			value={{
				sidebar,
				setSidebar,
				error,
				setError,
				success,
				setSuccess,
				user,
				setUser,
				allUsers,
				setAllUsers,
				allMatches,
				setAllMatches,
				occupations,
				setOccupations,
				allOccupations,
				setAllOccupations,
				hobbies,
				setHobbies,
				location,
				setLocation,
				posts,
				setPosts,
				socials,
				setSocials,
				connectedUsers,
				setConnectedUsers,
				isAuth,
				setIsAuth,
				isBusy,
				setIsBusy,
				specificMatch,
				setSpecificMatch,
			}}
		>
			{children}
		</DateContext.Provider>
	);
};

// Create a custom hook to access the context values
const useDateContext = () => {
	const context = useContext(DateContext);

	if (!context) {
		throw new Error('useDateContext must be used within a DateContextProvider');
	}

	return context;
};

export { DateContextProvider, useDateContext };
