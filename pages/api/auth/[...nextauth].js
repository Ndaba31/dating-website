import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { query } from '@/lib/db';
import isSamePass from '@/lib/hash';

export const authOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials;

				const userDB = await query({
					query: 'SELECT * FROM users WHERE email = ?',
					values: [email],
				});

				let message;

				if (!userDB.length) {
					message = 'Email not correct';
					// return Promise.resolve({ user: null, message: message });
					return null;
				}

				const pass = await isSamePass(password, userDB[0].password);

				if (!pass) {
					message = 'Password Incorrect';
					return null;
				} else {
					const user = userDB[0];
					console.log(user);

					message = `Welcome back ${user.first_name}`;
					return user;
				}
			},
		}),
	],
	pages: {
		signIn: '/login', // Customize the sign-in page URL
	},
	// callbacks: {
	// 	async jwt({ token, account }) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		session.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// },
};

export default NextAuth(authOptions);
