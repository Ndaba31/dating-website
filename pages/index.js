import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Header title='Pumpkin' description='Where true love meets fortune' />
		</>
	);
}
