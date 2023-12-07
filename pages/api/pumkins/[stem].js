import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	const query_result = req.query;
	const { stem } = query_result;

	console.log(stem);
	if (req.method === 'GET') {
		const user = await query({
			query: 'SELECT users.stem AS stem, email, nick_name, dob, bio, phone, sex, hickies, pumpkins, profile_photo, first_name, last_name, date_joined, relationship_status, religion, ethnicity FROM user_details, users WHERE users.stem = user_details.stem AND users.stem = ?',
			values: [stem],
		});

		if (user.length) {
			message = 'User Found';
		} else {
			message = 'User Not Found';
		}

		const posts = await query({
			query: 'SELECT posts FROM posts WHERE stem = ?;',
			values: [stem],
		});

		const occupations = await query({
			query: 'SELECT * FROM occupations WHERE stem = ?;',
			values: [stem],
		});

		const hobbies = await query({
			query: 'SELECT hobby FROM hobbies WHERE stem = ?;',
			values: [stem],
		});

		const location = await query({
			query: 'SELECT city, region FROM locations WHERE stem = ?;',
			values: [stem],
		});

		const socials = await query({
			query: 'SELECT * FROM socials WHERE stem = ?;',
			values: [stem],
		});

		console.log(user, posts, occupations, hobbies, location, message);

		res.status(200).json({
			user: user[0],
			posts: posts,
			occupations: occupations,
			hobbies: hobbies,
			location: location[0],
			socials: socials,
			message: message,
		});
	}
}
