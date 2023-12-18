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

	const { user, isAuth, setError, error } = useDateContext();

	const currentUser = user;
	// const temp = allMatches.find(({ crushee, crush }) => crushee === user.stem && crush === id);

	// const pumpkin = allUsers.find(({ stem }) => stem === id);

	console.log(id);

	const [favorite, setFavorite] = useState();
	const [slide, setSlide] = useState(false);
	const [liked_back, setLiked_back] = useState(false);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);
	const [occupations, setOccupations] = useState([]);
	const [location, setLocation] = useState({});
	const [pumpkin, setPumpkin] = useState({});
	const [hickies, setHickies] = useState([]);

	const maxChar = 150;
	const [showAll, setShowAll] = useState(false);

	const toggleReadMore = () => {
		setShowAll(!showAll);
	};

	useEffect(() => {
		const getPumpkin = async () => {
			const getData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					crushee: currentUser.stem,
				}),
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumkins/${id}`, getData);
			const {
				user,
				occupations,
				hobbies,
				posts,
				location,
				message,
				likes,
				slide,
				liked_back,
				hickies,
			} = await res.json();

			setPumpkin(user);
			setOccupations(occupations);
			setHobbies(hobbies);
			setPosts(posts);
			setLocation(location);
			setHickies(hickies);
			setFavorite(likes);
			setSlide(slide);
			setLiked_back(liked_back);
			console.log(`Likes: ${likes}\nSlide: ${slide}\nLiked Back: ${liked_back}`);

			if (message === 'User Not Found') {
				setError(message);
			}
		};

		getPumpkin();
	}, []);

	const toggleLike = async () => {
		console.log('Toggle like acivated');
		let like_count = pumpkin.pumpkins === 0 ? 0 : pumpkin.pumpkins;
		console.log(`Like Count: ${like_count}`);

		const updateData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				like: favorite ? 1 : 0,
				update: 'like',
				crushee: user.stem,
				crush: id,
				like_count: !favorite ? ++like_count : like_count === 0 ? 0 : --like_count,
			}),
		};

		const removeData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				like: favorite ? 1 : 0,
				update: 'dislike',
				crushee: user.stem,
				crush: id,
				like_count: !favorite ? ++like_count : like_count === 0 ? 0 : --like_count,
			}),
		};

		if (!favorite) {
			const likeUser = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, updateData);
			setFavorite(true);
			console.log('Liked User');
			const { message } = await likeUser.json();
		} else {
			const removeLike = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
				removeData
			);
			setFavorite(false);
			console.log('Unliked User');
		}
	};

	useEffect(() => {
		const slideApproach = async () => {
			const slideData = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update: 'slide',
					crushee: user.stem,
					crush: id,
				}),
			};

			const cancelSlide = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update: 'slideout',
					crushee: user.stem,
					crush: id,
				}),
			};

			const decline = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update: 'slideout',
					crushee: id,
					crush: user.stem,
				}),
			};

			if (slide) {
				const slide_onUser = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
					slideData
				);
				const { message } = await slide_onUser.json();

				if (message === 'slideInitiated') {
					//setSlide(event.initial)
				}
			} else {
				const slideCancel = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
					cancelSlide
				);
			}
		};

		slideApproach();
	}, [slide]);

	let age;

	if (pumpkin === undefined || pumpkin.dob === undefined || pumpkin.dob === null) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(pumpkin.dob).getFullYear());
	}

	return (
		<>
			<Header title={id} />
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
							{isAuth && (
								<div style={{ display: 'flex', justifyContent: 'space-around' }}>
									<button
										onClick={toggleLike}
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
										{slide && liked_back ? (
											<p style={{ fontSize: '12pt' }}>Unmatch</p>
										) : slide && !liked_back ? (
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
				)}
			</div>
			<Hickies hickies={hickies} />
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
