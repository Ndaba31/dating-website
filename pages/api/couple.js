import { query } from '@/lib/db';

export default async function handler(req, res) {
    let message;

    if (req.method==='POST'){
        const {newbio,crushee,crush} = req.body;

        const setNewBio = await query ({
            query: 'UPDATE matches SET blog_post = ? WHERE Crushee = ? AND Crush = ?',
            values: [newbio,crushee,crush]
        })
        message="Blog Post Updated"

    }

    res.status(200).json({ message: message });
}