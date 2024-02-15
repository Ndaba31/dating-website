import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/Home.module.css';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { useDateContext } from '@/context/dateContext';
import { ArrowForwardIos, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

// TODO DESIGN FOR PROFILE
// TODO EDIT DESIGN FOR [STEM] PROFILE

const DiscoverCard = ({ id }) => {
	const { data: session } = useSession();

	const {
		allUsers,
		allOccupations,
		isAuth,
		hobbyUsers,
		locatedUsers,
		postedUsers,
		connectedUsers,
	} = useDateContext();

	const [locations, setLocations] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);

	const maxChar = 100;

	const user = allUsers.find(({ stem }) => stem === id);
	const occupationArrays = allOccupations.filter(({ stem }) => stem === id);
	const socialArrays = connectedUsers.filter(({ stem }) => stem === id);
	console.log(occupationArrays);

	return (
	
		<div className={styles.discover_container}>
			<div className={styles.card}>
        <div className={styles.profile_image} style={{ borderRadius: '50px', overflow:'hidden'}}>
		<Image
				height={80}
				width={80}
				
				layout='fixed'
			
				// objectFit='cover'
				quality={100}
				style={{objectFit: "contain"}}
				alt={user.profile_photo === null ? 'No profile photo' : user.profile_photo}
				src={
					user.profile_photo === null ? '/side.jpg' : '/' + user.profile_photo
				}
			
			/>
        </div>
        <div className={styles.profile_details}>
		<div className={styles.discover_name}>
	 				<p className={styles.head_name}>
	 					{user.first_name} {user.last_name}
	 				</p>
	 				</div>

					 <div className={styles.discover_joins_group}>
	 					<div className={styles.discover_joins}>
	 					<p>
	 						{user.pumpkins === 1
								? user.pumpkins + ' Pumpkin'
								: user.pumpkins + ' Pumpkins'}
						</p>
						</div>
						<div className={styles.discover_joins}>
						<p>
							{user.hickies === 1
								? user.hickies + ' Hicky'
								: user.hickies + ' Hickies'}
						</p>
						</div>
						</div>
        
            {/* <p><button className={styles.contact_button}>Profile</button></p> */}
        </div>
    </div>
		</div>
		

	// 	<div className={styles.discover_container}>
	// 	<div className={styles.discover_card}>
	// 		<div className={styles.discover_image}>
	// 			<Image

					
					
	// 				layout='fill'
	// 				// objectFit='cover'
	// 				quality={100}
	// 				alt={user.profile_photo === null ? 'No profile photo' : user.profile_photo}
	// 				src={
	// 					user.profile_photo === null ? '/side.jpg' : '/' + user.profile_photo
	// 				}
	// 				style={{
	// 					// minHeight: '100%',
	// 					// width: '100%',
	// 					borderRight: user.profile_photo === null ? '2px solid #ccc' : '0',
	// 				}}
	// 			/>
	// 		</div>
	// 		<div className={styles.discover_content}>
	// 			{/* <h1 style={{ fontSize: '28px', lineHeight: '28px' }}>{user.stem}</h1> */}
	// 			<div>
	// 				<div className={styles.discover_name}>
	// 				<h1>
	// 					{user.first_name} {user.last_name}
	// 				</h1>
	// 				<div className={styles.username}>
	// 					<p>@{user.stem}</p>
	// 				</div>
	// 				</div>
	// 				<div>
	// 					{occupationArrays.length !== 0 &&
	// 						occupationArrays.map(({ title, company }, i) => (
	// 							<h3 key={i}>
	// 								{title} {company === '' ? '' : 'at ' + company}
	// 							</h3>
	// 						))}
	// 					{user.bio !== null && (
	// 						<p style={{ fontSize: '14pt' }}>{user.bio.slice(0, maxChar)}</p>
	// 					)}
	// 				</div>
	// 			</div>
	// 			<div className={styles.discover_options}>
	// 				<div className={styles.discover_following}>
	// 					<h2>Check out my profile</h2>
	// 					<Link
	// 						href={session ? `profile/${user.stem}` : 'login'}
	// 						style={{
	// 							color: '#9D6200',
	// 							backgroundColor: 'transparent',
	// 						}}
	// 					>
	// 						<ArrowForwardIos
	// 							style={{
	// 								padding: '8px',
	// 								border: '2px solid white',
	// 								borderRadius: '10px',
	// 								backgroundColor: 'white',
	// 							}}
	// 						/>
	// 					</Link>
	// 				</div>
	// 				<div className={styles.discover_joins_group}>
	// 					<div className={styles.discover_joins}>
	// 					<p>
	// 						{user.pumpkins === 1
	// 							? user.pumpkins + ' Pumpkin'
	// 							: user.pumpkins + ' Pumpkins'}
	// 					</p>
	// 					</div>
	// 					<div className={styles.discover_joins}>
	// 					<p>
	// 						{user.hickies === 1
	// 							? user.hickies + ' Hicky'
	// 							: user.hickies + ' Hickies'}
	// 					</p>
	// 					</div>
	// 					</div>
	// 				{/* <div className={`flex space-x-8 items-center justify-around text-2xl`}>
	// 					<Like like={false} prospect={user} />
	// 					<Like like={true} prospect={user} />
	// 				</div> */}
	// 				<div className={styles.discover_socials}>
	// 					{socialArrays.length !== 0 &&
	// 						socialArrays.map(({ social, visible }) => {
	// 							if (visible) {
	// 								if (social === 'facebook') {
	// 									return <Facebook key={social} />;
	// 								} else if (social === 'instagram') {
	// 									return <Instagram key={social} />;
	// 								} else if (social === 'whatsapp') {
	// 									return <WhatsApp key={social} />;
	// 								} else {
	// 									return <Twitter key={social} />;
	// 								}
	// 							}
	// 						})}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
	);
};

export default DiscoverCard;
