import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/userModel';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { emailLogin, passwordLogin } = credentials as {
					emailLogin: string;
					passwordLogin: string;
				};

				await dbConnect();

				const user = await UserModel.findOne({ email: emailLogin });

				if (!user) {
					throw Error('User Not Found');
				}

				const passwordMatch = await user.comparePassword(passwordLogin);
				if (!passwordMatch) {
					throw Error('Password Incorrect');
				}

				return {
					name: user.name,
					email: user.email,
					role: user.role,
					id: user._id,
					//dateJoined: user.dateJoined,
				};
			},
		}),
	],
	secret: process.env.SECRET,
	callbacks: {
		jwt(params: any) {
			if (params.user?.role) {
				params.token.role = params.user.role;
				params.token.id = params.user.id;
			}

			return params.token;
		},
		session({ session, token }) {
			if (session) {
				(session.user as { id: string }).id = token.id as string;
				(session.user as { role: string }).role = token.role as string;
			}

			return session;
		},
	},
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
