'use client';
// First, create a context
import { createContext, useContext, useState, ReactNode } from 'react';
import User from '../interfaces/User';

interface DateContextProps {
	sidebar: boolean;
	setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

// Create a custom provider component that wraps your date
interface DateContextProviderProps {
	children: ReactNode;
}

export function DateContextProvider({ children }: DateContextProviderProps) {
	const [sidebar, setSidebar] = useState(false);
	const [user, setUser] = useState({ firstName: "Nosiphephelo", lastName: "Ndabandaba", email: "my@mail.com", password: "12345", stem: "holy_baddie" });

	return (
		<DateContext.Provider
			value={{
				sidebar,
				setSidebar,
				user,
				setUser
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
