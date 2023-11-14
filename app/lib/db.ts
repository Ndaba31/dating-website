import mysql from 'mysql2/promise';

export async function query({ query, values = [] }: any) {
	const db = await mysql.createConnection({
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: '',
	});

	try {
		const [results] = await db.execute(query, values);
		db.end();
		return results;
	} catch (error: any) {
		throw Error(error.message);
	}
}
