// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { query } from '@/lib/db';
import { hashPass } from '@/lib/hash';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { stem, firstName, lastName, email, password } = req.body;
		const dateJoined = new Date();
		const hashedPassword = await hashPass(password);
		let message;

		let user = {
			firstName: '',
			lastName: '',
			stem: '',
			email: '',
			dateJoined: new Date(),
		};

		const userDB = await query({
			query: 'SELECT stem FROM users WHERE stem = ? OR email = ?',
			values: [stem, email],
		});

		if (userDB.length > 0) {
			message = 'User account already exists';
		} else {
			const addUsers = await query({
				query: 'INSERT INTO users (stem, first_name, last_name, email, password, date_joined) VALUES (?, ?, ?, ?, ?, ?)',
				values: [stem, firstName, lastName, email, hashedPassword, dateJoined],
			});

			const addUserDetail = await query({
				query: 'INSERT INTO user_details (stem, hickies, pumpkins) VALUES (?, ?, ?)',
				values: [stem, 0, 0],
			});

			if (addUsers && addUserDetail) {
				message = 'Account created successfully';
			} else {
				message = 'Something went wrong in insert query';
			}

			user = {
				stem: stem,
				firstName: firstName,
				lastName: lastName,
				email: email,
				hickies: 0,
				pumpkins: 0,
				dateJoined: dateJoined,
			};
		}
		res.status(200).json({ user: user, message: message });
	}

	if (req.method === 'GET') {
		let message;
		const stems = await query({
			query: 'SELECT stem FROM users',
			values: [],
		});

		if (stems.length) {
			message = 'No Users';
		} else {
			message = 'All users found';
		}

		res.status(200).json({ stems: stems, message: message });
	}
}
