import { runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';
import { createUserFolder, deleteUserFolder } from '@/lib/directories';
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
	await runMiddleware(req, res);

	if (req.method === 'POST') {
		const form = new IncomingForm();

		form.parse(req, async (err, fields, files) => {
			const crushee = fields.crushee;
			const crush = fields.crush;
			const old_photo = fields.old_photo;
			const uploadedFile = files?.file;
			const no_file = fields.no_file === 'true' ? true : false;
			const folderName = `${crushee}_x_${crush}`;
			form.uploadDir = `./public/uploads/${crushee}_x_${crush}`;
			console.log(form.uploadDir);

			if (!uploadedFile) {
				if (no_file) {
					deleteUserFolder(folderName);

					const update = await query({
						query: 'UPDATE matches SET couple_photo = ? WHERE crushee = ? AND crush = ?',
						values: [null, crushee, crush],
					});

					res.status(200).json({ success: 'Couple Photo Removed' });
				} else {
					res.status(400).json({ error: 'No file uploaded' });
				}
			} else {
				const folderExists = await doesFileExist(form.uploadDir);
				const oldPath = files.file?.path;
				const newPath = path.join(form.uploadDir, uploadedFile.name);
				const prevProfilePhotoPath = path.join('./public/', '/', old_photo);
				console.log(
					`Previous file path: ${prevProfilePhotoPath}\nNew Image Path: ${newPath}`
				);
				const dbImg = `uploads/${folderName}/${uploadedFile.name}`;
				console.log(
					`New Photo path: ${newPath}\nOld Photo path: ${oldPath}\ndbImg path: ${dbImg}`
				);

				if (!folderExists) {
					createUserFolder(folderName);
				}

				const fileExists = await doesFileExist(newPath);
				const prevFileExists = await doesFileExist(prevProfilePhotoPath);
				console.log(`New Photo exists: ${fileExists}\nOld Photo exists: ${prevFileExists}`);
				console.log(`value of profile photo: ${old_photo}`);

				if (fileExists) {
					res.status(400).json({ error: 'Image Already Exists' });
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
					const update = await query({
						query: 'UPDATE matches SET couple_photo = ? WHERE crushee = ? AND crush = ?',
						values: [dbImg, crushee, crush],
					});

					await fs.rename(oldPath, newPath);

					if (update) {
						res.status(200).json({ message: 'Couple photo changed successfully' });
					} else {
						res.status(500).json({ error: 'Error in updating couple photo' });
					}
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
