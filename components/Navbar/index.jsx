import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Navbar.module.css';
import Sidebar from '../Sidebar';
import { Logout, Menu } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Navbar = ({ page }) => {
	const { isAuth, setIsBusy, user } = useDateContext();
	const { data: session } = useSession();
	const [showSidebar, setShowSidebar] = useState(false);
	const router = useRouter();

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link href='/' className={styles.logo} style={{ textDecoration: 'none' }}>
					<Image
						width={45}
						height={45}
						src='/logo.svg'
						alt='Pumpkin Logo'
						style={{ color: 'black' }}
					/>
					<h2 className={styles.link} style={{ fontSize: '16pt' }}>
						Pumpkin
					</h2>
				</Link>
				<div className={styles.options}>
					{!session ? (
						<>
							<Link href='login' className={styles.login_link}>
								Login
							</Link>
							<Link href='signup' className={styles.signup_link}>
								Sign Up
							</Link>
						</>
					) : (
						<>
							<Link href={`${page !== 'home' ? '../' : '/'}`} className={styles.link}>
								Home
							</Link>
							<Link
								href={`${process.env.NEXT_PUBLIC_URL}/discover`}
								className={styles.link}
							>
								Discover
							</Link>
							<Link
								href={`${process.env.NEXT_PUBLIC_URL}/matches`}
								className={styles.link}
							>
								Matches
							</Link>
							<Link
								href={`${process.env.NEXT_PUBLIC_URL}/profile`}
								className={styles.link}
								onClick={() => setIsBusy(true)}
							>
								Profile
							</Link>
							<button
								className={`${styles.link} ${styles.login}`}
								style={{
									backgroundColor: 'transparent',
									border: '0',
									fontSize: '12pt',
									display: 'flex',
									alignItems: 'center',
									border: '2px solid white',
								}}
								onClick={() => {
									signOut();
									// router.replace('/');
								}}
							>
								<p>Logout</p>
								<Logout />
							</button>
						</>
					)}
				</div>
				<button className={styles.mobileMenu} onClick={toggleSidebar}>
					<Menu />
				</button>
			</nav>
			{showSidebar && <Sidebar closeSidebar={toggleSidebar} page={page} />}
		</header>
	);
};

export default Navbar;
