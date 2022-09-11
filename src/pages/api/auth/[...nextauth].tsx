import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../lib/mongodb';
import NextAuth from 'next-auth';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
