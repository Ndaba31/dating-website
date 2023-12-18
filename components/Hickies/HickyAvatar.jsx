import React from 'react';
import styles from '@/styles/Profile.module.css';
import Image from 'next/legacy/image';

const HickyAvatar = ({ hicky }) => {
	console.log(hicky);
	const { profile_photo, stem } = hicky;
	return (
		<div className={styles.hicky_div}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<div className={styles.hicky}>
					{profile_photo ? (
						<Image
							layout='fill'
							objectFit='contain'
							src={'/' + profile_photo}
							alt={profile_photo}
							priority
						/>
					) : (
						<Image
							layout='fill'
							objectFit='contain'
							src='/no_photo.png'
							alt='No Photo'
							priority
						/>
					)}
				</div>
				<p style={{ margin: '20px auto', fontSize: '14pt' }}>{stem}</p>
			</div>
		</div>
	);
};

export default HickyAvatar;
