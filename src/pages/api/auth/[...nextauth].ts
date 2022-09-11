import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../lib/mongodb';
import NextAuth from 'next-auth';
import { createEmptyWorkspaces } from '../../../controllers/userController';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user._id = user.id;
      if (!user.workspaces) {
        await createEmptyWorkspaces(user.id);
        session.user.workspaces = [];
      } else {
        session.user.workspaces = user.workspaces;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
