import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	if (req.method === 'POST') {
		const { count } = req.body;
		const allUsers = await query({
			query:
				'SELECT users.stem AS stem, first_name, last_name, email, nick_name, dob, phone, bio, sex, ethnicity, relationship_status, religion, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem LIMIT ' +
				count,
			values: [],
		});

		if (allUsers.length) {
			message = 'All users found';
		} else {
			message = 'No users found';
		}

		const allOccupations = await query({
			query: 'SELECT * FROM occupations',
			value: [],
		});

		const allHobbies = await query({
			query: 'SELECT * FROM hobbies',
			value: [],
		});

		const allLocations = await query({
			query: 'SELECT * FROM locations',
			value: [],
		});

		const allPosts = await query({
			query: 'SELECT * FROM posts',
			value: [],
		});

		const allSocials = await query({
			query: 'SELECT * FROM socials',
			value: [],
		});

		const allMatches = await query({
			query: 'SELECT * FROM matches WHERE slide = 1 AND liked_back = 1',
			value: [],
		});

		res.status(200).json({
			message: message,
			users: allUsers,
			occupations: allOccupations,
			hobbies: allHobbies,
			locations: allLocations,
			posts: allPosts,
			socials: allSocials,
			matches: allMatches,
		});
	}

	if (req.method === 'PUT') {
		const { like, update, crush, crushee } = req.body;

		// const tiny = like === 1 ? true : false;

		console.log(like, update, crush, crushee);

		if (update === 'like') {
			const updateLike = await query({
				query: `UPDATE matches SET likes = ? WHERE matches.crushee = ? AND matches.crush = ?`,
				values: [like, crushee, crush],
			});

			message = updateLike ? 'Liked profile!' : 'Error with Like Button';
		}

		res.status(200).json({ message: message });
	}
}
