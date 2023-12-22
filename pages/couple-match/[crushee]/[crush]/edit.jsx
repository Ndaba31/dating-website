import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Link from 'next/link';
import Header from '@/components/Head';
import { useDateContext } from '@/context/dateContext';

const Edit = () => {
	const router = useRouter();
	const current_crushee = String(router.query.crushee);
	const current_crush = String(router.query.crush);

	const { isBusy, setIsBusy, setError, error } = useDateContext();
	const [photo, setPhoto] = useState(null);
	const [oldPhoto, setOldPhoto] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	useEffect(() => {
		const getMatch = async () => {
			console.log(current_crushee, current_crush);
			const bioData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: '',
					getMatch: true,
					crushee: current_crushee === undefined ? '' : current_crushee,
					crush: current_crush === undefined ? '' : current_crush,
					newbio: '',
				}),
			};

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/couple`, bioData);
			const { match } = await res.json();
			setPhoto(match.couple_photo);
			setOldPhoto(match.couple_photo);
			setIsBusy(photo ? false : true);
		};

		getMatch();
	}, [current_crushee, current_crush]);

	const onFileUploadChange = (e) => {
		const selectedFile = e.target.files[0];
		setPhoto(selectedFile);
		setIsBusy(false);

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
		setIsBusy(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const data = new FormData();

			photo ? data.append('no_file', 'false') : data.append('no_file', 'true');
			data.append('file', photo);
			data.append('crushee', current_crushee);
			data.append('crush', current_crush);
			data.append('old_photo', oldPhoto);

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/couple_photo`, {
				method: 'POST',
				body: data,
			});

			if (!res.ok) {
				const { error } = await res.json();

				if (error === 'No file uploaded') {
					router.push(`/couple-match/${current_crushee}/${current_crush}`);
					return;
				}

				setError(error);
				throw new Error(await res.text());
			}

			router.push(`/couple-match/${current_crushee}/${current_crush}`);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<main style={{ padding: '8px' }}>
			<Header title='Edit Couple Photo' />
			<h1 style={{ margin: '20px 0' }}>Upload Couple Photo</h1>
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
							alt='Couple Photo Preview'
						/>
					) : photo ? (
						<Image
							layout='fill'
							objectFit='contain'
							src={`/${photo}`}
							alt='Couple Photo'
						/>
					) : (
						<p style={{ fontSize: '14pt', textAlign: 'center' }}>
							No Couple Photo Uploaded
						</p>
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
							href={`/couple-match/${current_crushee}/${current_crush}`}
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

export default Edit;
