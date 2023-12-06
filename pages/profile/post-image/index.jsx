import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/Profile.module.css';
import Link from 'next/link';
import Header from '@/components/Head';

const PostImage = () => {
	const [post, setPost] = useState('');
	// const router = useRouter();
	return (
		<main style={{ padding: '8px' }}>
			<Header title='Post A Picture' />
			<h1 style={{ margin: '20px 0' }}>Post An Image</h1>
			<hr />
			<form method='post' className={styles.post_form}>
				<div
					className={`${styles.post} ${post !== '' ? '' : styles.flex_center}`}
					style={{ border: 'dotted' }}
				>
					{post !== '' ? (
						<Image width={300} height={400} src={'/' + post} alt={post} />
					) : (
						<p style={{ fontSize: '14pt' }}>Post Picture</p>
					)}
				</div>
				<div className={styles.flex_col_center}>
					<label
						htmlFor='imgInput'
						className={`${styles.edit_save} ${styles.edit_options_buttons}`}
					>
						Upload Photo
					</label>
					<input
						id='imgInput'
						type='file'
						accept='image/*'
						style={{ display: 'none' }}
						// onChange={onFileUploadChange}
					/>
					<Link
						type='button'
						href='/profile'
						className={`${styles.edit_cancel} ${styles.edit_options_buttons}`}
					>
						Back
					</Link>
				</div>
			</form>
		</main>
	);
};

export default PostImage;
