import { PrismaAdapter } from '@auth/prisma-adapter';
import { verify } from 'argon2';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import { encode } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/prisma';

interface Credentials {
  email?: string;
  password?: string;
}

const COOKIE_NAME = 'next-auth.session-token';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days (in seconds)

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  callbacks: {
    async jwt({ account, token }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }

      return token;
    },
    async session({ session }) {
      // don't include passwordHash in the session
      delete session?.user?.passwordHash;
      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider !== 'credentials') return true;

      if (!user || !user.id) return false;

      const sessionToken = randomUUID();
      const sessionExpiry = new Date(Date.now() + MAX_AGE * 1000);

      const session = await adapter.createSession!({
        expires: sessionExpiry,
        sessionToken,
        userId: user.id,
      });

      if (!session) return false;

      // create a cookie for the new session
      const requestCookies = cookies();
      requestCookies.set({
        name: COOKIE_NAME,
        value: sessionToken,
        expires: sessionExpiry,
      });

      return true;
    },
  },
  jwt: {
    maxAge: MAX_AGE,
    encode: async (params) => {
      if (params.token?.credentials) {
        const requestCookies = cookies();
        const cookie = requestCookies.get(COOKIE_NAME);

        if (cookie) {
          return cookie.value;
        }
      }

      return encode(params);
    },
  },
  pages: {
    error: '/login',
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { email, password } = credentials as Credentials;
        if (!email || !password) return null;

        // verify the user exists
        const user = await prisma.user.findUnique({ where: { email } });

        // verify the enterred password against the hashed user password
        if (
          !user ||
          !user.passwordHash ||
          !(await verify(user.passwordHash, password))
        ) {
          // no user found
          throw new Error('User not found.');
        }
        // return user object with their profile data
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
