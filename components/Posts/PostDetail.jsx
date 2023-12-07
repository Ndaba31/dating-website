import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Profile.module.css';

const PostDetail = ({ post }) => {
	return (
		<div
			className={styles.images}
			style={{ marginBottom: '16px', marginTop: '16px', height: '450px' }}
		>
			<Image
				objectFit='contain'
				width={300}
				height={450}
				src={'/' + post}
				alt={post}
				style={{ width: 'auto', height: 'auto' }}
			/>
		</div>
	);
};

export default PostDetail;
