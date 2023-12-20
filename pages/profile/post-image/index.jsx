import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Link from 'next/link';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';

const PostImage = () => {
	const { isBusy, setIsBusy, setError, error, user } = useDateContext();
	const [photo, setPhoto] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const router = useRouter();
	setIsBusy(photo ? false : true);

	const onFileUploadChange = (e) => {
		const selectedFile = e.target.files[0];
		setPhoto(selectedFile);

		// Generate a preview of the selected image
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setImagePreview(null);
		}
	};

	const onCancelFile = () => {
		setPhoto(null);
		setImagePreview(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!photo) {
			setError('No photo uploaded');
			return;
		}

		try {
			const data = new FormData();
			data.append('file', photo);
			data.append('stem', user.stem);

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
				method: 'POST',
				body: data,
			});

			if (!res.ok) {
				const { error } = await res.json();
				setError(error);
				throw new Error(await res.text());
			}

			router.push('/profile');
		} catch (error) {
			setError(error);
		}
	};

	return (
		<main style={{ padding: '8px' }}>
			<Header title='Post A Picture' />.<h1 style={{ margin: '20px 0' }}>Post An Image</h1>
			<hr />
			<form onSubmit={handleSubmit} className={styles.post_form}>
				<div
					className={`${styles.post} ${!photo ? '' : styles.flex_center}`}
					style={{ border: 'dotted' }}
				>
					{imagePreview ? (
						<Image
							layout='fill'
							objectFit='contain'
							src={imagePreview}
							alt='Post Preview'
						/>
					) : error === '' ? (
						<p style={{ fontSize: '14pt', textAlign: 'center' }}>Post Picture</p>
					) : (
						<p className={styles.error}>{error}</p>
					)}
				</div>
				<div className={styles.flex_col_center}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
							marginBottom: '16px',
						}}
					>
						<label
							htmlFor='imgInput'
							className={`${styles.edit_save} ${styles.edit_options_buttons}`}
						>
							Upload Photo
						</label>
						<button
							type='button'
							onClick={onCancelFile}
							className={`${styles.edit_delete_button} ${
								isBusy ? styles.edit_busy : ''
							}`}
							disabled={isBusy}
						>
							Delete Photo
						</button>
						<input
							id='imgInput'
							type='file'
							accept='image/*'
							style={{ display: 'none' }}
							onChange={onFileUploadChange}
						/>
					</div>
					<div style={{ display: 'flex', gap: '16px' }}>
						<Link
							className={[styles.edit_options_buttons, styles.edit_cancel].join(' ')}
							onClick={() => setError('')}
							href='/profile'
						>
							Cancel
						</Link>
						<button
							type='submit'
							className={[styles.edit_options_buttons, styles.edit_save].join(' ')}
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</main>
	);
};

export default PostImage;
