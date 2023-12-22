import { query } from '@/lib/db';

export default async function handler(req, res) {
	let message;
	let getData = null;
	let user = null;

	if (req.method === 'POST') {
		const { newbio, crushee, crush, getMatch, email } = req.body;
		console.log(newbio, crushee, crush, getMatch);

		if (!getMatch) {
			const setNewBio = await query({
				query: 'UPDATE matches SET blog_post = ? WHERE Crushee = ? AND Crush = ?',
				values: [newbio, crushee, crush],
			});
			message = 'Blog Post Updated';
		} else {
			getData = await query({
				query: 'SELECT crush, crushee, blog_post, couple_photo FROM matches WHERE crushee = ? AND crush = ?',
				values: [crushee, crush],
			});
			message = 'Match retrieved';
		}

		if (email !== '') {
			user = await query({
				query: 'SELECT users.stem AS stem, email, first_name, last_name, sex, dob, nick_name, phone, ethnicity, religion, relationship_status, bio, hickies, pumpkins, profile_photo FROM users, user_details WHERE users.stem = user_details.stem AND email = ?',
				values: [email],
			});
			message = 'User retrieved';
		}
	}

	res.status(200).json({
		message: message,
		match: getData[0] ? getData[0] : null,
		user: user ? user[0] : null,
	});
}
