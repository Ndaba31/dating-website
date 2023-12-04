import Header from '@/components/Head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Image from 'next/legacy/image';
import Posts from '@/components/Posts';
import { useDateContext } from '@/context/dateContext';
import { Favorite, FavoriteBorder, PeopleAlt, PeopleAltOutlined } from '@mui/icons-material';
import Hickies from '@/components/Hickies';
import Navbar from '@/components/Navbar';

const Page = () => {
	const router = useRouter();
	const id = router.query.stem;

	const { allUsers, allMatches, user, employedUsers, isAuth } = useDateContext();

	const temp = allMatches.find(({ crushee, crush }) => crushee === user.stem && crush === id);

	const pumpkin = allUsers.find(({ stem }) => stem === id);

	console.log(user);

	const [favorite, setFavorite] = useState(temp.likes || false);
	const [slide, setSlide] = useState(temp.slide || false);
	const [hickies, setHickies] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);

	const maxChar = 150;
	const [showAll, setShowAll] = useState(false);

	console.log(temp);
	// setFavorite();

	const toggleReadMore = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		const getUserHickies = async () => {
			const getData = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${id}`, getData);
			const { hickies } = await res.json();

			setHickies(hickies);
			// setOccupations(occupations);
			// setLocations(locations);
			// setHobbies(hobbies);
			// setPosts(posts);
			console.log('Profile stem function', hickies);
		};

		getUserHickies();
	}, []);

	useEffect(() => {
		const toggleLike = async () => {
			let like_count = pumpkin.pumpkins === 0 ? 0 : pumpkin.pumpkins;

			const updateData = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					like: favorite === true ? 1 : 0,
					update: 'like',
					crushee: user.stem,
					crush: id,
					like_count: favorite ? ++like_count : like_count === 0 ? 0 : --like_count,
				}),
			};

			const likeUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, updateData);
			const { message } = await likeUser.json();

			// if (message === 'Liked profile!') setFavorite(!favorite);
		};

		toggleLike();
	}, [favorite, user.stem, id]);

	useEffect(() => {
		const toggleMatch = async () => {
			let hickie_count = pumpkin.hickies === 0 ? 0 : pumpkin.hickies;

			const updateData = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					hicky: slide === true ? 1 : 0,
					update: 'hicky',
					crushee: user.stem,
					crush: id,
					hickie_count: slide ? ++hickie_count : hickie_count === 0 ? 0 : --hickie_count,
				}),
			};

			const slideUser = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
				updateData
			);
			const { message } = await slideUser.json();

			// if (message === 'Liked profile!') setFavorite(!favorite);
		};

		toggleMatch();
	}, [slide]);

	console.log(pumpkin);
	const age =
		pumpkin.dob !== undefined || pumpkin.dob !== null
			? new Date().getFullYear() - new Date(pumpkin.dob).getFullYear() + ' y/o'
			: '';

	const occupations = employedUsers
		.filter((array, i) => array.length !== 0)
		.map((arr) => arr.filter(({ stem }) => stem === id))
		.filter((list) => list.length !== 0);

	console.log(occupations);
	return (
		<>
			<Header title={id} />
			<Navbar page='profile' />
			<div className={styles.container}>
				<div className={styles.left}>
					<Image
						src={
							pumpkin.profile_photo === null
								? '/no_photo.png'
								: '/' + pumpkin.profile_photo
						}
						alt={`/${
							pumpkin.profile_photo === null ? pumpkin.profile_photo : 'No Photo'
						}`}
						width={500}
						height={500}
						layout='responsive'
						// objectFit='cover'
						priority
						style={{ width: '100%', height: '100%' }}
					/>
				</div>

				<article className={styles.right}>
					<section className={styles.followers}>
						<p>{pumpkin.pumpkins} Pumpkins</p>
						<p>{pumpkin.hickies} Hickies</p>
					</section>
					<section className={styles.top_section}>
						{pumpkin.nick_name && (
							<h1 style={{ fontSize: '24pt', lineHeight: '24px' }}>
								{pumpkin.nick_name}
							</h1>
						)}
						<p className={styles.heading}>
							{pumpkin.first_name + ' ' + pumpkin.last_name + ', ' + age}
						</p>
						{pumpkin.sex &&
							pumpkin.sex !== 'X' &&
							(pumpkin.sex === 'M' ? (
								<p className={styles.sex}>Male</p>
							) : (
								<p className={styles.sex}>Female</p>
							))}
						{pumpkin.bio && (
							<div className={styles.section}>
								{/* <h1 className={styles.heading}>About</h1> */}
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
						{isAuth && (
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								<button
									onClick={() => setFavorite(!favorite)}
									style={{ backgroundColor: 'transparent', border: 0 }}
								>
									{favorite ? (
										<Favorite className={styles.favorite} />
									) : (
										<FavoriteBorder className={styles.favorite} />
									)}
								</button>
								<button
									onClick={() => setSlide(!slide)}
									className={styles.match_button}
								>
									{slide && temp.liked_back ? (
										<p style={{ fontSize: '12pt' }}>Unmatch</p>
									) : slide && !temp.liked_back ? (
										<p style={{ fontSize: '12pt' }}>Pending</p>
									) : (
										<p style={{ fontSize: '12pt' }}>Slide</p>
									)}
									<PeopleAltOutlined />
								</button>
							</div>
						)}
					</section>
				</article>
			</div>
			{/* <Hickies hickies={hickies} /> */}
			{console.log(hickies)}
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
