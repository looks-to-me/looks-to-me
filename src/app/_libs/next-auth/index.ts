/* eslint-disable @typescript-eslint/require-await */
import GithubProvider from '@auth/core/providers/github';
import NextAuth from 'next-auth';

export const { handlers: { GET,POST }, auth } = NextAuth({
  providers: [
    GithubProvider,
  ],
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('sign in');
      console.log({ user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect');
      console.log({ url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log('session');
      console.log({ session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('jwt');
      console.log({ token, user, account, profile, isNewUser });
      return token;
    },
  },
});
