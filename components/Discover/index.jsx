import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { useDateContext } from '@/context/dateContext';
import DiscoverCard from './DiscoverCard';
import { useSession } from 'next-auth/react';

const Discover = () => {
	const { isAuth, user, allUsers, error, setIsAuth } = useDateContext();
	const { data: session } = useSession();

	return (
		<div>
			<h1 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '32px 0' }}>
				Discover potential dates
			</h1>
			{error === '' ? (
				session ? (
					allUsers
						.filter(({ email }) => email !== session.user.email)
						.slice(0, 5)
						.map(({ stem }) => <DiscoverCard key={stem} id={stem} />)
				) : (
					allUsers.slice(0, 5).map(({ stem }) => <DiscoverCard key={stem} id={stem} />)
				)
			) : (
				<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{error}</h1>
			)}
		</div>
	);
};

export default Discover;
