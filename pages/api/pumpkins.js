import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	if (req.method === 'POST') {
		const { count } = req.body;
		const allUsers = await query({
			query:
				'SELECT users.stem AS stem, first_name, last_name, bio, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem ORDER BY pumpkins DESC LIMIT ' +
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

		const allMatches = await query({
			query: 'SELECT * FROM matches WHERE slide = 1 AND liked_back = 1;',
			values: [],
		});

		res.status(200).json({
			message: message,
			users: allUsers,
			occupations: allOccupations,
			socials: allSocials,
			matches: allMatches,
		});
	}

	if (req.method === 'PUT') {
		const { like, update, crush, crushee, like_count, hicky, hickie_count } = req.body;

		console.log(`Like Count: ${like_count}`);

		if (update === 'like') {
			console.log('Update is equal to like');
			const checkPreviousLike = await query({
				query: 'SELECT * FROM likes WHERE crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			console.log(`Previous Like: ${checkPreviousLike}`);

			if (checkPreviousLike.length === 0) {
				const updatePumpkin = await query({
					query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
					values: [like_count, crush],
				});

				const likeProfile = await query({
					query: 'INSERT into likes (crushee,crush) values (?,?)',
					values: [crushee, crush],
				});

				message =
					updatePumpkin && likeProfile ? 'Liked profile!' : 'Error with Like Button';
			}
		} else if (update === 'dislike') {
			console.log('Update is equal to DISLIKE');
			const dislike = await query({
				query: 'DELETE from likes where crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			const updatePumpkin = await query({
				query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
				values: [like_count, crush],
			});

			message = dislike && updatePumpkin ? 'Removed Like' : 'Error';
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
