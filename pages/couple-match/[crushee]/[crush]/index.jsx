import Header from '@/components/Head';
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/Couple.module.css';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useDateContext } from '@/context/dateContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Load';

const coupleMatch = () => {
	const router = useRouter();
	const current_crushee = router.query.crushee;
	const current_crush = router.query.crush;
	const { data: session } = useSession();

	const [matchee, setMatchee] = useState(false);
	const [reload, setReload] = useState(true);
	const [editBio, setEditBio] = useState(false);
	const [open, setOpen] = useState(false);
	const { specificMatch, setSpecificMatch } = useDateContext();
	const [bioValue, setBioValue] = useState('');

	const fetchBio = useRef();

	const updateBio = async () => {
		const bioData = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newbio: bioValue,
				crushee: specificMatch.crushee,
				crush: specificMatch.crush,
				getMatch: false,
			}),
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/couple`, bioData);
		const { message } = await res.json();
	};

	useEffect(() => {
		const getMatch = async () => {
			setReload(bioValue === '');
			console.log(current_crushee, current_crush, session);

			const bioData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					getMatch: true,
					crushee: current_crushee === undefined ? '' : current_crushee,
					crush: current_crush === undefined ? '' : current_crush,
					newbio: '',
					email: session ? session.user.email : '',
				}),
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/couple`, bioData);
			const { match, user } = await res.json();

			if (user && match) {
				setSpecificMatch(match);

				if (match.blog_post && match.blog_post !== '') setBioValue(match.blog_post);
				else setBioValue('No Blog Post Yet');

				if (user.stem === match.crushee || user.stem === match.crush) {
					setMatchee(true);
					setOpen(true);
					setBioValue(specificMatch.blog_post);
				}
			} else {
				setBioValue('');
			}
		};
		getMatch();
	}, [current_crushee, current_crush, session]);

	return (
		<>
			<Header title='Matched Couple' />
			<Navbar page='couple-match' />
			<div className={styles.heading}>
				Welcome to the {current_crushee} and {current_crush}'s page
			</div>
			<Image
				src={
					!specificMatch || !specificMatch.couple_photo
						? '/no_couple_photo.png'
						: `/${specificMatch.couple_photo}`
				}
				alt='Couple Photo'
				width={500}
				height={500}
				layout='responsive'
				priority
			/>
			{!editBio && specificMatch && specificMatch.blog_post && (
				<div className={styles.bg}>
					<h1 className={styles.headingText}>Read Our Biography</h1>
					{reload ? (
						<Loading />
					) : (
						<h2 className={styles.readBio}>
							{bioValue === '' ? 'No Blog Post Yet' : bioValue}
						</h2>
					)}
				</div>
			)}

			{matchee && open ? (
				<div className={styles.buttons}>
					<button
						onClick={() => {
							setEditBio(true);
							setOpen(false);
						}}
						className={styles.edit}
					>
						{bioValue !== '' ? <p>Edit Blog</p> : <p>Add Blog</p>}
					</button>
					<Link
						href={`../${current_crushee}/${current_crush}/edit`}
						className={styles.upload}
					>
						Upload Photo
					</Link>
				</div>
			) : (
				<p></p>
			)}
			{editBio && (
				<>
					<h1 className={styles.headingText}>Change Bio</h1>
					<form>
						<div className={styles.texta}>
							<textarea
								className={styles.edit_textarea}
								name='bio'
								id='bio'
								onChange={(e) => {
									setBioValue(e.target.value);
								}}
								value={bioValue}
							></textarea>
						</div>
						<div className={styles.save_button}>
							<button
								onClick={(e) => {
									e.preventDefault(),
										// captureBio(),

										setEditBio(false),
										updateBio(),
										setOpen(true);
									// ,location.reload()
								}}
								className={styles.save}
							>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default coupleMatch;
