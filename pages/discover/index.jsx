import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDateContext } from '@/context/dateContext';
import { SearchIcon } from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Header from '@/components/Head';
import Navbar from '@/components/Navbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { style } from '@mui/system';
import styles from '@/styles/Discover.module.css';
import DiscoverCard from '@/components/Discover/DiscoverCard';
import { Search } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

const Discover = () => {
	const ref = useRef();
	const { data: session } = useSession();
	const [search, setSearch] = useState('');
	const [allDiscoveredUsers, setallDiscoveredUsers] = useState([]);
	const [button, setButton] = useState(
		'',
		'name',
		'age',
		'city',
		'region',
		'hobbies',
		'relationship',
		'ethnicity',
		'religion',
		'job',
		'company'
	);

	const readRefvalue = () => {
		setSearch(ref.current.value);
		console.log(search);
	};
	const { setError, allUsers, error, setUser, setAllUsers } = useDateContext();
	console.log(allUsers);

	console.log(button);
	const handleChange = (event) => {
		setButton(event.target.value);
	};

	const handleClick = (event) => {
		ref.current.value = '';
		if (event.target.value === button) {
			setButton('');
		} else {
			setButton(event.target.value);
		}
	};

	const getAllUsers = async () => {
		setError('');

		const getUsers = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'getDiscover',
				searchString: search,
			}),
		};

		const getUsersby = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: button,
				searchString: search,
			}),
		};

		console.log(button + ' ' + search);
		console.log();

		if (button !== '') {
			const users = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matches`, getUsersby);
			const { discoverAllUsers } = await users.json();
			setAllUsers(discoverAllUsers);

			if (discoverAllUsers.length === 0) {
				setError('No Users Found');
			}
		} else {
			const users = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/matches`, getUsers);
			const { discoverAllUsers } = await users.json();
			setAllUsers(discoverAllUsers);

			if (discoverAllUsers.length === 0) {
				setError('No Users Found');
			}
		}
	};

	useEffect(() => {
		getAllUsers();
	}, [search, button]);

	return (
		<div>
			<Header title='Discover' />
			<Navbar page='discover' />
			<div
				className={styles.discover}
				style={{
					position: 'relative',
					top: '10px',
					height: '45px',
					padding: '60px',
				}}
			></div>
			<h1 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '32px 0' }}>
				Discover potential dates
			</h1>
			<div class='searchbuttons'>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						readRefvalue();
					}}
					className={styles.form}
				>
					<div className={styles.input_container}>
						<input
							type='text'
							placeholder='...Search For Love'
							ref={ref}
							className={styles.text_field}
						/>
						<button type='submit' className={styles.search_button}>
							<Search />
						</button>
					</div>

					<FormControl>
						<FormLabel style={{ color: '#ccc', margin: '10px 0' }}>Search By</FormLabel>
						<RadioGroup
							row
							onChange={handleChange}
							value={button}
							className={styles.radio}
						>
							<FormControlLabel
								value='name'
								control={<Radio onClick={handleClick} />}
								label='Name'
							/>
							<FormControlLabel
								value='age'
								control={<Radio onClick={handleClick} />}
								label='Min Age'
							/>
							<FormControlLabel
								value='city'
								control={<Radio onClick={handleClick} />}
								label='City'
							/>
							<FormControlLabel
								value='region'
								control={<Radio onClick={handleClick} />}
								label='Region'
							/>
							<FormControlLabel
								value='hobbies'
								control={<Radio onClick={handleClick} />}
								label='Hobbies'
							/>
							<FormControlLabel
								value='relationship'
								control={<Radio onClick={handleClick} />}
								label='Relationship Status'
							/>
							<FormControlLabel
								value='ethnicity'
								control={<Radio onClick={handleClick} />}
								label='Ethnicity'
							/>
							<FormControlLabel
								value='religion'
								control={<Radio onClick={handleClick} />}
								label='Religion'
							/>
							<FormControlLabel
								value='job'
								control={<Radio onClick={handleClick} />}
								label='Job Title'
							/>
							<FormControlLabel
								value='company'
								control={<Radio onClick={handleClick} />}
								label='Company'
							/>
						</RadioGroup>
					</FormControl>
				</form>
			</div>

			{error === '' ? (
				session ? (
					allUsers
						.filter(({ email }) => email !== session.user.email)
						.map(({ stem }) => <DiscoverCard key={stem} id={stem} />)
				) : (
					allUsers.map(({ stem }) => <DiscoverCard key={stem} id={stem} />)
				)
			) : (
				<h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{error}</h1>
			)}
		</div>
	);
};

export default Discover;
