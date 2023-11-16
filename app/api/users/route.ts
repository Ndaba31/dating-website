import { UserDB } from '@/app/interfaces/User';
import { query } from '@/app/lib/db';
import hashPass from '@/app/lib/hash';
import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';

type Data = {
	message: string;
	user: UserDB;
};

interface UserRequest extends NextApiRequest {
	body: {
		email: string;
		stem: string;
		firstName: string;
		lastName: string;
		password: string;
	};
}

export async function GET(req: NextRequest, res: NextResponse) {
	const users = await query({
		query: 'SELECT * FROM users',
		values: [],
	});

	return NextResponse.json({ users: users });
}

export async function POST(req: UserRequest, res: NextResponse) {
	const { stem, firstName, lastName, email, password } = req.body;
	console.log('POST Function reached', req.body.stem);

	const dateJoined = new Date();
	// const hashedPassword = hashPass(password);

	let message;
	let userDB: UserDB = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		stem: '',
		dateJoined: dateJoined,
	};

	const user = await query({
		query: 'SELECT stem FROM users WHERE stem == ?',
		values: [stem],
	});

	console.log('Executed User Query');

	if (user) {
		message = 'User account already exists';
		console.log(' user is true');
	} else {
		const addUsers = await query({
			query: 'INSERT INTO users (stem, first_name, last_name, email, password, date_joined) VALUES (?, ?, ?, ?, ?, ?)',
			values: [stem, firstName, lastName, email, password, dateJoined],
		});

		console.log('Excuted addUser query');

		if (addUsers) {
			message = 'Account created successfully';
			console.log('addUsers true');
		} else {
			message = 'Something went wrong';
			console.log('AddUsers false');
		}

		userDB = {
			stem: stem.trim(),
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			dateJoined: dateJoined,
		};

		console.log('Updated user variable');
	}

	// return NextResponse.json({ response: { message: message, user: userDB } });
	console.log('returned json object');
	return NextResponse.json({ response: { message: 'message', user: 'userDB' } });
}
