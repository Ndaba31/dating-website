import React from 'react';
import Image from 'next/legacy/image';
import styles from '@/styles/Home.module.css';
import { ArrowForwardIos } from '@mui/icons-material';
import Link from 'next/link';
import { useDateContext } from '@/context/dateContext';

const MatchCard = ({ match }) => {
	const { blog_post, couple_photo, date_accepted, crush, crushee } = match;
	const { setSpecificMatch } = useDateContext();
	const maxChar = 60;

	const handleLinkClick=()=>{
		setSpecificMatch(match)
	}

	return (
		<div className={styles.matchCard}>
			<Image
				src={couple_photo === null ? '/no_couple.png' : '/' + couple_photo}
				alt={couple_photo}
				layout='fill'
				objectFit='cover'
			/>
			<div className={styles.overlay}>
				{blog_post !== null ? (
					<p className={styles.text}>{blog_post.slice(0, maxChar)}</p>
				) : (
					<p className={styles.text}>
						{crush} &hearts; {crushee}
					</p>
				)}

				<div style={{ margin: '20px 0' }}>
					<Link
						href={`couple-match`}
						style={{
							color: '#9D6200',
							backgroundColor: 'transparent',
						}}
						onClick={handleLinkClick}
					>
						<ArrowForwardIos
							style={{
								padding: '8px',
								border: '2px solid white',
								borderRadius: '10px',
								backgroundColor: 'white',
							}}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MatchCard;
