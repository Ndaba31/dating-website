import Header from '@/components/Head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Image from 'next/image';
import Posts from '@/components/Posts';

const Page = () => {
	const router = useRouter();
	const stem = router.query.stem;

	const [user, setUser] = useState();
	const [occupations, setOccupations] = useState([]);
	const [locations, setLocations] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);

	const maxChar = 150;
	const [showAll, setShowAll] = useState(false);

	const toggleReadMore = () => {
		setShowAll(!showAll);
	};

	const getUser = async () => {
		const getData = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/users/${router.query.stem}`,
			getData
		);
		const { user, message, occupations, locations, hobbies, posts } = await res.json();

		setUser(user[0]);
		setOccupations(occupations);
		setLocations(locations);
		setHobbies(hobbies);
		setPosts(posts);
		console.log('User function', user[0], message, occupations, locations, hobbies);
	};

	useEffect(() => {
		getUser();
	}, [stem]);

	console.log(user);
	const age = user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : '';

	return (
		<>
			<Header title={stem} />
			<div className={styles.container}>
				<div className={styles.left}>
					<Image
						src={`/${user.profile_photo ? user.profile_photo : 'no_photo.png'}`}
						alt={`/${user.profile_photo ? user.profile_photo : 'no_photo.png'}`}
						width={500}
						height={500}
						layout='responsive'
						priority
						style={{ borderRadius: '10px' }}
					/>
				</div>

				<article className={styles.right}>
					<div className={styles.followers}>
						<p>{user.pumpkins} Pumpkins</p>
						<p>{user.hickies} Hickies</p>
					</div>
					<section>
						<h1 className={styles.heading}>
							{user.first_name + ' ' + user.last_name + ', ' + age}
						</h1>
						{user.sex &&
							(user.sex === 'M' ? (
								<p className={styles.sex}>Male</p>
							) : (
								<p className={styles.sex}>Female</p>
							))}
						{user.nick_name && (
							<p className={styles.sex} style={{ color: 'white' }}>
								AKA {user.nick_name}
							</p>
						)}
					</section>
					{occupations.length !== 0 && (
						<section className={styles.section}>
							<h1 className={styles.heading}>Occupation</h1>
							{occupations.map(({ title, company }, i) => (
								<p
									key={i}
									style={{
										fontSize: '16px',
										lineHeight: '24px',
										padding: 2,
									}}
								>
									{title} at {company}
								</p>
							))}
						</section>
					)}
					{locations.length !== 0 && (
						<section className={styles.section}>
							<h1 className={styles.heading}>Location</h1>
							{locations.map(({ city, region }, i) => (
								<p key={i} style={{ fontSize: '16px', lineHeight: '24px' }}>
									{city}, {region} region
								</p>
							))}
						</section>
					)}
					{user.bio && (
						<section className={styles.section}>
							<h1 className={styles.heading}>About</h1>
							<p className='text-m'>
								{showAll ? user.bio : user.bio.slice(0, maxChar)}
							</p>
							{user.bio.length > maxChar && (
								<button onClick={toggleReadMore} className='text-blue-500'>
									{showAll ? 'Read Less' : 'Read More'}
								</button>
							)}
						</section>
					)}
					{hobbies.length !== 0 && (
						<section className={styles.section}>
							<h1 className={styles.heading}>Hobbies</h1>
							<div className={styles.hobbies}>
								{hobbies.map(({ hobby }, i) => (
									<button key={i} className={styles.hobby} disabled>
										{hobby}
									</button>
								))}
							</div>
						</section>
					)}
				</article>
			</div>
			<div style={{ padding: '16px' }}>
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
						<Posts posts={posts} />
					</>
				) : (
					<h1 style={{ textAlign: 'center' }}>No Posts Yet</h1>
				)}
			</div>
		</>
	);
};

export default Page;
