import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	if (req.method === 'POST') {
		const { count } = req.body;
		const allUsers = await query({
			query:
				'SELECT users.stem AS stem, first_name, last_name, bio, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem LIMIT ' +
				count,
			values: [],
		});

		if (allUsers.length) {
			message = count + ' users found';
		} else {
			message = 'No users found';
		}

		const allOccupations = await query({
			query: 'SELECT * FROM occupations',
			values: [],
		});

		const allSocials = await query({
			query: 'SELECT * FROM socials',
			values: [],
		});

		res.status(200).json({
			message: message,
			users: allUsers,
			occupations: allOccupations,
			socials: allSocials,
		});
	}

	if (req.method === 'PUT') {
		const { like, update, crush, crushee, like_count, hicky, hickie_count } = req.body;

		// const tiny = like === 1 ? true : false;

		if (update === 'like') {
			const updateLike = await query({
				query: `UPDATE matches SET likes = ? WHERE matches.crushee = ? AND matches.crush = ?`,
				values: [like, crushee, crush],
			});

			const updatePumpkin = await query({
				query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
				values: [like_count, crush],
			});

			console.log(like, update, crush, crushee, like_count);
			message = updateLike && updatePumpkin ? 'Liked profile!' : 'Error with Like Button';
		}

		if (update === 'hicky') {
			const updateSlide = await query({
				query: `UPDATE matches SET slide = ? WHERE matches.crushee = ? AND matches.crush = ?`,
				values: [hicky, crushee, crush],
			});

			const updateHicky = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [hickie_count, crush],
			});

			console.log(hicky, update, crush, crushee, hickie_count);
			message = updateSlide && updateHicky ? 'Slid into profile!' : 'Error with Match Button';
		}

		res.status(200).json({ message: message });
	}
}
