import { AddCircle, Cancel, DeleteForever } from '@mui/icons-material';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import styles from '@/styles/Profile.module.css';
import { useDateContext } from '@/context/dateContext';
import { ethinicities, regions, relationship_status, religions, sexes, social_media } from '@/data';
import Header from '@/components/Head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditProfile = () => {
	const {
		user,
		setHobbies,
		hobbies,
		occupations,
		setOccupations,
		location,
		socials,
		isBusy,
		setIsBusy,
		setSuccess,
		setError,
	} = useDateContext();

	const router = useRouter();
	const [hob, setHob] = useState('');
	const [occ, setOcc] = useState({
		title: '',
		company: '',
		salary_min: 0,
		salary_max: 0,
	});
	const [photo, setPhoto] = useState(user.profile_photo);
	const [imagePreview, setImagePreview] = useState(null);
	const [poppedOccupations, setPoppedOccupations] = useState([]);
	const [poppedHobbies, setPoppedHobbies] = useState([]);

	const birthday = user.dob !== undefined && user.dob !== null ? new Date(user.dob) : '';

	if (birthday !== '') {
		birthday.setDate(birthday.getDate() + 1);
	}

	const [formData, setFormData] = useState({
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
		stem: user.stem,
		bio: user.bio,
		sex: user.sex,
		dob: birthday === '' ? '' : birthday.toISOString().substring(0, 10),
		region:
			location !== undefined ? (location.region === undefined ? '' : location.region) : '',
		city: location !== undefined ? (location.city === undefined ? '' : location.city) : '',
		nickName: user.nick_name,
		phone: user.phone,
		ethnicity: user.ethnicity,
		religion: user.religion,
		relationship_status: user.relationship_status,
	});

	const [socialMedia, setSocialMedia] = useState({
		whatsapp:
			socials.length !== 0
				? socials.find(({ social }) => social.toLowerCase() === 'whatsapp').contact
				: '',
		instagram:
			socials.length !== 0
				? socials.find(({ social }) => social.toLowerCase() === 'instagram').contact
				: '',
		facebook:
			socials.length !== 0
				? socials.find(({ social }) => social.toLowerCase() === 'facebook').contact
				: '',
		twitter:
			socials.length !== 0
				? socials.find(({ social }) => social.toLowerCase() === 'twitter').contact
				: '',
	});

	const handleSocialChange = (event) => {
		const { name, value } = event.target;
		setSocialMedia((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

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
		const hobs = hobbies.filter((interest) => interest.hobby !== hobby);
		const popped_hobs = hobbies.find((interest) => interest.hobby === hobby);

		setHobbies(hobs);
		setPoppedHobbies((state) => [...state, popped_hobs]);
	};

	const pushHobbies = () => {
		const hobs = hobbies;

		const check = hobs.filter(({ hobby }) => hobby === hob);

		if (check.length === 0) {
			hobs.push({ hobby: hob });
		}

		setHob('');
		setHobbies(hobs);
	};

	const pushOccupation = () => {
		const occupation = occupations;

		const check = occupation.filter(
			({ company, title }) =>
				company.toLowerCase() === occ.company.toLowerCase() &&
				title.toLowerCase() === occ.title.toLowerCase()
		);

		if (check.length === 0 && occ.title !== '') {
			occupation.push(occ);
		}

		setOcc({ company: '', title: '', salary_max: 0, salary_min: 0 });
		setOccupations(occupation);
	};

	const popOccupation = (job) => {
		const poppedJob = occupations.find(
			(work) => work.company === job.company && work.title === job.title
		);
		setPoppedOccupations((state) => [...state, poppedJob]);

		const occupation = occupations.filter(
			(work) => work.company !== job.company && work.title !== job.title
		);
		setOccupations(occupation);
	};

	setIsBusy(photo ? false : true);

	const onFileUploadChange = (e) => {
		const selectedFile = e.target.files[0];
		setPhoto(selectedFile);

		// Generate a preview of the selected image
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setImagePreview(null);
		}
	};

	const onCancelFile = () => {
		setPhoto(null);
		setImagePreview(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const data = new FormData();

			data.append('user', JSON.stringify(formData));
			data.append('socials', JSON.stringify(socialMedia));
			data.append('occupations', JSON.stringify(occupations));
			data.append('poppedOccupations', JSON.stringify(poppedOccupations));
			data.append('hobbies', JSON.stringify(hobbies));
			data.append('poppedHobbies', JSON.stringify(poppedHobbies));
			data.append('stem', user.stem);

			photo !== user.profile_photo
				? data.append('file', photo)
				: data.append('temp_photo', photo);

			user.profile_photo
				? data.append('profile_photo', user.profile_photo)
				: data.append('profile_photo', null);

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
				method: 'POST',
				body: data,
			});

			if (!res.ok) {
				const { error } = await res.json();
				setError(error);
				throw new Error(await res.text());
			} else {
				const { message } = await res.json();
				setSuccess(message);
			}

			router.replace('/profile');
		} catch (error) {
			setError(error);
		}
	};

	for (let i = 0; i < social_media.length; i++) {
		for (let j = 0; j < socials.length; j++) {
			if (socials[j].social === social_media[i].social.toLowerCase())
				social_media[i].link = socials[j].contact;
		}
	}

	const today = new Date().toISOString().split('T')[0];

	return (
		<main className={styles.edit_container}>
			<Header title='Edit Profile' />
			<h1 style={{ margin: '20px 0' }}>Edit Profile</h1>
			<hr />
			<form onSubmit={handleSubmit} className={styles.edit_form}>
				<div className={styles.edit_left}>
					<h3 style={{ margin: '8px 0' }}>Profile</h3>
					<div className={styles.edit_img_container}>
						{imagePreview ? (
							<Image
								src={imagePreview}
								layout='fill'
								objectFit='contain'
								alt='Profile Photo Preview'
								priority
							/>
						) : photo ? (
							<Image
								layout='fill'
								objectFit='contain'
								src={'/' + photo}
								alt={user.profile_photo}
								priority
							/>
						) : (
							<Image
								layout='fill'
								objectFit='contain'
								src='/no_photo.png'
								alt='No Photo'
								priority
							/>
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
							className={`${styles.edit_delete_button} ${
								isBusy ? styles.edit_busy : ''
							}`}
							disabled={isBusy}
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
								type='submit'
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
								className={styles.edit_text_input}
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label htmlFor='lastName'>Last Name</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								className={styles.edit_text_input}
								value={formData.lastName}
								onChange={handleChange}
								required
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
								className={styles.edit_text_input}
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label htmlFor='stem'>Stem</label>
							<input
								type='text'
								id='stem'
								name='stem'
								className={styles.edit_text_input}
								value={formData.stem}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div>
						<h1 className={styles.edit_heading}>About</h1>
						<textarea
							className={styles.edit_textarea}
							name='bio'
							id='bio'
							value={formData.bio}
							onChange={handleChange}
						></textarea>
					</div>
					<div className={styles.edit_input_container}>
						<div>
							<label htmlFor='sex'>Sex</label>
							<select
								name='sex'
								id='sex'
								className={styles.edit_text_input}
								onChange={handleChange}
								value={formData.sex}
							>
								<option value='' style={{ backgroundColor: 'transparent' }}>
									Please choose one
								</option>
								{sexes.map(({ gender, value }) => (
									<option
										className={styles.edit_select_opt}
										key={value}
										value={value}
										selected={value === user.sex ? true : false}
									>
										{gender}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor='dob'>Date of birth:</label>
							<input
								type='date'
								id='dob'
								name='dob'
								max={today}
								className={styles.edit_text_input}
								value={formData.dob}
								onChange={handleChange}
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
									value={formData.region}
									onChange={handleChange}
								>
									<option value='' style={{ backgroundColor: 'transparent' }}>
										Please choose one
									</option>
									{regions.map((region) => (
										<option
											className={styles.edit_select_opt}
											key={region}
											selected={region === location.region ? true : false}
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
									className={styles.edit_text_input}
									value={formData.city}
									onChange={handleChange}
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
								onChange={onHobChange}
								value={hob}
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
									className={styles.edit_text_input}
									value={formData.nickName}
									onChange={handleChange}
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
									className={styles.edit_text_input}
									value={formData.phone}
									onChange={handleChange}
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
									value={formData.ethnicity}
									onChange={handleChange}
								>
									<option value='' style={{ backgroundColor: 'transparent' }}>
										Please choose one
									</option>
									{ethinicities.map((ethnicity) => (
										<option
											className={styles.edit_select_opt}
											key={ethnicity}
											value={ethnicity}
											selected={ethnicity === user.ethnicity ? true : false}
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
								value={occ.company}
							/>
							<input
								type='text'
								id='title'
								name='title'
								placeholder='What position?'
								className={styles.edit_text_input}
								onChange={onOccChange}
								value={occ.title}
							/>
							<input
								type='number'
								id='salary_min'
								name='salary_min'
								min={0}
								placeholder='Min income'
								className={styles.edit_text_input}
								onChange={onOccChange}
								value={occ.salary_min}
							/>
							<input
								type='number'
								id='salary_max'
								name='salary_max'
								min={0}
								placeholder='Max income'
								className={styles.edit_text_input}
								onChange={onOccChange}
								value={occ.salary_max}
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
								{occupations.map(
									({ company, title, salary_min, salary_max }, i) => {
										if (title !== '') {
											if (company !== '') {
												return (
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
														{salary_max !== null &&
															salary_max !== 0 &&
															salary_min !== null &&
															salary_min !== 0 && (
																<p>
																	Earning between {salary_min} and{' '}
																	{salary_max}
																</p>
															)}
														<div style={{ textAlign: 'right' }}>
															<Cancel />
														</div>
													</button>
												);
											} else {
												return (
													<button
														type='button'
														key={`${title}`}
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
														{salary_max !== null &&
															salary_min !== null && (
																<p>
																	Earning between {salary_min} and{' '}
																	{salary_max}
																</p>
															)}
														<div style={{ textAlign: 'right' }}>
															<Cancel />
														</div>
													</button>
												);
											}
										}
									}
								)}
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
										value={formData.religion}
										onChange={handleChange}
									>
										<option value='' style={{ backgroundColor: 'transparent' }}>
											Please choose one
										</option>
										{religions.map((religion) => (
											<option
												className={styles.edit_select_opt}
												key={religion}
												value={religion}
												selected={religion === user.religion ? true : false}
											>
												{religion}
											</option>
										))}
									</select>
								</div>
								<div className={styles.edit_general_input_second}>
									<label htmlFor='region'>Relationship Status</label>
									<select
										name='relationship_status'
										id='relationship_status'
										className={styles.edit_text_input}
										value={formData.relationship_status}
										onChange={handleChange}
									>
										<option value='' style={{ backgroundColor: 'transparent' }}>
											Please choose one
										</option>
										{relationship_status.map((relation, i) => (
											<option
												className={styles.edit_select_opt}
												key={relation}
												value={relation}
												selected={
													relation === user.relationship_status
														? true
														: false
												}
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
									<div key={i} className={styles.edit_socials}>
										<label htmlFor={social} style={{ textAlign: 'left' }}>
											{social}{' '}
											{social.toLowerCase() === 'whatsapp'
												? 'Number'
												: 'Link'}
										</label>
										<input
											type='text'
											id={social.toLowerCase()}
											name={social.toLowerCase()}
											onChange={handleSocialChange}
											value={
												social.toLowerCase() === 'whatsapp'
													? socialMedia.whatsapp
													: social.toLowerCase() === 'facebook'
													? socialMedia.facebook
													: social.toLowerCase() === 'instagram'
													? socialMedia.instagram
													: socialMedia.twitter
											}
											className={styles.edit_text_input}
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
									type='submit'
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
