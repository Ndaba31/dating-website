import React, { useEffect, useState } from 'react';
import { useDateContext } from '@/context/dateContext';
import MatchCard from './MatchCard';
import DiscoverCard from '@/components/Discover/DiscoverCard';
import Navbar from '@/components/Navbar';
import Header from '@/components/Head';

const Matches = () => {
	const {
		isAuth,
		user,
		allUsers,
		setAllUsers,
		connectedUsers,
		allOccupations,
		setAllOccupations,
		setConnectedUsers,
		setError,
		error,
	} = useDateContext();
	console.log(error);

	const [slideYou, setSlideYou] = useState([]);
	const [youAccept, setYouAccept] = useState([]);
	const [youReject, setYouReject] = useState([]);
	const [yourSlide, setYourSlide] = useState([]);
	const [acceptedRequest, setAcceptedRequest] = useState([]);
	const [rejectedRequest, setRejectedRequest] = useState([]);

	const getMatchesInfo = async () => {
		const getMatches = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'getMatches',
				user: user.stem,
			}),
		};

		const myMatches = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matches`, getMatches);
		const {
			message,
			users,
			occupations,
			socials,
			slideForYou,
			youAcceptedMatch,
			youRejectedMatch,
			slideForCrush,
			crushAccepted,
			crushRejected,
		} = await myMatches.json();

		setSlideYou(slideForYou);
		setYouAccept(youAcceptedMatch);
		setYouReject(youRejectedMatch);
		setAcceptedRequest(crushAccepted);
		setRejectedRequest(crushRejected);
		setYourSlide(slideForCrush);
		setAllOccupations(occupations);
		setConnectedUsers(socials);

		console.log(slideYou);
		console.log(youAccept);

		if (message === 'No users found') {
			setError(message);
		}
	};

	useEffect(() => {
		getMatchesInfo();
	}, []);

	return (
		<div>
			<Header title='Matches' />
			<Navbar page='matches' />

			{slideYou.length !== 0 && (
				<>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'pink',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Folks who slid in your dMs
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							slideYou
								.filter(
									({ slide, liked_back }) => slide === 1 && liked_back === null
								)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							slideYou.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</>
			)}

			{youAccept.length !== 0 && (
				<div>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'limegreen',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Pumpkins you matched with
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							youAccept
								.filter(({ slide, liked_back }) => slide === 1 && liked_back === 1)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							youAccept.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</div>
			)}

			{youReject.length !== 0 && (
				<>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'orangered',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Folks you rejected
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							youReject
								.filter(({ slide, liked_back }) => slide === 1 && liked_back === 0)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							youReject.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</>
			)}

			{yourSlide.length !== 0 && (
				<>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'pink',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Folks you shot your shot with
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							yourSlide
								.filter(
									({ slide, liked_back }) => slide === 1 && liked_back === null
								)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							yourSlide.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</>
			)}

			{acceptedRequest.length !== 0 && (
				<>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'limegreen',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Folks who are shooting their shot
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							acceptedRequest
								.filter(({ slide, liked_back }) => slide === 1 && liked_back === 1)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							acceptedRequest.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</>
			)}

			{rejectedRequest.length !== 0 && (
				<>
					<div
						style={{
							position: 'relative',
							top: '10px',
							height: '45px',
							padding: '60px',
							backgroundColor: 'orangered',
						}}
					>
						<p
							style={{
								textAlign: 'center',
								textTransform: 'capitalize',
								margin: '40px 0',
								fontSize: '14pt',
							}}
						>
							Folks who rejected you
						</p>
					</div>

					{error === '' ? (
						isAuth ? (
							rejectedRequest
								.filter(({ slide, liked_back }) => slide === 1 && liked_back === 0)
								.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						) : (
							rejectedRequest.map(({ stem }) => <MatchCard key={stem} id={stem} />)
						)
					) : (
						<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>
							{error}
						</h1>
					)}
				</>
			)}
		</div>
	);
};

export default Matches;
