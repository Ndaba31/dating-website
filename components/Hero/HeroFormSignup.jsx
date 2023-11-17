import React from 'react';
import styles from './Hero.module.css'; // Import the external CSS file

const HeroFormSignup = () => {
	return (
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
	);
};

export default HeroFormSignup;
