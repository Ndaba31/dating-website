import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { success } = useDateContext();

	return (
		<>
			<Header title='Pumpkin' description='Where true love meets fortune' />
			{success !== '' && <p className={styles.success}>{success}</p>}
		</>
	);
}
