import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

interface NewUserRequest {
	name: string;
	email: string;
	password: string;
}

interface NewUserResponse {
	id: string;
	email: string;
	name: string;
	role: string;
	dateJoined: Date;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export async function POST(req: NextRequest): Promise<NewResponse> {
	const body = (await req.json()) as NewUserRequest;
	await dbConnect();

	const oldUser = await UserModel.findOne({ email: body.email });
	if (oldUser) {
		return NextResponse.json({
			error: 'There already is an account with this email',
			status: 422,
		});
	}

	const user = await UserModel.create({ ...body });

	return NextResponse.json({
		user: {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
			dateJoined: user.dateJoined,
		},
	});
}
