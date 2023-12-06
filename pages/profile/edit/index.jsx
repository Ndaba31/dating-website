import { AddCircle, Cancel, DeleteForever } from '@mui/icons-material';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@/styles/Profile.module.css';
import { useDateContext } from '@/context/dateContext';
import { ethinicities, regions, relationship_status, religions, sexes, social_media } from '@/data';
import Header from '@/components/Head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditProfile = () => {
	const { user, setUser, setHobbies, hobbies, occupations, setOccupations, error, setError } =
		useDateContext();

	const [hob, setHob] = useState('');
	const [occ, setOcc] = useState();
	const [photo, setPhoto] = useState(null);

	const router = useRouter();

	const separator = '/';
	// const birthday =
	// 	user.dob !== undefined && user.dob !== null
	// 		? `${user.dob.getFullYear()}${separator}${
	// 				user.dob.getMonth() + 1 < 10
	// 					? `0${user.dob.getMonth() + 1}`
	// 					: `${user.dob.getMonth() + 1}`
	// 		  }${separator}${
	// 				user.dob.getDate() < 10 ? `0${user.dob.getDate()}` : `${user.dob.getDate()}`
	// 		  }`
	// 		: '';
	// setPhoto(userExtended.profile_photo?.media || null)

	const birthday = '';
	const onHobChange = (e) => {
		setHob(e.target.value);
	};

	const onOccChange = (e) => {
		const { name, value } = e.target;
		setOcc((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const popHobbies = (hobby) => {
		const hobs = hobbies.filter((interest) => interest !== hobby);

		console.log(`Temp Hobbies (POP): ${hobs}`);
		setHobbies(hobs);
	};

	const pushHobbies = (hobby) => {
		const hobs = hobbies;
		hobs.push({ hobby: hobby });
		console.log(`Temp Hobbies (PUSH): ${hobs}`);

		setHobbies(hobs);
	};

	const pushOccupation = () => {
		const occupation = occupations;
		occupation.push(occ);
		setOccupations(occupation);
	};

	const popOccupation = (job) => {
		const occupation = occupations.filter(
			(work) => work.company !== job.company && work.title !== job.title
		);
		setOccupations(occupation);
	};

	const onFileUploadChange = (e) => {
		console.log('From onFileUploadChange');
	};

	const onCancelFile = (e) => {
		e.preventDefault();
		console.log('From onCancelFile');
	};

	const onUploadFile = (e) => {
		e.preventDefault();
		console.log('From onUploadFile');
	};

	console.log(user);

	return (
		<main className={styles.edit_container}>
			<Header title='Edit Profile' />
			<h1 style={{ margin: '20px 0' }}>Edit Profile</h1>
			<hr />
			<form method='post' className={styles.edit_form}>
				<div className={styles.edit_left}>
					<h3 style={{ margin: '8px 0' }}>Profile</h3>
					<div className={styles.edit_img_container}>
						{user.profile_photo ? (
							<Image
								width={150}
								height={150}
								src={'/' + user.profile_photo}
								alt={user.profile_photo}
							/>
						) : (
							<Image width={150} height={150} src='/no_photo.png' alt='No Photo' />
						)}
					</div>
					<div className={styles.edit_names}>
						<p style={{ fontWeight: 'bold' }}>
							{user.first_name} {user.last_name}
						</p>
						{user.nick_name && (
							<p style={{ fontWeight: 'semi-bold' }}>{user.nick_name}</p>
						)}
						<p style={{ color: 'white' }}>@{user.stem}</p>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<label htmlFor='imgInput' className={styles.edit_upload_button}>
							Upload Photo
						</label>
						<input
							id='imgInput'
							type='file'
							accept='image/*'
							style={{ display: 'none' }}
							onChange={onFileUploadChange}
						/>
						<button
							type='button'
							onClick={onCancelFile}
							className={styles.edit_delete_button}
						>
							Delete Photo
						</button>
					</div>
					{user.bio && (
						<div className={styles.edit_bio}>
							<p className={styles.edit_bio_heading}>Biography</p>
							<p style={{ textAlign: 'center' }}>{user.bio}</p>
						</div>
					)}
				</div>
				<div className={styles.edit_right}>
					<div className={styles.edit_options_container}>
						<h1 className={styles.edit_basic_info}>Basic Info</h1>
						<div className={styles.edit_options}>
							<Link
								className={[styles.edit_options_buttons, styles.edit_cancel].join(
									' '
								)}
								href='/profile'
							>
								Cancel
							</Link>
							<button
								type='button'
								className={[styles.edit_options_buttons, styles.edit_save].join(
									' '
								)}
							>
								Save
							</button>
						</div>
					</div>
					<hr />
					<div className={styles.edit_input_container}>
						<div>
							<label htmlFor='firstName'>First Name</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								placeholder={user.first_name}
								className={
									styles.edit_text_input
								} /*value={formData.firstName} onChange={handleChange}*/
							/>
						</div>
						<div>
							<label htmlFor='lastName'>Last Name</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								placeholder={user.last_name}
								className={
									styles.edit_text_input
								} /*value={formData.lastName} onChange={handleChange}*/
							/>
						</div>
					</div>
					<div className={styles.edit_input_container}>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								name='email'
								placeholder={user.email}
								className={
									styles.edit_text_input
								} /*value={formData.firstName} onChange={handleChange}*/
							/>
						</div>
						<div>
							<label htmlFor='stem'>Stem</label>
							<input
								type='text'
								id='stem'
								name='stem'
								placeholder={user.stem}
								className={
									styles.edit_text_input
								} /*value={formData.lastName} onChange={handleChange}*/
							/>
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>About</h1>
						<textarea
							className={styles.edit_textarea}
							name='bio'
							id='bio'
							// rows={10}
							defaultValue={user.bio}
						></textarea>
					</div>
					<div className={styles.edit_input_container}>
						<div>
							<label htmlFor='sex'>Sex</label>
							<select name='sex' id='sex' className={styles.edit_text_input}>
								<option value='' style={{ backgroundColor: 'transparent' }}>
									Please choose one
								</option>
								{sexes.map(({ gender, value }) => (
									<option
										className={styles.edit_select_opt}
										key={value}
										value={value}
									>
										{gender}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor='dob'>Date of birth: {birthday}</label>
							<input
								type='text'
								id='dob'
								name='dob'
								className={
									styles.edit_text_input
								} /*value={formData.lastName} onChange={handleChange}*/
							/>
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>Location</h1>
						<div className={styles.edit_input_container}>
							<div>
								<label htmlFor='region'>Region</label>
								<select
									name='region'
									id='region'
									className={styles.edit_text_input}
								>
									<option value='' style={{ backgroundColor: 'transparent' }}>
										Please choose one
									</option>
									{regions.map((region) => (
										<option
											className={styles.edit_select_opt}
											key={region}
											value={region}
										>
											{region}
										</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor='city'>Closest City</label>
								<input
									type='text'
									id='city'
									name='city'
									placeholder={user.city}
									className={
										styles.edit_text_input
									} /*value={formData.lastName} onChange={handleChange}*/
								/>
							</div>
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>Hobbies</h1>
						<div className={styles.edit_hobbies_container}>
							<input
								type='text'
								id='hobby'
								name='hobby'
								placeholder='Add a hobby'
								className={styles.edit_text_input}
								onChange={onHobChange} /*value={formData.lastName}*/
							/>
							<button
								type='button'
								className={styles.edit_add_hobby}
								onClick={() => pushHobbies(hob)}
							>
								<AddCircle />
							</button>
						</div>
						<div className={styles.edit_hobbies}>
							{hobbies.map(({ hobby }, i) => (
								<button
									type='button'
									key={i}
									onClick={() => popHobbies(hobby)}
									className={styles.edit_hobby_button}
								>
									<p>{hobby}</p>
									<DeleteForever />
								</button>
							))}
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>More Info</h1>
						<div className={styles.edit_more_info}>
							<div
								className={styles.edit_general_input}
								style={{ display: 'flex', flexDirection: 'column' }}
							>
								<label htmlFor='nickName'>Nick Name</label>
								<input
									type='text'
									id='nickName'
									name='nickName'
									placeholder={user.nick_name}
									className={
										styles.edit_text_input
									} /*value={formData.lastName} onChange={handleChange}*/
								/>
							</div>
							<div
								className={styles.edit_general_input}
								style={{ display: 'flex', flexDirection: 'column' }}
							>
								<label htmlFor='phone'>Phone Number</label>
								<input
									type='number'
									id='phone'
									min={0}
									name='phone'
									placeholder={user.phone}
									className={
										styles.edit_text_input
									} /*value={formData.lastName} onChange={handleChange}*/
								/>
							</div>
							<div
								className={styles.edit_general_input_second}
								style={{ display: 'flex', flexDirection: 'column' }}
							>
								<label htmlFor='ethnicity'>Ethnicity</label>
								<select
									name='ethnicity'
									id='ethnicity'
									className={styles.edit_text_input}
								>
									<option value='' style={{ backgroundColor: 'transparent' }}>
										Please choose one
									</option>
									{ethinicities.map((ethnicity) => (
										<option
											className={styles.edit_select_opt}
											key={ethnicity}
											value={ethnicity}
										>
											{ethnicity}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>Occupation(s)</h1>
						<div className={styles.edit_occupations}>
							<input
								type='text'
								id='company'
								name='company'
								placeholder='What company?'
								className={styles.edit_text_input}
								onChange={onOccChange}
							/>
							<input
								type='text'
								id='title'
								name='title'
								placeholder='What position?'
								className={styles.edit_text_input}
								onChange={onOccChange}
							/>
							<input
								type='text'
								id='salary1'
								name='salary1'
								placeholder='Min income'
								className={styles.edit_text_input}
								onChange={onOccChange}
							/>
							<input
								type='text'
								id='salary2'
								name='salary2'
								placeholder='Max income'
								className={styles.edit_text_input}
								onChange={onOccChange}
							/>
							<button
								type='button'
								onClick={pushOccupation}
								className={styles.edit_occupations_button}
							>
								<p>Add</p>
								<AddCircle />
							</button>
						</div>
						{occupations.length !== 0 && (
							<div className={styles.edit_occupations_display}>
								{occupations.map(({ company, title, salary_min, salary_max }) => (
									<button
										type='button'
										key={`${title} at ${company}`}
										onClick={() =>
											popOccupation({
												company,
												title,
												salary_min,
												salary_max,
											})
										}
										className={styles.edit_pop_occupation}
									>
										<p>{title}</p>
										<p>At {company}</p>
										{salary_max !== null && salary_min !== null && (
											<p>
												Earning between {salary_min} and {salary_max}
											</p>
										)}
										<div style={{ textAlign: 'right' }}>
											<Cancel />
										</div>
									</button>
								))}
							</div>
						)}
						<div>
							<h1 className={styles.edit_heading}>More More Info</h1>
							<div className={styles.edit_input_container}>
								<div className={styles.edit_general_input_second}>
									<label htmlFor='religion'>Religion</label>
									<select
										name='religion'
										id='religion'
										className={styles.edit_text_input}
									>
										<option value='' style={{ backgroundColor: 'transparent' }}>
											Please choose one
										</option>
										{religions.map((religion) => (
											<option
												className={styles.edit_select_opt}
												key={religion}
												value={religion}
											>
												{religion}
											</option>
										))}
									</select>
								</div>
								<div className={styles.edit_general_input_second}>
									<label htmlFor='region'>Relationship Status</label>
									<select
										name='region'
										id='region'
										className={styles.edit_text_input}
									>
										<option value='' style={{ backgroundColor: 'transparent' }}>
											Please choose one
										</option>
										{relationship_status.map((relation, i) => (
											<option
												className={styles.edit_select_opt}
												key={relation}
												value={relation}
											>
												{relation}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div>
							<h1 className={styles.edit_heading}>Social Media</h1>
							<div className={styles.edit_social_container}>
								{social_media.map(({ link, social }, i) => (
									<div key={1} className={styles.edit_socials}>
										<label htmlFor={social} style={{ textAlign: 'left' }}>
											{social}
										</label>
										<input
											type='text'
											id={social}
											name={social}
											placeholder={`${
												link === ''
													? social === 'WhatsApp'
														? 'Add WhatsApp number'
														: 'Add link'
													: link
											}`}
											className={
												styles.edit_text_input
											} /*value={formData.lastName} onChange={handleChange}*/
										/>
									</div>
								))}
							</div>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div
								// className={styles.edit_options}
								style={{ flexDirection: 'row-reverse', gap: '16px' }}
							>
								<Link
									className={[
										styles.edit_options_buttons,
										styles.edit_cancel,
									].join(' ')}
									href='/profile'
								>
									Cancel
								</Link>
								<button
									type='button'
									className={[styles.edit_options_buttons, styles.edit_save].join(
										' '
									)}
									style={{ marginLeft: '8px' }}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</main>
	);
};

export default EditProfile;
