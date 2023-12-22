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

			const num_posts_array = await query({
				query: 'SELECT COUNT(posts) AS num_posts FROM posts WHERE stem = ?;',
				values: [stem],
			});

			const num_posts = Number(num_posts_array[0].num_posts) + 1;

			const addPost = await query({
				query: 'INSERT INTO posts (id, stem, posts) VALUES (?, ?, ?)',
				values: [num_posts, stem, dbImg],
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

	if (req.method === 'PUT') {
		const form = new IncomingForm();

		form.parse(req, async (err, fields) => {
			const tag = fields.tag;
			const post_id = fields.post_id;

			const post_array = await query({
				query: 'SELECT posts AS post FROM posts WHERE id = ? AND stem = ?;',
				values: [post_id, tag],
			});

			if (post_array.length !== 0) {
				res.status(200).json({ post: post_array[0].post });
			} else {
				res.status(200).json({ error: 'Post not found' });
			}
		});
	}

	if (req.method === 'DELETE') {
		const form = new IncomingForm();

		form.parse(req, async (err, fields) => {
			const tag = fields.tag;
			const post_id = fields.post_id;
			const post_path = fields.post_path;
			const uploadDir = `./public/${post_path}`;

			// check if it exists
			const fileExists = await doesFileExist(uploadDir);

			if (!fileExists) {
				res.status(500).json({ error: 'File Not Found' });
			}

			// check if it is the last one in the database
			const num_posts_array = await query({
				query: 'SELECT COUNT(posts) AS num_posts FROM posts WHERE stem = ?;',
				values: [tag],
			});

			const num_posts = Number(num_posts_array[0].num_posts);

			if (num_posts <= 1) {
				deleteUserFolder(tag);

				const deletePost = await query({
					query: 'DELETE FROM posts WHERE id = ? AND stem = ?;',
					values: [post_id, tag],
				});

				res.status(200).json({ success: 'Removed whole folder' });
			} else {
				try {
					await fs.unlink(uploadDir);

					const deletePost = await query({
						query: 'DELETE FROM posts WHERE id = ? AND stem = ?;',
						values: [post_id, tag],
					});

					res.status(200).json({ success: 'Removed post', num: num_posts });
				} catch (error) {
					res.status(500).json({ error: 'Error deleting existing file' });
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
