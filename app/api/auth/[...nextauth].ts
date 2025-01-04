import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../../../lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        // Here you should check if the password is correct
        // This is just a placeholder, replace with actual password check
        const isPasswordCorrect = credentials.password === user.password

        if (!isPasswordCorrect) {
          return null
        }

        // Return only the fields that NextAuth expects
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.email.split('@')[0], // You might want to adjust this if you have a name field
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
  }
}

export default NextAuth(authOptions)

