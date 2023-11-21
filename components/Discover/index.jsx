import React from 'react';
import styles from '@/styles/Home.module.css';
import { useDateContext } from '@/context/dateContext';
import DiscoverCard from './DiscoverCard';

const Discover = ({ pumpkins }) => {
	const { isAuth, user } = useDateContext();

	return (
		<div>
			<h1 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '32px 0' }}>
				Discover potential dates
			</h1>
			{isAuth
				? pumpkins
						.filter(({ stem }) => stem !== user.stem)
						.map(({ stem }) => <DiscoverCard key={stem} user={stem} />)
				: pumpkins.map(({ stem }) => <DiscoverCard key={stem} user={stem} />)}
		</div>
	);
};

export default Discover;
