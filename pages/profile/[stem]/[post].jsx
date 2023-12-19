import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Header from '@/components/Head';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { Delete } from '@mui/icons-material';

const ViewPost = () => {
	const router = useRouter();
	const stem = router.query.stem;
	const id = router.query.post;
	const [photo, setPhoto] = useState(null);

	console.log(`stem: ${stem}\nid: ${id}`);

	useEffect(() => {
		const getPost = async () => {
			const data = new FormData();
			data.append('tag', stem);
			data.append('post_id', id);

			const getData = {
				method: 'PUT',
				body: data,
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, getData);
			const { post } = await res.json();

			console.log(post);
			setPhoto(post);
		};

		getPost();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Submit function');

		const data = new FormData();
		data.append('tag', stem);
		data.append('post_id', id);
		data.append('post_path', photo);

		const removeData = {
			method: 'DELETE',
			body: data,
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, removeData);

		if (!res.ok) {
			const { error } = await res.json();
			setError(error);
			throw new Error(await res.text());
		}

		router.push('/profile');
	};

	return (
		<main style={{ padding: '8px' }}>
			<Header title='View Post' />
			<h1 style={{ margin: '20px 0' }}>View Post</h1>
			<hr />
			<form onSubmit={handleSubmit} className={styles.post_form}>
				<div
					className={`${styles.post} ${!photo ? '' : styles.flex_center}`}
					style={{ border: 'dotted' }}
				>
					<Image layout='fill' objectFit='contain' src={`/${photo}`} alt={`Post ${id}`} />
				</div>
				<div className={styles.flex_col_center}>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Link
							className={[styles.edit_options_buttons, styles.edit_cancel].join(' ')}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							href='/profile'
							// onClick={() => {
							// 	router.push('/profile');
							// }}
						>
							Back
						</Link>
						<button
							type='submit'
							className={styles.edit_delete_button}
							style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
						>
							<p>Delete Photo</p>
							<Delete />
						</button>
					</div>
				</div>
			</form>
		</main>
	);
};

export default ViewPost;
