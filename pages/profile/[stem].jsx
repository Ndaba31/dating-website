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
	console.log(currentUser);
	// const temp = allMatches.find(({ crushee, crush }) => crushee === user.stem && crush === id);

	// const pumpkin = allUsers.find(({ stem }) => stem === id);

	console.log(id);

	const [favorite, setFavorite] = useState();
	const [isSlider, setIsSlider] = useState(true);
	const [slide, setSlide] = useState(false);
	const [acceptSlide, setAcceptSlide] = useState(null);
	const [liked_back, setLiked_back] = useState(false);
	const [hobbies, setHobbies] = useState([]);
	const [posts, setPosts] = useState([]);
	const [occupations, setOccupations] = useState([]);
	const [location, setLocation] = useState({});
	const [pumpkin, setPumpkin] = useState({});
	const [hickies, setHickies] = useState([]);

	let totalMatches = pumpkin.hickies === 0 ? 0 : pumpkin.hickies;

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
				isCrushee,
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
			setAcceptSlide(
				slide && liked_back === 1 ? true : slide && liked_back === 0 ? false : null
			);
			setIsSlider(
				liked_back === null || liked_back === 0 || liked_back === 1 ? isCrushee : true
			);
			console.log(
				`Likes: ${likes}\nSlide: ${slide}\nLiked Back: ${liked_back}\nisSlider: ${isCrushee}\nAccept Slide: ${acceptSlide}`
			);

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

	const toggleSlide = async () => {
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
				matched: false,
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

		if (!slide && liked_back === undefined) {
			const slide_onUser = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
				slideData
			);
			setSlide(true);
			setLiked_back(null);
			const { message } = await slide_onUser.json();

			// if (message === 'slideInitiated') {
			// 	setSlide(event.initial)
			// }
		} else if (slide && liked_back === null) {
			const slideCancel = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
				cancelSlide
			);
			setSlide(false);
			setLiked_back(undefined);
		} else if (slide && liked_back === 1) {
			const slideCancel = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update: 'slideout',
					matched: true,
					crushee: user.stem,
					crush: id,
				}),
			});
			setSlide(false);
			setLiked_back(undefined);
		}
	};

	const toggleLikedBack = async () => {
		const denyMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'denyMatch',
				crushee: id,
				crush: user.stem,
			}),
		};

		const nullify = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'nullify',
				crushee: id,
				crush: user.stem,
				totalMatches: !liked_back
					? ++totalMatches
					: totalMatches === 0
					? 0
					: --totalMatches,
			}),
		};

		if (acceptSlide === false) {
			console.log('Declined Slide');
			const declineMatch = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
				denyMatch
			);
			setLiked_back(0);
		}

		if (acceptSlide === null) {
			console.log('Changed Mind');
			const negate = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, nullify);
			setLiked_back(null);
		}
	};

	const approve = async () => {
		setAcceptSlide(true);
		console.log('toggle Approve Started');

		const confirmMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'confirmMatch',
				crushee: id,
				crush: user.stem,
				totalMatches: !liked_back
					? ++totalMatches
					: totalMatches === 0
					? 0
					: --totalMatches,
			}),
		};

		console.log('Approved Slide');
		const acceptMatch = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`,
			confirmMatch
		);
		setLiked_back(1);
	};

	const decline = async () => {
		setAcceptSlide(false);
		console.log('toggle Decline Started');

		const denyMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'denyMatch',
				crushee: id,
				crush: user.stem,
			}),
		};

		console.log('Declined Slide');
		const declineMatch = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, denyMatch);
		setLiked_back(0);
	};

	const changeMind = () => {
		setAcceptSlide(null);
		console.log(acceptSlide);
		toggleLikedBack();
	};

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
									{isSlider ? (
										<button
											onClick={toggleSlide}
											className={`${styles.match_button} ${
												liked_back === 0 ? styles.rejected_match : ''
											} ${
												slide && liked_back === 1
													? styles.accepted_match
													: ''
											} ${liked_back === null ? styles.pending_match : ''}`}
											disabled={liked_back === 0}
										>
											{!slide && liked_back === undefined ? (
												<p style={{ fontSize: '12pt' }}>Slide</p>
											) : slide && liked_back === null ? (
												<p style={{ fontSize: '12pt' }}>Gwababa</p>
											) : slide && liked_back === 0 ? (
												<p style={{ fontSize: '12pt' }}>Rejected</p>
											) : (
												<p style={{ fontSize: '12pt' }}>Unmatch</p>
											)}
											<PeopleAltOutlined />
										</button>
									) : acceptSlide === null ? (
										<div id='choice'>
											<p style={{ fontSize: '12pt' }}>
												<b>
													This Person has already initiated to match with
													you{' '}
												</b>
											</p>
											<div className={styles.choice_buttons}>
												<button
													onClick={approve}
													className={styles.match_button_accept}
												>
													<p style={{ fontSize: '12pt' }}>Accept</p>
												</button>
												<button
													onClick={decline}
													className={styles.match_button_decline}
												>
													<p style={{ fontSize: '12pt' }}>Decline</p>
												</button>
											</div>
										</div>
									) : acceptSlide === true || acceptSlide === false ? (
										<button onClick={changeMind} className={styles.change_mind}>
											<p style={{ fontSize: '12pt' }}>Change Mind</p>
										</button>
									) : (
										<p>No Button to display</p>
									)}
								</div>
							)}
						</section>
					</article>
				)}
			</div>
			{hickies.length !== 0 && <Hickies hickies={hickies} />}
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
