import GithubProvider from '@auth/core/providers/github';
import NextAuth from 'next-auth';

export const { handlers: { GET,POST }, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env['GITHUB_CLIENT_ID'] || '', // TODO: 環境変数からの取得を安全に（？）する
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] || '',
    }),
  ],
  secret: process.env['NEXTAUTH_SECRET'] || '',
});

export const runtime = 'edge';
