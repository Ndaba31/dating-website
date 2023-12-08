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

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { setAllUsers, allUsers, connectedUsers, allOccupations, setAllOccupations, setConnectedUsers, setError } =
		useDateContext();
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
		const { message, users, occupations, socials } = await res.json();

		setAllUsers(users);

		setAllOccupations(occupations);

		setConnectedUsers(socials);

		if (message === 'No users found') {
			setError(message);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	console.log(connectedUsers);
	console.log(allOccupations);
	console.log(allUsers);
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
