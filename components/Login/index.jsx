import React from 'react';
import Header from '../Head';
import Link from 'next/link';

const LoginUser = ({ title }) => {
	return (
		<>
			<Header title={title} />
			<p style={{ fontSize: '14pt', textAlign: 'center' }}>
				You need to go back to the homepage and login to view this page --{' '}
				<Link href='/' style={{ color: '#ccc' }}>
					Take me home
				</Link>
			</p>
		</>
	);
};

export default LoginUser;
