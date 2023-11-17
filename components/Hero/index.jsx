import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '@/styles/Hero.module.css'; // Import the external CSS file
import { useDateContext } from '@/context/dateContext';
import { useRouter } from 'next/router';

const Hero = ({ img, altImg, btnText, btnType, heading, subHeading, reverse, link }) => {
	const [password2, setPassword2] = useState('');
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		stem: '',
		password: '',
		dateJoined: new Date(),
	});

	const [loginFormData, setLoginFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		stem: '',
		password: '',
		dateJoined: new Date(),
	});

	const { setUser, setIsAuth, error, setError, isBusy, setIsBusy } = useDateContext();
	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const submitInfo = async (e) => {
		e.preventDefault();
		setError('');
		const { firstName, lastName, email, stem, password } = formData;
		let stem_edited = stem.trim().replace(' ', '_');

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
			console.log({
				stem: stem_edited,
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			});

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
				setIsBusy(false);
			} catch (error) {
				setError(error);
			}
		}

		//TO WORK ON AFTER SIGNUP
		const handleLoginChange = (event) => {
			const { name, value } = event.target;
			setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
		};

		const submitLogin = (e) => {
			e.preventDefault();
			console.log(loginFormData);
			const person = users.find(({ user }) => user.email === loginFormData.email);

			if (person !== undefined) {
				setUser(person.user);
				setUserExtended(person);
				setIsAuth(true);
				router.push('/discover');
			}
		};
		//END OF WORK AFTER SIGNUP

		return (
			<div
				className={`bg-gradient-to-r from-[#200B33] via-[#19171C] to=[#19276B] min-h-screen flex flex-col-reverse items-center w-full ${
					reverse ? 'md:flex-row-reverse' : 'md:flex-row'
				}`}
			>
				<div
					className={`w-full bg-opacity-70 p-8 text-center ${
						btnType === 'submit' || btnType === 'login' ? 'md:1/2' : 'md:w-[40%]'
					}`}
				>
					<h1 className='text-4xl text-white font-bold'>{heading}</h1>
					<p className='text-lg text-white font-cursive mb-4'>{subHeading}</p>
					{btnType === 'link' && (
						<Link
							href={link === undefined ? 'signup' : link}
							className='bg-[#A238FF] text-white py-2 px-4 rounded-lg'
						>
							{btnText}
						</Link>
					)}
					{btnType === 'submit' && (
						<form onSubmit={submitInfo} method='post' className={styles.form}>
							<div
								className={`flex justify-between items-center w-full flex-col md:flex-row my-6 ${styles.spaceX2}`}
							>
								<div className={`flex flex-col ${styles.wFull}`}>
									<label htmlFor='firstName' className={styles.textLeft}>
										First Name
									</label>
									<input
										type='text'
										id='firstName'
										required
										name='firstName'
										className={styles.input}
										value={formData.firstName}
										onChange={handleChange}
									/>
								</div>
								<div className={`flex flex-col mt-4 md:mt-0 ${styles.wFull}`}>
									<label htmlFor='lastName' className={styles.textLeft}>
										Last Name
									</label>
									<input
										type='text'
										id='lastName'
										required
										name='lastName'
										className={styles.input}
										value={formData.lastName}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div
								className={`flex justify-between items-center w-full flex-col md:flex-row my-6 ${styles.spaceX2}`}
							>
								<div className={`flex flex-col ${styles.wFull}`}>
									<label htmlFor='email' className={styles.textLeft}>
										Email
									</label>
									<input
										type='email'
										id='email'
										name='email'
										required
										className={styles.input}
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								<div className={`flex flex-col mt-4 md:mt-0 ${styles.wFull}`}>
									<label htmlFor='stem' className={styles.textLeft}>
										Stem
									</label>
									<input
										type='text'
										id='stem'
										name='stem'
										required
										className={styles.input}
										placeholder='Your username/handle'
										value={formData.stem}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div
								className={`flex justify-between items-center w-full flex-col md:flex-row my-6 ${styles.spaceX2}`}
							>
								<div className={`flex flex-col ${styles.wFull}`}>
									<label htmlFor='password' className={styles.textLeft}>
										Password
									</label>
									<input
										type='password'
										id='password'
										required
										name='password'
										className={styles.input}
										value={formData.password}
										onChange={handleChange}
									/>
								</div>
								<div className={`flex flex-col mt-4 md:mt-0 ${styles.wFull}`}>
									<label htmlFor='password2' className={styles.textLeft}>
										Confirm Password
									</label>
									<input
										type='password'
										id='password2'
										required
										name='password2'
										className={styles.input}
										value={password2}
										onChange={(e) => setPassword2(e.target.value)}
									/>
								</div>
							</div>
							{error !== '' && (
								<p
									className={`text-md rounded-md ${styles.bgRed700} ${styles.capitalize} ${styles.my4}`}
								>
									{error}
								</p>
							)}
							<button
								type='submit'
								disabled={isBusy}
								className={`bg-[#A238FF] text-white ${styles.py2} ${styles.px4} ${
									styles.roundedLg
								} ${isBusy ? styles.opacity70 : ''}`}
							>
								Submit
							</button>
						</form>
					)}
					{btnType === 'login' && (
						<form
							onSubmit={submitLogin}
							className={`items-center flex flex-col ${styles.form}`}
							method='post'
						>
							{/* ... (rest of the form code) */}
						</form>
					)}
				</div>
				<div className={`w-full ${btnType === 'submit' ? 'md:1/2' : 'md:w-[60%]'}`}>
					<Image
						src={img}
						width={500}
						height={500}
						quality={100}
						priority
						alt={altImg}
						className='w-full h-full shadow-l-xl image-blurred-edge-inset'
					/>
				</div>
			</div>
		);
	};
};

export default Hero;
