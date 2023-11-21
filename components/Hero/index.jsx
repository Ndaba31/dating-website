import React from 'react';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { useDateContext } from '@/context/dateContext';
import Link from 'next/link';

const Hero = () => {
	const { isAuth } = useDateContext();

	return (
		<div className={styles.hero_container}>
			<div className={styles.hero_shadow}>
				<div className={styles.hero_image}>
					<Image
						// src={`/${user.profile_photo ? user.profile_photo : 'no_photo.png'}`}
						// alt={`/${user.profile_photo ? user.profile_photo : 'no_photo.png'}`}
						src='/lady.webp'
						alt='Some photo'
						width={500}
						height={500}
						layout='responsive'
						priority
						style={{ borderRadius: '10px' }}
					/>
				</div>
				<div className={styles.hero_content}>
					<h1 className={styles.hero_heading}>Pumpkin</h1>
					<p className={styles.hero_subheading}>Where true love meets fortune</p>
					<div
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'space-around',
						}}
					>
						{isAuth ? (
							<>
								<Link className={styles.hero_buttons} href='/matches'>
									My Matches
								</Link>
								<Link className={styles.hero_buttons} href='/profile'>
									My Profile
								</Link>
							</>
						) : (
							<>
								<Link className={styles.hero_buttons} href='/signup'>
									Sign Up
								</Link>
								<Link className={styles.hero_buttons} href='/login'>
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
