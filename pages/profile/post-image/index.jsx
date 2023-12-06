import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const PostImage = () => {
	const [post, setPost] = useState('');
	const router = useRouter();
	return (
		<main className='p-2'>
			<h4 className='my-2'>Post An Image</h4>
			<hr />
			<form method='post' className='flex flex-col justify-center items-center my-4'>
				<div
					className={`border-2 rounded-xl mb-4 w-[300px] md:w-[400px] h-[400px] ${
						post ? '' : 'flex justify-center items-center'
					}`}
					style={{ border: 'dotted' }}
				>
					{post ? (
						<Image width={300} height={400} src={'/' + post} alt={post} />
					) : (
						<p className='text-lg'>Post Picture</p>
					)}
				</div>
				<div className='flex flex-col items-center'>
					<label
						htmlFor='imgInput'
						className='bg-[#A238FF] cursor-pointer text-white py-2 px-8 rounded-lg my-1'
					>
						Upload Photo
					</label>
					<input
						id='imgInput'
						type='file'
						accept='image/*'
						className='hidden'
						// onChange={onFileUploadChange}
					/>
					<button
						type='button'
						onClick={() => router.back()}
						className='border-[#A238FF] border-2 text-white py-2 px-16 rounded-lg my-1'
					>
						Back
					</button>
				</div>
			</form>
		</main>
	);
};

export default PostImage;
