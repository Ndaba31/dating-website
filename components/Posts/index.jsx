import React from 'react';
import PostDetail from './PostDetail';
import styles from '@/styles/Profile.module.css';

const Posts = ({ posts }) => {
	console.log(posts);
	return (
		<div className={styles.posts} style={{ justifyItems: 'center' }}>
			{posts.map(({ posts }, i) => (
				<PostDetail key={i} post={posts} />
			))}
		</div>
	);
};

export default Posts;
