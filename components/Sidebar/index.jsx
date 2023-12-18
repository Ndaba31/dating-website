// Sidebar.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Sidebar.module.css';
import { Cancel } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Sidebar = ({ closeSidebar, page }) => {
	const { isAuth, setIsAuth } = useDateContext();
	const router = useRouter();

	return (
		<div className={styles.sidebar}>
			<button className={styles.closeButton} onClick={closeSidebar}>
				<Cancel />
			</button>
			<div className={styles.sidebarContent}>
				{isAuth ? (
					<>
						<Link
							href={`${page !== 'home' ? '../discover' : 'discover'}`}
							className={styles.link}
						>
							Discover
						</Link>
						<Link
							href={`${page !== 'home' ? '../matches' : 'matches'}`}
							className={styles.link}
						>
							Matches
						</Link>
						<Link
							href={`${page !== 'home' ? '../profile' : 'profile'}`}
							className={styles.link}
						>
							Profile
						</Link>
						<button
							className={styles.link}
							style={{ backgroundColor: 'transparent', border: '0' }}
							onClick={() => {
								setIsAuth(false);
								closeSidebar();
								router.replace('/');
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
