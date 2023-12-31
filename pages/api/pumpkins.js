import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	if (req.method === 'POST') {
		const { count, email } = req.body;
		let user;

		const allUsers = await query({
			query: 'SELECT users.stem AS stem, email, first_name, last_name, sex, dob, nick_name, phone, ethnicity, religion, relationship_status, bio, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem ORDER BY pumpkins DESC',
			values: [],
		});

		if (allUsers.length) {
			message = count + ' users found';
		} else {
			message = 'No users found';
		}

		if (email === '') {
			user = null;
		} else {
			user = await query({
				query: 'SELECT users.stem AS stem, email, first_name, last_name, sex, dob, nick_name, phone, ethnicity, religion, relationship_status, bio, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem AND email = ?',
				values: [email],
			});
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
			query: 'SELECT * FROM matches WHERE slide = 1 AND liked_back = 1 LIMIT 10;',
			values: [],
		});

		res.status(200).json({
			message: message,
			users: allUsers,
			occupations: allOccupations,
			socials: allSocials,
			matches: allMatches,
			user: user ? user[0] : null,
		});
	}

	if (req.method === 'PUT') {
		const { like, update, crush, crushee, like_count, totalMatches, hicky, hickie_count } =
			req.body;
		const today = new Date().toISOString().split('T');
		const time = today[1].substring(0, today[1].length - 2);
		const currentDate = today[0] + ' ' + time;
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

		if (update == 'slide') {
			const checkOppMatch = await query({
				query: 'SELECT * From matches WHERE crush = ? AND crushee = ?',
				values: [crushee, crush],
			});

			if (checkOppMatch[0] === undefined) {
				const checkMatch = await query({
					query: 'SELECT * From matches WHERE crushee = ? AND crush = ?',
					values: [crushee, crush],
				});

				if (checkMatch[0] === undefined) {
					const initiateSlide = await query({
						query: `INSERT into matches (crushee, crush, date_slide, slide) values (?, ?, ?, ?)`,
						values: [crushee, crush, currentDate, 1],
					});
					message =
						initiateSlide && checkOppMatch && checkMatch
							? 'Slide Initiated'
							: 'Error with sliding';
				} else {
					message = 'slideInitiated';
				}
			} else {
				message = 'slideInitiated';
			}

			console.log(message);
		} else if (update == 'slideout') {
			const removeSlide = await query({
				query: `DELETE from matches where crushee = ? AND crush = ? AND slide = ?`,
				values: [crushee, crush, 1],
			});

			const { matched } = req.body;

			if (matched) {
				const hickies1 = await query({
					query: 'SELECT hickies FROM user_details WHERE stem = ?;',
					values: [crush],
				});

				const num_hickies1 =
					Number(hickies1[0].hickies) === 0 ? 0 : Number(hickies1[0].hickies) - 1;

				const updateHicky1 = await query({
					query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
					values: [num_hickies1, crush],
				});

				const hickies2 = await query({
					query: 'SELECT hickies FROM user_details WHERE stem = ?;',
					values: [crushee],
				});

				const num_hickies2 =
					Number(hickies2[0].hickies) === 0 ? 0 : Number(hickies2[0].hickies) - 1;

				const updateHicky2 = await query({
					query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
					values: [num_hickies2, crushee],
				});
			}

			message = removeSlide ? 'Slide Cancelled' : 'There is no slide to retract';
			console.log(message);
		}

		if (update == 'confirmMatch') {
			const acceptSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [1, currentDate, crushee, crush],
			});

			const pumpkins1 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crush],
			});

			const num_hickies1 = Number(pumpkins1[0].hickies);

			const updateHicky1 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies1 + 1, crush],
			});

			const pumpkins2 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crushee],
			});

			const num_hickies2 = Number(pumpkins2[0].hickies);

			const updateHicky2 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies2 + 1, crushee],
			});

			message =
				acceptSlide && updateHicky1 && updateHicky2
					? 'Successful Confirmation'
					: 'Could not accept this match';
		} else if (update == 'denyMatch') {
			const declineSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [0, currentDate, crushee, crush],
			});
		} else if (update == 'nullify') {
			const nullify = await query({
				query: 'UPDATE matches SET liked_back = null, date_responded = null WHERE crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			const hickies1 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crush],
			});

			const num_hickies1 =
				Number(hickies1[0].hickies) === 0 ? 0 : Number(hickies1[0].hickies) - 1;

			const updateHicky1 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies1, crush],
			});

			const hickies2 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crushee],
			});

			const num_hickies2 =
				Number(hickies2[0].hickies) === 0 ? 0 : Number(hickies2[0].hickies) - 1;

			const updateHicky2 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies2, crushee],
			});
		}

		// if (update === 'hicky') {
		// 	const updateSlide = await query({
		// 		query: `UPDATE matches SET slide = ? WHERE matches.crushee = ? AND matches.crush = ?`,
		// 		values: [hicky, crushee, crush],
		// 	});

		// 	const updateHicky = await query({
		// 		query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
		// 		values: [hickie_count, crush],
		// 	});

		// 	console.log(hicky, update, crush, crushee, hickie_count);
		// 	message = updateSlide && updateHicky ? 'Slid into profile!' : 'Error with Match Button';
		// }

		res.status(200).json({ message: message });
	}
}
