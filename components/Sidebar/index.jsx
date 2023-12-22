// Sidebar.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Sidebar.module.css';
import { Cancel } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = ({ closeSidebar, page }) => {
	const { isAuth, setIsAuth } = useDateContext();
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className={styles.sidebar}>
			<button className={styles.closeButton} onClick={closeSidebar}>
				<Cancel />
			</button>
			<div className={styles.sidebarContent}>
				{session ? (
					<>
						<Link href='/' className={styles.link}>
							Home
						</Link>
						<Link
							href='/discover'
							// href={`${page !== 'home' ? '../discover' : 'discover'}`}
							className={styles.link}
						>
							Discover
						</Link>
						<Link
							href='/matches'
							// href={`${page !== 'home' ? '../matches' : 'matches'}`}
							className={styles.link}
						>
							Matches
						</Link>
						<Link
							href='/profile'
							// href={`${page !== 'home' ? '../profile' : 'profile'}`}
							className={styles.link}
							onClick={() => setIsBusy(true)}
						>
							Profile
						</Link>
						<button
							className={`${styles.link} ${styles.login}`}
							style={{ backgroundColor: 'transparent', border: '0' }}
							onClick={() => {
								signOut({
									callbackUrl: `${process.env.NEXT_PUBLIC_URL}`,
								});
								// setIsAuth(false);
								// closeSidebar();
								// router.replace('/');
							}}
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link href='/login' className={styles.link}>
							Login
						</Link>
						<Link href='/signup' className={styles.link}>
							Sign Up
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
