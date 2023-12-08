import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	if (req.method === 'POST') {
		const { user,update,count } = req.body;
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
		const { like, update, crush, crushee, like_count, hicky, hickie_count,totalMatches } = req.body;

		// const tiny = like === 1 ? true : false;

		if (update === 'like') {
			

			 const checkPreviousLike = await query({
			 	query: 'SELECT * FROM likes WHERE crushee = ? AND crush = ?',
			 	values:[crushee,crush]
			 })
             if (checkPreviousLike[0]=== undefined){
				const updatePumpkin = await query({
					query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
					values: [like_count, crush],
				});
	
				const likeProfile = await query({
					query: 'INSERT into likes (crushee,crush) values (?,?)',
					values: [crushee,crush],
				});
                
				message = updatePumpkin && likeProfile ? 'Liked profile!' : 'Error with Like Button';
			}
			

			// message = 'You have already like this profile';

			console.log(like, update, crush, crushee, like_count);
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

			 if(checkOppMatch[0]===undefined){
				
			 	const checkMatch = await query({
			 		query: 'SELECT * From matches WHERE crushee = ? AND crush = ?',
			 		values: [crushee,crush]
			 	})

				if(checkMatch[0]===undefined){
					const initiateSlide = await query({
						query: `INSERT into matches (crushee,crush,date_slide,slide) values (?,?,?,?) `,
						values: [crushee,crush,currentDate,1]
					});
					message = initiateSlide&&(checkOppMatch)&&(checkMatch) ? 'Slide Initiated' : 'Error with sliding';
				}else{
					message='slideInitiated'
				}
			}else{
              message='slideInitiated'
			  
			}
			
			        console.log(message)
		}else if(update == 'slideout'){
			const removeSlide =await query({
				query: `DELETE from matches where crushee = ? AND crush = ? AND slide =?`,
				values: [crushee,crush,1]
			});

			message = removeSlide ? 'Slide Cancelled' : 'There is no slide to retract'
			console.log(message)
		}else if(update == 'confirmMatch'){
			const currentDate = new Date().toISOString()

			const acceptSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [1,currentDate,crushee,crush]
			})

			const updateHicky = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [totalMatches, crush],
			});

			message = acceptSlide&&updateHicky?'Successful Confirmation':'Could not accept this match'


		}else if(update == 'denyMatch'){
			const currentDate = new Date().toISOString()

			const declineSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [0,currentDate,crushee,crush]
			})
		}else if(update == 'nullify'){
			
			const nullify = await query({
				query: 'UPDATE matches SET liked_back = null, date_responded = null WHERE crushee = ? AND crush = ?',
				values: [crushee,crush]
			})

			const updateHicky = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [totalMatches, crush],
			});
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
