import React from 'react';
import styles from '@/styles/Home.module.css';
import { useDateContext } from '@/context/dateContext';
import MatchCard from './MatchCard';

const MatchesCard = () => {
	const { allMatches } = useDateContext();
	return (
		<>
			<h1 style={{ textAlign: 'center', margin: '50px 0' }}>Matches</h1>
			{allMatches.length === 0 ? (
				<h1>No Matches Yet</h1>
			) : (
				<div className={styles.match_container}>
					{allMatches.map((match, i) => (
						<MatchCard key={i} match={match} />
					))}
				</div>
			)}
		</>
	);
};

export default MatchesCard;
