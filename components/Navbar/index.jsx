import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Navbar.module.css';

const Navbar = ({ page }) => {
	const { isAuth, setIsAuth, user } = useDateContext();

	// if (user !== undefined)
	//     setIsAuth(true)

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link href='/' className={styles.logo} style={{ textDecoration: 'none' }}>
					{/* <div className="border-2 rounded-full w-6 h-6 bg-transparent border-white flex justify-center items-center">
                        <div className='bg-white w-[70%] h-[70%] rounded-full'></div>
                    </div> */}
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
					{/* <button onClick={() => { setSidebar(!sidebar) }} className='md:hidden'>
                        <FontAwesomeIcon icon={faCircleUser} size='xl' />
                    </button> */}
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
							<Link
								href={`${page !== 'home' ? '../discover' : 'discover'}`}
								className={styles.link}
							>
								Discover
							</Link>
							<Link
								href={`${page !== 'home' ? '../redroom' : 'redroom'}`}
								className={styles.link}
							>
								Redroom
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
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
