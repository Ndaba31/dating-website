import React from 'react';
import styles from '@/styles/Home.module.css';
import { useDateContext } from '@/context/dateContext';
import DiscoverCard from './DiscoverCard';

const Discover = () => {
	const { isAuth, user, allUsers } = useDateContext();

	return (
		<div>
			<h1 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '32px 0' }}>
				Discover potential dates
			</h1>
			{isAuth
				? allUsers
						.filter(({ stem }) => stem !== user.stem)
						.map(({ stem }) => <DiscoverCard key={stem} id={stem} />)
				: allUsers.map(({ stem }) => <DiscoverCard key={stem} id={stem} />)}
		</div>
	);
};

export default Discover;
