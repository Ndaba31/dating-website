import { runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function products(req, res) {
	await runMiddleware(req, res);

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

		const hickies = await query({
			query: 'SELECT crush AS hicky FROM matches WHERE crushee = ? AND slide = 1 and liked_back = 1 UNION SELECT crushee FROM matches WHERE crush = ? AND slide = 1 and liked_back = 1',
			values: [stem, stem],
		});

		let hicky_list = [];

		if (hickies.length !== 0) {
			hickies.map(async ({ hicky }) => {
				const person = await query({
					query: 'SELECT profile_photo, nick_name, stem FROM user_details WHERE stem = ?;',
					values: [hicky],
				});

				hicky_list.push(person);
			});

			console.log(hicky_list);
		}

		const posts = await query({
			query: 'SELECT posts FROM posts WHERE stem = ?;',
			values: [stem],
		});

		if (user.length !== 0) {
			message = 'User found';
		} else {
			message = 'Could not find user';
		}

		// console.log(user, occupations, locations, hobbies, posts, message);

		res.status(200).json({
			user: user,
			occupations: occupations,
			locations: locations,
			hobbies: hobbies,
			posts: posts,
			hickies: hicky_list,
			message: message,
		});
	}

	if (req.method === 'PUT') {
		const query_result = req.query;
		const { stem } = query_result;
		const {
			nickName,
			dob,
			occupation,
			city,
			region,
			bio,
			hobbies,
			phone,
			sex,
			ethnicity,
			relationshipStatus,
			religion,
		} = req.body;
		let message;

		const updateUser = await query({
			query: 'UPDATE user_details SET nick_name = ?, dob = ?, phone = ?, bio = ?, sex = ?, ethnicity = ?, relationship_status = ?, religion = ? WHERE stem = ?',
			values: [nickName, dob, phone, bio, sex, ethnicity, relationshipStatus, religion, stem],
		});

		if (updateUser) {
			message = 'User updated successfully';

			const addLocation = await query({
				query: 'INSERT INTO locations (stem, city, region) VALUES (?, ?, ?)',
				values: [stem, city, region],
			});

			addLocation ? (message = 'Added Location') : (message = 'Failed to add location');

			const addOccupation = await query({
				query: 'INSERT INTO occupations (stem, company, title) VALUES (?, ?, ?)',
				values: [stem, occupation.company, occupation.title],
			});

			addOccupation ? (message = 'Added Occupation') : (message = 'Failed to add occupation');

			hobbies.map(async (hobby) => {
				const addHobby = await query({
					query: 'INSERT INTO hobbies (stem, hobby) VALUES (?, ?)',
					values: [stem, hobby],
				});

				addHobby ? (message = 'Added Hobby') : (message = 'Failed to add hobby');
			});
		} else {
			message = 'Problem with user update';
		}

		res.status(200).json({
			message: message,
		});
	}
}
