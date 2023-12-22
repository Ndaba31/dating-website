import { query } from '@/lib/db';
import isSamePass from '@/lib/hash';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, password } = req.body;
		let message;
		let user = {
			firstName: '',
			lastName: '',
			stem: '',
			email: '',
			dateJoined: '',
		};

		const userDB = await query({
			query: 'SELECT * FROM users, user_details WHERE users.stem = user_details.stem AND email = ?',
			values: [email],
		});

		if (!userDB.length) {
			message = 'Email not correct';
		} else {
			const pass = await isSamePass(password, userDB[0].password);

			if (!pass) {
				message = 'Password Incorrect';
			} else {
				user = {
					firstName: userDB[0].first_name,
					lastName: userDB[0].last_name,
					stem: userDB[0].stem,
					email: userDB[0].email,
					dateJoined: userDB[0].date_joined,
				};

				message = `Welcome back ${user.firstName}`;
			}
		}

		res.status(200).json({ user: user, message: message });
	}
}
