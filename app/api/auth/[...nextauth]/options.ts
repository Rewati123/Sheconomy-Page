import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/prisma';  
import bcrypt from 'bcryptjs';


 export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials received:', credentials); 

        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          throw new Error('Missing email or password');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.error('User not found:', credentials.email);
          throw new Error('User not found');
        }
        
        const isPasswordCorrect = await bcrypt.compare(credentials.password.trim(), user.password);
        if (!isPasswordCorrect) {
          console.error('Incorrect password for user:', credentials.email);
          throw new Error('Incorrect password');
        }

        console.log('User authenticated:', user);
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.email.split('@')[0],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};



