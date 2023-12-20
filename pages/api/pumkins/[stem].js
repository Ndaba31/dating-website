import { query } from '@/lib/db';
import { count } from 'console';

export default async function handler(req, res) {
	let message;
	const query_result = req.query;
	const { stem } = query_result;
	const { crushee } = req.body;

	console.log(stem);
	if (req.method === 'POST') {
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
			query: 'SELECT posts, id FROM posts WHERE stem = ?;',
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

	if (req.method === 'POST') {
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

		const isCrushee = await query({
			query: 'SELECT * FROM matches WHERE crushee = ? AND crush = ?',
			values: [crushee, stem],
		});

		const count = 5;
		const hickies_crushees = await query({
			query: 'SELECT user_details.profile_photo, stem FROM matches, user_details WHERE user_details.stem = crushee AND slide = 1 AND liked_back = 1 AND crush = ? ORDER BY pumpkins DESC LIMIT ?',
			values: [stem, count],
		});

		console.log(hickies_crushees);

		const hickies_crushes = await query({
			query: 'SELECT user_details.profile_photo, stem FROM matches, user_details WHERE user_details.stem = crush AND slide = 1 AND liked_back = 1 AND crushee = ? ORDER BY pumpkins DESC LIMIT ?',
			values: [stem, count],
		});

		console.log(hickies_crushes);

		const hickies = hickies_crushees.concat(hickies_crushes);

		const socials = await query({
			query: 'SELECT * FROM socials WHERE stem = ?;',
			values: [stem],
		});

		const likes = await query({
			query: 'SELECT crush FROM likes WHERE crush = ? AND crushee = ?;',
			values: [stem, crushee],
		});

		const slide_array = await query({
			query: 'SELECT slide FROM matches WHERE (crush = ? AND crushee = ?) OR (crush = ? AND crushee = ?);',
			values: [crushee, stem, stem, crushee],
		});

		const liked_back_array = await query({
			query: 'SELECT liked_back FROM matches WHERE (crush = ? AND crushee = ?) OR (crush = ? AND crushee = ?);',
			values: [crushee, stem, stem, crushee],
		});

		console.log(user, posts, occupations, hobbies, location, message, hickies);

		const matches = await query({
			query: 'SELECT * FROM matches WHERE crush = ? AND crushee = ?;',
			values: [stem,crushee],
		})

		const crushExist = await query({
			query: 'SELECT * FROM matches WHERE crush = ? AND crushee = ?;',
			values: [crushee,stem]
		})

		//console.log(user, posts, occupations, hobbies, location, message ,likes,matches,crushExist);
         
		 console.log(liked_back_array.length===0?4: liked_back_array[0].liked_back);
		res.status(200).json({
			user: user[0],
			posts: posts,
			occupations: occupations,
			hobbies: hobbies,
			location: location[0],
			hickies: hickies,
			socials: socials,
			message: message,
			likes: likes.length === 0 ? false : true,
			slide: slide_array.length === 0 ? false : true,
			liked_back: liked_back_array.length === 0 ? undefined : liked_back_array[0].liked_back,
			isCrushee: isCrushee.length === 0 ? false : true,
		});
	}
}
