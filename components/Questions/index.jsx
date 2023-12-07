import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/Signup.module.css';
import { useDateContext } from '@/context/dateContext';
import { AddCircle } from '@mui/icons-material';

const Questions = ({
	count,
	total,
	question,
	options,
	type,
	inpName,
	setFunction,
	value,
	handleSubmit,
}) => {
	const { isBusy } = useDateContext();
	const router = useRouter();

	const [hobby, setHobby] = useState('');

	const nickNameChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const ageChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const occupationChange = (e) => {
		const { name, value } = e.target;
		setFunction((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const cityChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const regionChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const bioChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const pushHobbies = (hobby) => {
		hobby !== '' ? value.push(hobby) : setHobby('');
		setHobby('');
		console.log(value);
	};

	const phoneChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const sexChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const ethnicityChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const relationChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	const religionChange = (e) => {
		setFunction(e.target.value);
		console.log(value);
	};

	if (inpName === 'age') {
		inpName.max = new Date().toISOString().split('T')[0];
	}

	return (
		<div className={styles.question_container}>
			<div
				className={styles.question_navigators}
				style={{ justifyContent: count === 1 ? 'flex-end' : 'space-between' }}
			>
				{count !== 1 && (
					<button
						type='button'
						onClick={() => {
							count - 1;
							router.back();
						}}
						className={styles.back}
						style={{ backgroundColor: 'transparent', border: '0' }}
					>
						<FontAwesomeIcon
							icon={faCircleLeft}
							style={{ transform: 'scale(3)', color: '#ccc' }}
						/>
					</button>
				)}
				{count < total ? (
					<Link href={`${count + 1}`} className={styles.skip}>
						Skip
					</Link>
				) : (
					<Link href='/' className={styles.skip}>
						Skip
					</Link>
				)}
			</div>
			<h1 style={{ marginTop: '40px', textAlign: 'center' }}>{question}</h1>
			<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
				{type === 'nickname' && (
					<>
						<input
							type='text'
							id={inpName}
							name={inpName}
							className={styles.question_input}
							onChange={nickNameChange}
							value={value}
						/>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'age' && (
					<>
						<input
							type='date'
							id={inpName}
							name={inpName}
							className={styles.question_input}
							onChange={ageChange}
							value={value}
						/>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'occupation' && (
					<>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Position in company'
							className={styles.question_input}
							onChange={occupationChange}
							value={value.title}
						/>
						<input
							type='text'
							id='company'
							name='company'
							placeholder='Company you work in'
							className={styles.question_input}
							onChange={occupationChange}
							value={value.company}
						/>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'city' && (
					<>
						<input
							type='text'
							id={inpName}
							name={inpName}
							className={styles.question_input}
							onChange={cityChange}
							value={value}
						/>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'region' && (
					<>
						<select
							name={inpName}
							id={inpName}
							onChange={regionChange}
							className={styles.question_input}
							style={{ color: 'black' }}
						>
							<option value=''>Choose Region</option>
							{options.map((option, i) => (
								<option key={i} value={option}>
									{option}
								</option>
							))}
						</select>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'bio' && (
					<>
						<textarea
							onChange={bioChange}
							name={inpName}
							id={inpName}
							className={styles.question_input}
							rows={10}
							style={{ width: '90%', border: '2px solid #ccc', borderRadius: '10px' }}
						></textarea>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'hobby' && (
					<>
						<div style={{ display: 'flex' }}>
							<input
								onChange={(e) => setHobby(e.target.value)}
								type='text'
								className={styles.question_input}
								name={inpName}
								id={inpName}
								value={hobby}
							/>
							<button
								style={{ backgroundColor: 'transparent', border: '0' }}
								type='button'
								onClick={() => pushHobbies(hobby)}
							>
								<AddCircle />
							</button>
						</div>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
						{value.map((hob, i) => (
							<p key={i}>{hob}</p>
						))}
					</>
				)}
				{type === 'phone' && (
					<>
						<input
							type='number'
							id={inpName}
							name={inpName}
							className={styles.question_input}
							onChange={phoneChange}
							min={0}
							value={value}
						/>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'sex' && (
					<>
						<select
							name={inpName}
							id={inpName}
							onChange={sexChange}
							className={styles.question_input}
							style={{ color: 'black' }}
						>
							<option value=''>Choose Sex</option>
							{options.map(({ gender, value }, i) => (
								<option key={i} value={value}>
									{gender}
								</option>
							))}
						</select>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'ethnicity' && (
					<>
						<select
							name={inpName}
							id={inpName}
							onChange={ethnicityChange}
							className={styles.question_input}
							style={{ color: 'black' }}
						>
							<option value=''>Choose Ethnicity</option>
							{options.map((option, i) => (
								<option key={i} value={option}>
									{option}
								</option>
							))}
						</select>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'relationship' && (
					<>
						<select
							name={inpName}
							id={inpName}
							onChange={relationChange}
							className={styles.question_input}
							style={{ color: 'black' }}
						>
							<option value=''>Choose Status</option>
							{options.map((option, i) => (
								<option key={i} value={option}>
									{option}
								</option>
							))}
						</select>
						<button
							type='button'
							onClick={() =>
								count < total ? router.push(`${count + 1}`) : router.replace('/')
							}
							className={styles.question_button}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
				{type === 'religion' && (
					<>
						<select
							name={inpName}
							id={inpName}
							onChange={religionChange}
							className={styles.question_input}
							style={{ color: 'black' }}
						>
							<option value=''>Choose Religion</option>
							{options.map((option, i) => (
								<option key={i} value={option}>
									{option}
								</option>
							))}
						</select>
						<button
							type={count === total ? 'submit' : 'button'}
							disabled={isBusy}
							className={`${styles.question_button} ${isBusy ? styles.busy : ''}`}
						>
							{count === total ? 'Finish' : 'Continue'}
						</button>
					</>
				)}
			</form>
		</div>
	);
};

export default Questions;
