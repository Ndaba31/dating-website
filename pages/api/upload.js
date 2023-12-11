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
	let message;
	if (req.method === 'POST') {
		const form = new IncomingForm();
		form.uploadDir = './public/uploads';

		form.parse(req, async (err, fields, files) => {
			// Parse the JSON string back into an object
			const userObject = fields.user;
			const socialObject = fields.socials;
			const occupationObject = fields.occupations;

			const user = JSON.parse(userObject);
			console.log(`User nickname: ${user.nickName}\nUser phone: ${user.phone}\nUser ethnicity: ${user.ethnicity}\nUser Relationship Status: ${user.relationship_status}\nUser religion: ${user.religion}`);

			const occupations = JSON.parse(occupationObject);
			console.log(`Occupations Object: ${occupations[0].title}`);

			const social = JSON.parse(socialObject);
			console.log(`Social Media Object: ${social.instagram}`);

			let valid_socials = [];

			if (social.whatsapp !== '') valid_socials.push(social.whatsapp);
			if (social.twitter !== '') valid_socials.push(social.twitter);
			if (social.facebook !== '') valid_socials.push(social.facebook);
			if (social.instagram !== '') valid_socials.push(social.instagram);

			console.log(`Social Array: ${valid_socials}`);

			const stem = fields.stem;
			console.log(`Updating this stem's profile: ${stem}`);

			try {
				const updateUserDetails1 = query({
					query: 'UPDATE user_details SET stem = ?, dob = ?, bio = ?, sex = ? WHERE stem = ?;',
					values: [
						user.stem,
						user.dob,
						user.bio,
						user.sex,
						stem
					],
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

				let updateSocials;
				valid_socials.map((link) => {
					console.log(link);
					switch (link) {
						case social.whatsapp:
							console.log("Whatsapp");
							const whatsapp = query({
								query: 'SELECT * FROM socials WHERE stem = ? AND social = ?',
								values: [user.stem, 'whatsapp'],
							});

							if (whatsapp.length === 0) {
								updateSocials = query({
									query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
									values: [user.stem, 'whatsapp', link, 0],
								});
							} else {
								updateSocials = query({
									query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?;',
									values: [link, user.stem, 'whatsapp'],
								});
							}

							break;

						case social.facebook:
							console.log("Facebook");
							const facebook = query({
								query: 'SELECT * FROM socials WHERE stem = ? AND social = ?',
								values: [user.stem, 'facebook'],
							});

							if (facebook.length === 0) {
								updateSocials = query({
									query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
									values: [user.stem, 'facebook', link, 0],
								});
							} else {
								updateSocials = query({
									query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?;',
									values: [link, user.stem, 'facebook'],
								});
							}

							break;

						case social.instagram:
							console.log("Instagram");
							const insta = query({
								query: 'SELECT * FROM socials WHERE stem = ? AND social = ?',
								values: [user.stem, 'instagram'],
							});

							if (insta.length === 0) {
								updateSocials = query({
									query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
									values: [user.stem, 'instagram', link, 0],
								});
							} else {
								updateSocials = query({
									query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?;',
									values: [link, user.stem, 'instagram'],
								});
							}

							break;

						case social.twitter:
							console.log(`Link: ${link}\nTwitter: ${social.twitter}`);
							const twitter = query({
								query: 'SELECT * FROM socials WHERE stem = ? AND social = ?',
								values: [user.stem, 'twitter'],
							});

							if (twitter.length === 0) {
								updateSocials = query({
									query: 'INSERT INTO socials (stem, social, contact, visible) VALUES (?, ?, ?, ?)',
									values: [user.stem, 'twitter', link, 0],
								});
							} else {
								updateSocials = query({
									query: 'UPDATE socials SET contact = ? WHERE stem = ? AND social = ?;',
									values: [link, user.stem, 'twitter'],
								});
							}

							break;

						default:
							break;
					}
				});
			} catch (error) {
				res.status(400).json({ error: `Error on update queries: ${error}` });
			}

			if (err) {
				console.error('Error parsing form:', err);
				res.status(500).json({ error: 'Error uploading file' });
				return;
			}

			const uploadedFile = files?.file;

			const dbImgPath = fields.temp_photo
				? fields.temp_photo
				: `uploads/${uploadedFile.name}`;

			console.log(`dbImgPath = ${dbImgPath}`);

			if (!uploadedFile) {
				res.status(400).json({ error: 'No file uploaded' });
				return;
			}

			const oldPath = files.file.path;
			const newPath = path.join(form.uploadDir, uploadedFile.name);
			const prevProfilePhotoPath = path.join('./public/', fields.profile_photo);
			console.log(`Previous file path: ${prevProfilePhotoPath}\nNew Image Path: ${newPath}`);

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
						console.log('Deleted previous profile photo');
					} catch (error) {
						console.error('Error deleting existing file:', error);
						res.status(500).json({ error: 'Error deleting existing file' });
						return;
					}
				}
			}

			try {
				await fs.rename(oldPath, newPath);

				const updatePhoto = query({
					query: 'UPDATE user_details SET profile_photo = ? WHERE stem = ?;',
					values: [dbImgPath, user.stem],
				});

				res.status(200).json({ success: true });
			} catch (error) {
				console.error('Error moving file:', error);
				res.status(500).json({ error: 'Error moving file' });
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
