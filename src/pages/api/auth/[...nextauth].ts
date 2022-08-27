import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'email...' },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = { email: credentials?.email };
                console.log(req.body)
                if (user) {
                    return (user)
                }
                return null
            }
        })
    ],


    secret: 'IamVeryHandsome',
    debug: true,
    // no providers specified, using standard auth 
}

export default NextAuth(authOptions)