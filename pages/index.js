import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';
import Discover from '@/components/Discover';
import MatchesCard from '@/components/Matches';
import Navbar from '@/components/Navbar';
import { useSession, signIn, signOut } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const {
		setAllUsers,
		setAllOccupations,
		setAllMatches,
		setConnectedUsers,
		setError,
		setSuccess,
		setIsAuth,
		isAuth,
		setUser,
	} = useDateContext();

	const { data: session, update } = useSession();
	// const { session, accessToken } = data;

	const num = 10;

	const getInfo = async () => {
		setSuccess('');
		setError('');

		const getData = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				count: num,
				email: session ? session.user.email : '',
			}),
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpkins`, getData);
		const { message, users, occupations, socials, matches, user } = await res.json();

		setAllUsers(users);

		setUser(user);

		console.log(users);

		setAllOccupations(occupations);
		// console.log(`Occupations: ${occupations[0].title}`);

		setConnectedUsers(socials);

		setAllMatches(matches);

		if (message === 'No users found') {
			setError(message);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	if (session) console.log(session);
	return (
		<div style={{ bacground: 'linear-gradient(to right, #200b33, #19171c, #19276b)' }}>
			<Header title='Pumpkin' description='Where true love meets fortune' />
			<Navbar page='home' />
			<Hero />
			<Discover />
			<MatchesCard />
		</div>
	);
}
