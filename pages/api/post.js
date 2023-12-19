import { query } from '@/lib/db';
import { createUserFolder } from '@/lib/directories';
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

		form.parse(req, async (err, fields, files) => {
			const stem = fields.stem;
			const uploadedFile = files?.file;
			form.uploadDir = `./public/uploads/${stem}`;
			console.log(form.uploadDir);

			if (!uploadedFile) {
				res.status(500).json({ error: 'No file uploaded' });
			}

			const folderExists = await doesFileExist(form.uploadDir);
			const oldPath = files.file.path;
			const newPath = path.join(form.uploadDir, uploadedFile.name);
			const dbImg = `uploads/${stem}/${uploadedFile.name}`;
			console.log(
				`New Photo path: ${newPath}\nOld Photo path: ${oldPath}\ndbImg path: ${dbImg}`
			);

			if (!folderExists) {
				createUserFolder(stem);
			}

			const addPost = await query({
				query: 'INSERT INTO posts (stem, posts) VALUES (?, ?)',
				values: [stem, dbImg],
			});

			if (addPost) {
				res.status(200).json({ message: 'posted photo successfully' });
			} else {
				res.status(500).json({ error: 'Error in posting photo' });
			}

			try {
				await fs.rename(oldPath, newPath);
			} catch (error) {
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
