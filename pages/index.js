import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';
import Hero from '@/components/Hero';
import { useEffect } from 'react';
import Discover from '@/components/Discover';
import MatchesCard from '@/components/Matches';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const {
		success,
		error,
		allUsers,
		setAllUsers,
		employedUsers,
		setEmployedUsers,
		hobbyUsers,
		setHobbyUsers,
		locatedUsers,
		setLocatedUsers,
		postedUsers,
		setPostedUsers,
		connectedUsers,
		setConnectedUsers,
		setAllMatches,
		allMatches,
		setError,
		setSuccess,
	} = useDateContext();
	let num = 20;

	const getInfo = async () => {
		const getData = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				count: num,
			}),
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, getData);
		const { matches, users, occupations, hobbies, locations, posts, socials } =
			await res.json();

		setAllUsers(users);

		setAllMatches(matches);

		const employed = users
			.map((user) => occupations.filter(({ stem }) => stem === user.stem))
			.filter((array) => array.length !== 0);

		setEmployedUsers(employed);

		const hobbied = users
			.map((user) => hobbies.filter(({ stem }) => stem === user.stem))
			.filter((array) => array.length !== 0);

		setHobbyUsers(hobbied);

		const loc = users
			.map((user) => locations.filter(({ stem }) => stem === user.stem))
			.filter((array) => array.length !== 0);

		setLocatedUsers(loc);

		const pics = users
			.map((user) => posts.filter(({ stem }) => stem === user.stem))
			.filter((array) => array.length !== 0);

		setPostedUsers(pics);

		const messaging = users
			.map((user) => socials.filter(({ stem }) => stem === user.stem))
			.filter((array) => array.length !== 0);

		setConnectedUsers(messaging);

		// console.log(allMatches);
		// message === 'No Users' ? setError(message) : setSuccess(message);
		// console.log('STEMS function', stems, message, success, error);
	};

	useEffect(() => {
		getInfo();
	}, []);

	console.log(allMatches);

	return (
		<div style={{ bacground: 'linear-gradient(to right, #200b33, #19171c, #19276b)' }}>
			<Header title='Pumpkin' description='Where true love meets fortune' />
			<Hero />
			<Discover />
			<MatchesCard />
		</div>
	);
}
