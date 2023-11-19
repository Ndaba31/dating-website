import { query } from '@/lib/db';

export default async function products(req, res) {
	if (req.method === 'GET') {
		const query_result = req.query;
		const { stem } = query_result;
		let message;

		const user = await query({
			query: 'SELECT users.stem AS stem, nick_name, dob, phone, bio, sex, hickies, pumpkins, profile_photo, first_name, last_name, email, date_joined FROM user_details, users WHERE users.stem = user_details.stem AND users.stem = ?;',
			values: [stem],
		});

		const occupations = await query({
			query: 'SELECT users.stem AS stem, company, title FROM occupations, users WHERE occupations.stem = users.stem AND users.stem = ?;',
			values: [stem],
		});

		const locations = await query({
			query: 'SELECT city, region FROM locations WHERE stem = ?;',
			values: [stem],
		});

		const hobbies = await query({
			query: 'SELECT hobby FROM hobbies WHERE stem = ?;',
			values: [stem],
		});

		const posts = await query({
			query: 'SELECT posts FROM posts WHERE stem = ?;',
			values: [stem],
		});

		if (user.length !== 0) {
			message = 'User found';
		} else {
			message = 'Could not find user';
		}

		res.status(200).json({
			user: user,
			occupations: occupations,
			locations: locations,
			hobbies: hobbies,
			posts: posts,
			message: message,
		});
	}
}
