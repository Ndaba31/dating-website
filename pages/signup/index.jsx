import { useDateContext } from '@/context/dateContext';
import styles from '../../styles/Signup.module.css';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Head';

const Signup = () => {
	const { setUser, setIsAuth, error, setError, isBusy, setIsBusy, setSuccess } = useDateContext();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		stem: '',
		password: '',
		dateJoined: new Date(),
	});

	setError('');

	const [password2, setPassword2] = useState('');

	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const submitInfo = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		const { firstName, lastName, email, stem, password } = formData;
		let stem_edited = stem.trim().split(' ').join('_');

		// Password Error handling
		setError(
			password.length < 8
				? 'password must be longer than 8 characters'
				: password !== password2
				? 'passwords do not match'
				: ''
		);

		if (error !== '') {
			return;
		} else {
			const postData = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					stem: stem_edited,
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				}),
			};

			setIsBusy(true);

			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, postData);
				const { user, message } = await res.json();

				if (message === 'Account created successfully') {
					setSuccess(message);
					setUser(user);
					setIsAuth(true);
					router.replace('/details-questionnaire/1');
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
			<Header title='Sign Up' description='Create an account to meet your forever yena!' />
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
					<h1 /*className={styles.heading}*/>Welcome to Pumpkin</h1>
					<h3>Where true love meets fortune.</h3>
					{error !== '' && <p className={styles.error}>{error}</p>}

					{/* Form Container */}
					<form onSubmit={submitInfo} className={styles.form_container}>
						{/* Input Fields */}
						<input
							type='text'
							name='firstName'
							required
							onChange={handleChange}
							value={formData.firstName}
							className={styles.form_input}
							placeholder='First Name'
						/>
						<input
							type='text'
							name='lastName'
							required
							onChange={handleChange}
							value={formData.lastName}
							className={styles.form_input}
							placeholder='Last Name'
						/>
						<input
							type='email'
							name='email'
							required
							onChange={handleChange}
							value={formData.email}
							className={styles.form_input}
							placeholder='Email'
						/>
						<input
							type='text'
							name='stem'
							required
							onChange={handleChange}
							value={formData.stem}
							className={styles.form_input}
							placeholder='Stem (Username)'
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
							<input
								type='password'
								name='password2'
								required
								onChange={(e) => setPassword2(e.target.value)}
								value={password2}
								className={styles.form_input}
								placeholder='Confirm Password'
							/>
						</div>

						<div className={styles.links_container}>
							<Link className={styles.link} href='/login'>
								Already have an account? Login
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
							Sign Up
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

export default Signup;
