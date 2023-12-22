import Header from '@/components/Head';
import Questions from '@/components/Questions';
import { useDateContext } from '@/context/dateContext';
import { ethinicities, questions, regions, relationship_status, religions, sexes } from '@/data';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Ask = () => {
	const router = useRouter();
	const count = Number(router.query.count);
	const { user, setIsBusy } = useDateContext();

	const [nickName, setNickName] = useState('');
	const [age, setAge] = useState(0);
	const [occupation, setOccupation] = useState({ title: '', company: '' });
	const [city, setCity] = useState('');
	const [region, setRegion] = useState('');
	const [bio, setBio] = useState('');
	const [hobbies, setHobbies] = useState([]);
	const [phone, setPhone] = useState(0);
	const [sex, setSex] = useState('');
	const [ethnicity, setEthnicity] = useState('');
	const [relationshipStatus, setRelationshipStatus] = useState('');
	const [religion, setReligion] = useState('');

	const submitInfo = async (e) => {
		e.preventDefault();

		setIsBusy(true);

		const putData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nickName: nickName,
				dob: age,
				occupation: occupation,
				city: city,
				region: region,
				bio: bio,
				hobbies: hobbies,
				phone: phone,
				sex: sex,
				ethnicity: ethnicity,
				relationshipStatus: relationshipStatus,
				religion: religion,
			}),
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user.stem}`, putData);
		const { message } = res.json();
		console.log(message);

		setIsBusy(false);
		router.push('/login');
	};

	return (
		<main
			style={{
				display: 'flex',
				minHeight: '100vhs',
				alignItems: 'center',
				paddingTop: '100px',
			}}
		>
			<Header title='Details' description='Gather more data on users' />
			{questions
				.filter(({ id }) => id === count)
				.map(({ id, question, type, inpName }) => {
					if (id === 1) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setNickName}
								value={nickName}
							/>
						);
					} else if (id === 2) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setAge}
								value={age}
							/>
						);
					} else if (id === 3) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setOccupation}
								value={occupation}
							/>
						);
					} else if (id === 4) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setCity}
								value={city}
							/>
						);
					} else if (id === 5) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setRegion}
								value={region}
								options={regions}
							/>
						);
					} else if (id === 6) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setBio}
								value={bio}
							/>
						);
					} else if (id === 7) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setHobbies}
								value={hobbies}
							/>
						);
					} else if (id === 8) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setPhone}
								value={phone}
							/>
						);
					} else if (id === 9) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setSex}
								value={sex}
								options={sexes}
							/>
						);
					} else if (id === 10) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setEthnicity}
								value={ethnicity}
								options={ethinicities}
							/>
						);
					} else if (id === 11) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setRelationshipStatus}
								value={relationshipStatus}
								options={relationship_status}
							/>
						);
					} else if (id === 12) {
						return (
							<Questions
								key={id}
								count={count}
								total={questions.length}
								question={question}
								type={type}
								inpName={inpName}
								setFunction={setReligion}
								value={religion}
								options={religions}
								handleSubmit={submitInfo}
							/>
						);
					}
				})}
		</main>
	);
};

export default Ask;
