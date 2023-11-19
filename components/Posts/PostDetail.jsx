import React from 'react';
import Image from 'next/image';

const PostDetail = ({ post }) => {
	return (
		<div style={{ marginBottom: '16px', marginTop: '16px', height: '450px', width: '400px' }}>
			<Image
				objectFit='contain'
				width={400}
				height={450}
				src={'/' + post}
				alt={post}
				// style={{ borderRadius: '28px' }}
			/>
		</div>
	);
};

export default PostDetail;
