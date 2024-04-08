import bcrypt from "bcrypt"; 
import NextAuth, { AuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github"; 
import GoogleProvider from "next-auth/providers/google"; 

// import prisma from "../../../../libs/prismadb"; 

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile); 
                
                let userRole = "Google User"; 

                return {
                    ...profile, 
                    id: profile.sub, 
                    role: userRole, 
                }; 
            }, 
            //@ts-ignore
            clientId: process.env.GOOGLE_ID || undefined, 
            //@ts-ignore
            clientSecret: process.env.GOOGLE_Secret,
        }),
        GithubProvider({
            profile(profile) {
                console.log("Profile Github: ", profile); 

                let userRole = "Github User"; 
                if(profile?.email == "gaurav.malpedi17@gmail.com"){ 
                    userRole = "admin"; 
                }

                return {
                    ...profile, 
                    role: userRole, 
                }; 
            }, 
            //@ts-ignore
            clientId: process.env.GITHUB_ID, 
            //@ts-ignore
            clientSecret: process.env.GITHUB_Secret, 
        }),
        CredentialsProvider({ 
            name: 'credentials', 
            credentials: {
                email: { label: 'email', type: 'text' }, 
                password: { label: 'password', type: 'password' } 
            }, 
            //@ts-ignore
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials'); 
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                }); 

                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials'); 
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, 
                    user.hashedPassword 
                ); 

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials'); 
                }

                return user; 
            }
        }), 
    ], 
    // callbacks: { 
    //     async jwt({ token, user }){
    //         if(user) token.role = user.role; 
    //         return token; 
    //     }, 
    //     async session({ session, token }){
    //         if(session?.user) session.user.role = token.role; 
    //         return session; 
    //     }, 
    // }, 
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: 'jwt'
    }, 
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
