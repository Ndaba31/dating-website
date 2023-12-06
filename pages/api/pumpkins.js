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
			// query: 'SELECT * FROM matches WHERE slide = 1 AND liked_back = 1',
			query: 'SELECT * FROM matches',
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
		const { like, update, crush, crushee, like_count } = req.body;

		// const tiny = like === 1 ? true : false;

		console.log(like, update, crush, crushee, like_count);

		if (update === 'like') {
			const updateLike = await query({
				query: `UPDATE matches SET likes = ? WHERE matches.crushee = ? AND matches.crush = ?`,
				values: [like, crushee, crush],
			});

			const updatePumpkin = await query({
				query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
				values: [like_count, crush],
			});

			const likeProfile = await query({
				query: 'INSERT into likes (crushee,crush) values (?,?)',
				values: [crushee,crush],
			});

			message = updateLike && updatePumpkin && likeProfile ? 'Liked profile!' : 'Error with Like Button';
		}else if(update == 'dislike'){
			const dislike = await query({
               query: 'DELETE from likes where crushee = ? AND crush = ?',
			   values: [crushee,crush],
			});

			const updatePumpkin = await query({
				query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
				values: [like_count, crush],
			});

			message = dislike && updatePumpkin ? 'Removed Like' : 'Error';
		}else if(update == 'slide'){
			const currentDate = new Date().toISOString()

             const checkOppMatch = await query({
			 	query: 'SELECT * From matches WHERE crush = ? AND crushee = ?',
			 	values: [crushee,crush]
			 })

			 if(checkOppMatch){
				
			 	const checkMatch = await query({
			 		query: 'SELECT * From matches WHERE crushee = ? AND crush = ?',
			 		values: [crushee,crush]
			 	})

				if(checkMatch){
					const initiateSlide = await query({
						query: `INSERT into matches (crushee,crush,date_slide,slide) values (?,?,?,?) `,
						values: [crushee,crush,currentDate,1]
					});
					message = initiateSlide&&(checkOppMatch)&&(checkMatch) ? 'Slide Initiated' : 'Slide1 has already been initiated';
				}else{
					message='slide2 has already initiated'
				}
			}else{
              message='slide3 has already been initiated'
			}
			
			        console.log(message)
		}else if(update == 'slideout'){
			const removeSlide =await query({
				query: `DELETE from matches where crushee = ? AND crush = ?`,
				values: [crushee,crush]
			});

			message = removeSlide ? 'Slide Cancelled' : 'There is no slide to retract'
			console.log(message)
		}

		res.status(200).json({ message: message });
	}
}
