import React from 'react';
import styles from '@/styles/Home.module.css';
import Image from 'next/legacy/image';
import { useDateContext } from '@/context/dateContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Hero = () => {
	const { isAuth } = useDateContext();
	const { data: session } = useSession();

	return (
		<div className={styles.hero_container}>
			
			<div className={styles.hero_shadow}>
			
				<div className={styles.hero_content}>
					<h1 className={styles.hero_heading}>Hi, Welcome to Pumpkin</h1>
					<p className={styles.hero_subheading}>Where true love meets fortune</p>
					
					<div>
						{session ? (
							<>
							<div className={styles.two_buttons}>
								<Link className={styles.hero_buttons} href='/matches'>
									My Matches
								</Link>
								<Link className={styles.hero_buttons} href='/profile'>
									My Profile
								</Link>
								</div>
							</>
						) : (
							<>
							<div className={styles.two_buttons}>
								<Link className={styles.hero_buttons} href='/signup'>
									Create Account
								</Link>

							

								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
