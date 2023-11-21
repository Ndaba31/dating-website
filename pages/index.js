import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';
import Hero from '@/components/Hero';
import { useEffect } from 'react';
import Discover from '@/components/Discover';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { success, error, allUsers, setAllUsers, setError, setSuccess } = useDateContext();

	const getUsers = async () => {
		const getData = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, getData);
		const { stems, message } = await res.json();

		setAllUsers(stems);
		message === 'No Users' ? setError(message) : setSuccess(message);
		console.log('STEMS function', stems, message, success, error);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div style={{ bacground: 'linear-gradient(to right, #200b33, #19171c, #19276b)' }}>
			<Header title='Pumpkin' description='Where true love meets fortune' />
			<Hero />
			<Discover pumpkins={allUsers} />
		</div>
	);
}
