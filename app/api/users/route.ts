import { query } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: any) {
	const users = await query({
		query: 'SELECT * FROM users',
		values: [],
	});

	return NextResponse.json({ users: users });
}
