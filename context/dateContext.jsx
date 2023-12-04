// First, create a context
import { createContext, useContext, useState } from 'react';

const DateContext = createContext(undefined);

// Create a custom provider component that wraps your date
const DateContextProvider = ({ children }) => {
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
	const [isAuth, setIsAuth] = useState(false);
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [allUsers, setAllUsers] = useState([]);
	const [allOccupations, setAllOccupations] = useState([]);
	const [hobbyUsers, setHobbyUsers] = useState([]);
	const [locatedUsers, setLocatedUsers] = useState([]);
	const [postedUsers, setPostedUsers] = useState([]);
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [allMatches, setAllMatches] = useState([]);

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
				allOccupations,
				setAllOccupations,
				hobbyUsers,
				setHobbyUsers,
				locatedUsers,
				setLocatedUsers,
				postedUsers,
				setPostedUsers,
				connectedUsers,
				setConnectedUsers,
				isAuth,
				setIsAuth,
				isBusy,
				setIsBusy,
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
