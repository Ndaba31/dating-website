import React from 'react';
import PostDetail from './PostDetail';
import Link from 'next/link';
import styles from '@/styles/Profile.module.css';
import { useDateContext } from '@/context/dateContext';
import { useRouter } from 'next/router';

const Posts = ({ posts, isUser }) => {
	const { user } = useDateContext();
	const router = useRouter();
	const pk = isUser ? user.stem : router.query.stem;
	console.log(posts);

	return (
		<div className={styles.posts} style={{ justifyItems: 'center' }}>
			{posts.map(({ posts, id }) =>
				isUser ? (
					<Link href={`/profile/${pk}/${id}`}>
						<PostDetail key={id} post={posts} />
					</Link>
				) : (
					<PostDetail key={id} post={posts} />
				)
			)}
		</div>
	);
};

export default Posts;
