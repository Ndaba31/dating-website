import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	const query_result = req.query;
	const { stem } = query_result;
	const {crushee} = req.body;

	console.log(stem);
	if (req.method === 'POST') {
		const user = await query({
			query: 'SELECT users.stem AS stem, email, nick_name, dob, bio, sex, hickies, pumpkins, profile_photo, first_name, last_name, date_joined, relationship_status, religion, ethnicity FROM user_details, users WHERE users.stem = user_details.stem AND users.stem = ?',
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

		 const likes =await query({
		 	query: 'SELECT crush FROM likes WHERE crush = ? AND crushee = ?;',
		 	values: [stem,crushee],
		 })

		const matches = await query({
			query: 'SELECT * FROM matches WHERE crush = ? AND crushee = ?;',
			values: [stem,crushee],
		})

		const crushExist = await query({
			query: 'SELECT * FROM matches WHERE crush = ? AND crushee = ?;',
			values: [crushee,stem]
		})

		const liked_back_array = await query({
			query: 'SELECT liked_back FROM matches WHERE crush = ? AND crushee = ?;',
			values: [crushee,stem]
		})

		//console.log(user, posts, occupations, hobbies, location, message ,likes,matches,crushExist);
         console.log(matches.length===0?false:true)
		res.status(200).json({
			user: user[0],
			posts: posts,
			occupations: occupations,
			hobbies: hobbies,
			location: location[0],
			message: message,
			likes: likes[0],
			matches:matches,
			crushExist:crushExist[0],
			liked_back:liked_back_array.length===0?false: liked_back_array[0].liked_back,
			slide:matches.length===0?false:true
		});
	}
}
