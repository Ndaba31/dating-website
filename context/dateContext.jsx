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
	const [signupInfo, setSignupInfo] = useState({
		nickname: '',
		age: '',
		occupation: [
			{
				title: '',
				company: '',
				salary_min: 0,
				salary_max: 0,
			},
		],
		location: {
			city: '',
			region: '',
			latitude: 0,
			longitude: 0,
		},
		bio: '',
		hobbies: [''],
		phone: 0,
		sex: '',
		ethnicity: '',
		relationshipStatus: '',
		religion: '',
	});
	const [isAuth, setIsAuth] = useState(false);
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

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
				signupInfo,
				setSignupInfo,
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
