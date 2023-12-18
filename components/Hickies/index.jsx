import React from 'react';
import styles from '@/styles/Profile.module.css';
import HickyAvatar from './HickyAvatar';

const Hickies = ({ hickies }) => {
	return (
		<div style={{ padding: '4px' }}>
			<h1>Hickies</h1>
			<div className={styles.hicky_container}>
				{hickies.map((hicky) => (
					<HickyAvatar key={hicky.stem} hicky={hicky} />
				))}
			</div>
		</div>
	);
};

export default Hickies;
