import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Navbar.module.css';
import Sidebar from '../Sidebar';
import { Logout, Menu } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Navbar = ({ page }) => {
	const { isAuth, setIsAuth, user } = useDateContext();
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
						width={75}
						height={75}
						src='/logo.svg'
						alt='Pumpkin Logo'
						style={{ color: 'white' }}
					/>
					<h2 className={styles.link} style={{ fontSize: '16pt' }}>
						Pumpkin
					</h2>
				</Link>
				<div className={styles.options}>
					{!isAuth ? (
						<>
							<Link href='login' className={styles.link}>
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
								style={{
									backgroundColor: 'transparent',
									border: '0',
									fontSize: '12pt',
									display: 'flex',
									alignItems: 'center',
									border: '2px solid white',
								}}
								onClick={() => {
									setIsAuth(false);
									router.replace('/');
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
