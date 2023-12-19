import { query } from '@/lib/db';
import { log } from 'console';
import { IncomingForm } from 'formidable-serverless';
import fs from 'fs/promises';
import path from 'path';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const form = new IncomingForm();
		form.uploadDir = './public/uploads';

		form.parse(req, async (err, fields, files) => {
			// Parse the JSON string back into an object
			const stem = fields.stem;
			const userObject = fields.user;
			const socialObject = fields.socials;
			const occupationObject = fields.occupations;
			const poppedOccupationObject = fields.poppedOccupations;
			const hobbiesObject = fields.hobbies;
			const poppedHobbiesObject = fields.poppedHobbies;

			// Convert JSON Object to a regular object
			const user = JSON.parse(userObject);
			const occupations = JSON.parse(occupationObject);
			const poppedOccupations = JSON.parse(poppedOccupationObject);
			const hobbies = JSON.parse(hobbiesObject);
			const poppedHobbies = JSON.parse(poppedHobbiesObject);
			const social = JSON.parse(socialObject);

			//QUERY FOR USER SOCIAL MEDIA
			if (social.whatsapp !== '') {
				const whatsapp = query({
					query: 'SELECT * FROM socials WHERE stem = ? AND social = "whatsapp"',
					values: [user.stem],
				});

				whatsapp.then((res) => {
					if (res.length === 0) {
						const insert_whatsapp = query({
							query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
							values: [user.stem, 'whatsapp', social.whatsapp, 0],
						});
					} else {
						const update_whatsapp = query({
							query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?',
							values: [social.whatsapp, user.stem, 'whatsapp'],
						});
					}
				});
			} else {
				const pop_whatsapp = query({
					query: 'DELETE FROM socials WHERE stem = ? AND social = ?',
					values: [user.stem, 'whatsapp'],
				});
			}

			if (social.facebook !== '') {
				const facebook = query({
					query: 'SELECT * FROM socials WHERE stem = ? AND social = "facebook"',
					values: [user.stem],
				});

				facebook.then((res) => {
					if (res.length === 0) {
						const insert_facebook = query({
							query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
							values: [user.stem, 'facebook', social.facebook, 0],
						});
					} else {
						const update_facebook = query({
							query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?',
							values: [social.facebook, user.stem, 'facebook'],
						});
					}
				});
			} else {
				const pop_facebook = query({
					query: 'DELETE FROM socials WHERE stem = ? AND social = ?',
					values: [user.stem, 'facebook'],
				});
			}

			if (social.instagram !== '') {
				const instagram = query({
					query: 'SELECT * FROM socials WHERE stem = ? AND social = "instagram"',
					values: [user.stem],
				});

				instagram.then((res) => {
					if (res.length === 0) {
						const insert_instagram = query({
							query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
							values: [user.stem, 'instagram', social.instagram, 0],
						});
					} else {
						const update_instagram = query({
							query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?',
							values: [social.instagram, user.stem, 'instagram'],
						});
					}
				});
			} else {
				const pop_instagram = query({
					query: 'DELETE FROM socials WHERE stem = ? AND social = ?',
					values: [user.stem, 'instagram'],
				});
			}

			if (social.twitter !== '') {
				const twitter = query({
					query: 'SELECT * FROM socials WHERE stem = ? AND social = "twitter"',
					values: [user.stem],
				});

				twitter.then((res) => {
					if (res.length === 0) {
						const insert_twitter = query({
							query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
							values: [user.stem, 'twitter', social.twitter, 0],
						});
					} else {
						const update_twitter = query({
							query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?',
							values: [social.twitter, user.stem, 'twitter'],
						});
					}
				});
			} else {
				const pop_twitter = query({
					query: 'DELETE FROM socials WHERE stem = ? AND social = ?',
					values: [user.stem, 'twitter'],
				});
			}

			//THE REST OF THE SQL QUERIES TO UPDATE USER INFORMATION
			try {
				const updateUserDetails1 = query({
					query: 'UPDATE user_details SET stem = ?, dob = ?, bio = ?, sex = ? WHERE stem = ?;',
					values: [user.stem, user.dob, user.bio, user.sex, stem],
				});

				const updateUserDetails2 = query({
					query: 'UPDATE user_details SET nick_name = ?, phone = ?, ethnicity = ?, relationship_status = ?, religion = ? WHERE stem = ?;',
					values: [
						user.nickName,
						user.phone,
						user.ethnicity,
						user.relationship_status,
						user.religion,
						stem,
					],
				});

				const updateUsers = query({
					query: 'UPDATE users SET stem = ?, first_name = ?, last_name = ?, email = ? WHERE stem = ?;',
					values: [user.stem, user.firstName, user.lastName, user.email, stem],
				});

				const updateHobbiesStem = query({
					query: 'UPDATE hobbies SET stem = ? WHERE stem = ?;',
					values: [user.stem, stem],
				});

				const updateLocationsStem = query({
					query: 'UPDATE locations SET stem = ? WHERE stem = ?;',
					values: [user.stem, stem],
				});

				const pumpkin_location = query({
					query: 'SELECT * FROM locations WHERE stem = ?;',
					values: [user.stem],
				});

				console.log('Pumpkin Location Query: ' + pumpkin_location);

				if (pumpkin_location.length === 0) {
					const insert_location = query({
						query: 'INSERT INTO locations (stem, city, region) VALUES (?, ?, ?);',
						values: [user.stem, user.city, user.region],
					});
				} else {
					const update_location = query({
						query: 'UPDATE locations SET city = ?, region = ? WHERE stem = ?',
						values: [user.city, user.region, user.stem],
					});
				}

				const updateOccupationsStem = query({
					query: 'UPDATE occupations SET stem = ? WHERE stem = ?;',
					values: [user.stem, stem],
				});

				const updatePostsStem = query({
					query: 'UPDATE posts SET stem = ? WHERE stem = ?;',
					values: [user.stem, stem],
				});

				const updateSocialsStem = query({
					query: 'UPDATE socials SET stem = ? WHERE stem = ?;',
					values: [user.stem, stem],
				});

				const updateMatchesCrush = query({
					query: 'UPDATE matches SET crush = ? WHERE crush = ?;',
					values: [user.stem, stem],
				});

				const updateMatchesCrushee = query({
					query: 'UPDATE matches SET crushee = ? WHERE crushee = ?;',
					values: [user.stem, stem],
				});

				const updateLikesCrush = query({
					query: 'UPDATE likes SET crush = ? WHERE crush = ?;',
					values: [user.stem, stem],
				});

				const updateLikesCrushee = query({
					query: 'UPDATE likes SET crushee = ? WHERE crushee = ?;',
					values: [user.stem, stem],
				});

				occupations.map(({ title, company, salary_min, salary_max }) => {
					if (title !== '') {
						const exist_occupation = query({
							query: 'SELECT * FROM occupations WHERE stem = ? AND title = ? AND company = ?',
							values: [user.stem, title, company],
						});

						exist_occupation.then((result) => {
							if (result.length === 0) {
								const insert_occupation = query({
									query: 'INSERT INTO occupations (stem, title, company, salary_min, salary_max) VALUES (?, ?, ?, ?, ?);',
									values: [user.stem, title, company, salary_min, salary_max],
								});
							}
						});
					} else {
						const pop_occupation = query({
							query: 'DELETE FROM occupations WHERE title = ? AND company = ? AND stem = ?;',
							values: [title, company, user.stem],
						});
					}
				});

				if (poppedOccupations.length !== 0) {
					poppedOccupations.map(({ title, company }) => {
						const pop_occupation = query({
							query: 'DELETE FROM occupations WHERE title = ? AND company = ? AND stem = ?;',
							values: [title, company, user.stem],
						});
					});
				}

				hobbies.map(({ hobby }) => {
					if (hobby !== '') {
						const exist_hobby = query({
							query: 'SELECT * FROM hobbies WHERE stem = ? AND hobby = ?',
							values: [user.stem, hobby],
						});

						exist_hobby.then((result) => {
							if (result.length === 0) {
								const insert_hobby = query({
									query: 'INSERT INTO hobbies (stem, hobby) VALUES (?, ?);',
									values: [user.stem, hobby],
								});
							}
						});
					} else {
						const pop_hobby = query({
							query: 'DELETE FROM hobbies WHERE stem = ? AND hobby = ?;',
							values: [user.stem, hobby],
						});
					}
				});

				if (poppedHobbies.length !== 0) {
					poppedHobbies.map(({ hobby }) => {
						const pop_hobby = query({
							query: 'DELETE FROM hobbies WHERE stem = ? AND hobby = ?;',
							values: [user.stem, hobby],
						});
					});
				}
			} catch (error) {
				res.status(500).json({ error: `Error on update queries: ${error}` });
			}

			if (err) {
				console.error('Error parsing form:', err);
				res.status(500).json({ error: 'Error uploading file' });
				return;
			}

			//UPLOADING IMAGE
			const uploadedFile = files?.file;

			if (!uploadedFile) {
				res.status(200).json({ success: true });
			} else {
				const dbImgPath = fields.temp_photo
					? fields.temp_photo
					: `uploads/${uploadedFile.name}`;

				const oldPath = files.file.path;
				const newPath = path.join(form.uploadDir, uploadedFile.name);
				const prevProfilePhotoPath = path.join('./public/', fields.profile_photo);
				console.log(
					`Previous file path: ${prevProfilePhotoPath}\nNew Image Path: ${newPath}`
				);

				// Check if the file with the same filename already exists
				const fileExists = await doesFileExist(newPath);
				const prevFileExists = await doesFileExist(prevProfilePhotoPath);
				console.log(`New Photo exists: ${fileExists}\nOld Photo exists: ${prevFileExists}`);
				console.log(`value of profile photo: ${fields.profile_photo}`);

				if (fileExists) {
					res.status(400).json({ error: 'Please rename the image file' });
				} else {
					if (prevFileExists) {
						// Delete the existing file before moving the new one
						try {
							await fs.unlink(prevProfilePhotoPath);
						} catch (error) {
							res.status(500).json({ error: 'Error deleting existing file' });
							return;
						}
					}
				}

				try {
					await fs.rename(oldPath, newPath);

					const updatePhoto = await query({
						query: 'UPDATE user_details SET profile_photo = ? WHERE stem = ?;',
						values: [dbImgPath, user.stem],
					});

					res.status(200).json({ message: 'Profile updated successfully' });
				} catch (error) {
					res.status(500).json({ error: 'Error moving file' });
				}
			}
		});
	}
}

async function doesFileExist(filePath) {
	try {
		await fs.access(filePath);
		return true; // File exists
	} catch (error) {
		return false; // File does not exist
	}
}
