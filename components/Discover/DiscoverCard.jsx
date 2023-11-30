import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/Home.module.css';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { useDateContext } from '@/context/dateContext';
import { ArrowForwardIos } from '@mui/icons-material';

// TODO DESIGN FOR PROFILE
// TODO EDIT DESIGN FOR [STEM] PROFILE

const DiscoverCard = ({ id }) => {
	const { allUsers, employedUsers, hobbyUsers, locatedUsers, postedUsers, connectedUsers } =
		useDateContext();

	// const [user, setUser] = useState([]);
	// const [occupations, setOccupations] = useState([]);
	const [locations, setLocations] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);

	const maxChar = 100;

	const user = allUsers.find(({ stem }) => stem === id);
	const occupationArrays = employedUsers
		.filter((array, i) => array.length !== 0)
		.map((arr) => arr.filter(({ stem }) => stem === id))
		.filter((list) => list.length !== 0);

	return (
		<div className={styles.discover_container}>
			<div className={styles.discover_card}>
				<div className={styles.discover_image}>
					<Image
						width={500}
						height={500}
						layout='responsive'
						// objectFit='contain'
						quality={100}
						alt={user.profile_photo === null ? 'No profile photo' : user.profile_photo}
						src={
							user.profile_photo === null ? '/no_photo.png' : '/' + user.profile_photo
						}
						style={{
							// height: '100%',
							// width: '100%',
							borderRight: user.profile_photo === null ? '2px solid #ccc' : '0',
						}}
					/>
				</div>
				<div className={styles.discover_content}>
					{/* <h1 style={{ fontSize: '28px', lineHeight: '28px' }}>{user.stem}</h1> */}
					<div style={{ margin: '32px 0' }}>
						<h1>
							{user.first_name} {user.last_name}
						</h1>
						<div>
							{occupationArrays.length === 0 &&
								occupationArrays.map((array) =>
									array.map(({ company, title }, i) => (
										<p key={i}>
											{title} at {company}
										</p>
									))
								)}
							{user.bio !== null && (
								<p style={{ fontSize: '14pt' }}>{user.bio.slice(0, maxChar)}</p>
							)}
						</div>
					</div>
					<div className={styles.discover_options}>
						<div className={styles.discover_following} style={{ alignItems: 'center' }}>
							<h2>Check out my profile</h2>
							<Link
								href={`profile/${user.stem}`}
								style={{
									color: '#9D6200',
									backgroundColor: 'transparent',
								}}
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
						<div className={styles.discover_joins}>
							<p>{user.pumpkins} Pumpkins</p>
							<p>{user.hickies} Hickies</p>
						</div>
						{/* <div className={`flex space-x-8 items-center justify-around text-2xl`}>
                            <Like like={false} prospect={user} />
                            <Like like={true} prospect={user} />
                        </div> */}
						{/* <div className='flex space-x-8 items-center'>
                            {
                                user.socials
                                    ?.map(({ icon, social, link }) => (
                                        <Link href={link} key={social}>
                                            <FontAwesomeIcon icon={icon} />
                                        </Link>
                                    ))
                            }
                        </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiscoverCard;
