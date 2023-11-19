import { useDateContext } from '@/context/dateContext';
import styles from '../../styles/Signup.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Head';

const Login = () => {
	const { setUser, setIsAuth, error, setError, isBusy, setIsBusy, setSuccess } = useDateContext();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const submitInfo = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		const { email, password } = formData;

		if (error !== '') {
			return;
		} else {
			const postData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};

			setIsBusy(true);

			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, postData);
				const { user, message } = await res.json();

				if (message === `Welcome back ${user.firstName}`) {
					setSuccess(message);
					setUser(user);
					setIsAuth(true);
					router.replace('/');
				} else {
					setError(message);
				}

				console.log(user, message);
			} catch (error) {
				setError(error);
			}

			setIsBusy(false);
		}
	};

	return (
		<>
			<Header title='Login' description='Login to say hi to the streets' />
			<div className={styles.container}>
				{/* Left Half with Next Image */}
				<div className={styles.left_half}>
					<Image
						src='/lady.webp'
						alt='Left Image'
						width={500}
						height={500}
						layout='responsive'
					/>
				</div>

				{/* Right Half with Content */}
				<div className={styles.right_half}>
					<div className={styles.heading}>
						Welcome back to Pumpkin. Where true love meets fortune.
					</div>
					{error !== '' && <p className={styles.error}>{error}</p>}

					{/* Form Container */}
					<form onSubmit={submitInfo} className={styles.form_container}>
						{/* Input Fields */}
						<input
							type='email'
							name='email'
							required
							onChange={handleChange}
							value={formData.email}
							className={styles.form_input}
							placeholder='Email'
						/>
						<div className={styles.pass_container}>
							<input
								type='password'
								name='password'
								required
								onChange={handleChange}
								value={formData.password}
								className={styles.form_input}
								placeholder='Password'
							/>
						</div>

						<div className={styles.links_container}>
							<Link className={styles.link} href='/signup'>
								Don&apos;t have an account? Sign Up
							</Link>
							<Link className={styles.link} href='/'>
								Back to home page
							</Link>
						</div>

						{/* Submit Button */}
						<button
							className={`${styles.form_button} ${isBusy ? styles.busy : ''}`}
							disabled={isBusy}
							type='submit'
						>
							Login
						</button>
					</form>
				</div>

				{/* Circular Image at the Top Center */}
				<div className={styles.circular_image}>
					<Image
						src='/pumpkin.png'
						alt='Circular Image'
						width={100}
						height={100}
						layout='responsive'
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
