import Header from '@/components/Head';
import Navbar from '@/components/Navbar';
import Posts from '@/components/Posts';
import { useDateContext } from '@/context/dateContext';
import styles from '@/styles/Profile.module.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { AddBoxOutlined, EditNoteSharp } from '@mui/icons-material';

const Profile = () => {
	const {
		user,
		setUser,
		setHobbies,
		hobbies,
		setOccupations,
		occupations,
		posts,
		setPosts,
		location,
		setLocation,
		socials,
		setSocials,
		setError,
	} = useDateContext();
	// const [hobbies, setHobbies] = useState([]);
	// const [posts, setPosts] = useState([]);
	// const [occupations, setOccupations] = useState([]);
	// const [location, setLocation] = useState({});
	const [pumpkin, setPumpkin] = useState({});

	const current_user = user;
	const maxChar = 150;
	const [showAll, setShowAll] = useState(false);

	const toggleReadMore = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		const getPumpkin = async () => {
			const getData = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumkins/${current_user.stem}`,
				getData
			);
			const { user, occupations, hobbies, posts, location, socials, message } =
				await res.json();

			setPumpkin(user);
			setUser(user);
			setOccupations(occupations);
			setHobbies(hobbies);
			setPosts(posts);
			setLocation(location);
			setSocials(socials);

			if (message === 'User Not Found') {
				setError(message);
			}
		};

		getPumpkin();
	}, []);

	let age;

	if (pumpkin === undefined || pumpkin.dob === undefined || pumpkin.dob === null) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(pumpkin.dob).getFullYear());
	}

	return (
		<>
			<Header title='My Profile' />
			<Navbar page='profile' />
			<div className={styles.container}>
				<div className={styles.left}>
					<Image
						src={
							pumpkin === undefined ||
							pumpkin.profile_photo === undefined ||
							pumpkin.profile_photo === null
								? '/no_photo.png'
								: '/' + pumpkin.profile_photo
						}
						alt={`/${
							pumpkin === undefined ||
							pumpkin.profile_photo === undefined ||
							pumpkin.profile_photo === null
								? 'No Photo'
								: pumpkin.profile_photo
						}`}
						width={500}
						height={500}
						layout='responsive'
						// objectFit='cover'
						priority
						// style={{ width: '100%', height: '100%' }}
					/>
				</div>

				{pumpkin !== undefined && (
					<article className={styles.right}>
						<section className={styles.followers}>
							<p>{pumpkin.pumpkins} Pumpkins</p>
							<p>{pumpkin.hickies} Hickies</p>
						</section>
						<section className={styles.top_section}>
							{pumpkin.nick_name !== '' && (
								<h1 style={{ fontSize: '24pt', lineHeight: '24px' }}>
									{pumpkin.nick_name}
								</h1>
							)}
							<p className={styles.heading}>
								{pumpkin.first_name + ' ' + pumpkin.last_name + age}
							</p>
							{occupations.length !== 0 &&
								occupations.map(({ title, company }, i) => {
									title !== '' && (
										<p key={i} style={{ fontSize: '14pt' }}>
											{title} {company === '' ? '' : 'at ' + company}
										</p>
									);
								})}
							{pumpkin.sex &&
								pumpkin.sex !== 'X' &&
								(pumpkin.sex === 'M' ? (
									<p className={styles.sex}>Male</p>
								) : (
									<p className={styles.sex}>Female</p>
								))}
							<div className={styles.info_container}>
								{location !== undefined && location.city && (
									<div className={styles.info}>
										<p>Closest City:</p>
										<p>{location.city}</p>
									</div>
								)}
								{location !== undefined && location.region && (
									<div className={styles.info}>
										<p>Region:</p>
										<p>{location.region}</p>
									</div>
								)}
								{pumpkin.ethnicity && (
									<div className={styles.info}>
										<p>Ethnicity:</p>
										<p>{pumpkin.ethnicity}</p>
									</div>
								)}
								{pumpkin.relationship_status && (
									<div className={styles.info}>
										<p>Relationship Status:</p>
										<p>{pumpkin.relationship_status}</p>
									</div>
								)}
								{pumpkin.religion && (
									<div className={styles.info}>
										<p>Religion:</p>
										<p>{pumpkin.religion}</p>
									</div>
								)}
							</div>
							{pumpkin.bio && (
								<div className={styles.section}>
									<h2>About</h2>
									<p style={{ fontSize: '16pt' }}>
										{showAll ? pumpkin.bio : pumpkin.bio.slice(0, maxChar)}
									</p>
									{pumpkin.bio.length > maxChar && (
										<button onClick={toggleReadMore} className={styles.read}>
											{showAll ? 'Read Less' : 'Read More'}
										</button>
									)}
								</div>
							)}
							{hobbies.length !== 0 && (
								<div>
									<h2>Hobbies</h2>
									<div className={styles.hobbies}>
										{hobbies.map(({ hobby }, i) => (
											<button key={i} className={styles.hobby} disabled>
												{hobby}
											</button>
										))}
									</div>
								</div>
							)}
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								<Link href='profile/edit' className={styles.link}>
									<EditNoteSharp />
									<p>Edit Profile</p>
								</Link>
								<Link
									href='profile/post-image'
									className={styles.link}
									// className='border-2 border-purple-500 hover:bg-white hover:text-purple-500 flex space-x-4 rounded-lg items-center p-2'
								>
									<AddBoxOutlined />
									<p>Post</p>
								</Link>
							</div>
						</section>
					</article>
				)}
			</div>
			{/* <Hickies hickies={hickies} /> */}
			{/* {console.log(hickies)} */}
			<div style={{ padding: '16px', display: 'grid' }}>
				{posts.length !== 0 ? (
					<>
						<h1
							style={{
								fontWeight: 'bold',
								textAlign: 'center',
								marginBottom: '32px',
							}}
						>
							Gallery
						</h1>
						<Posts posts={posts} isUser={true} />
					</>
				) : (
					<h1 style={{ textAlign: 'center' }}>No Posts Yet</h1>
				)}
			</div>
		</>
	);
};

export default Profile;
