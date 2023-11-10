import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type Data = {
	name: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
	return NextResponse.json({ name: 'hello world' }, { status: 405 });
}
