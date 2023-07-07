import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env['GITHUB_CLIENT_ID'] ?? '', // TODO: 環境変数からの取得を安全に（？）する
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] ?? '',
    }),
  ],
  secret: process.env['NEXTAUTH_SECRET'] ?? '',
});

// https://next-auth.js.org/configuration/initialization#route-handlers-app
export { handler as GET, handler as POST };
