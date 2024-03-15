import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {

                return axios.post('http://localhost:5000/login', { email: credentials?.email, password: credentials?.password })
                  .then((response) => {
                    return response.data;
                  })
                  .catch((error) => {
                    throw new Error(error.response.data.details);
                  }) || null;

            }
        }),
    ],
    pages: {
        signIn: "/auth",
        signOut: "/auth",
    },
    callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		},
    
	}
}