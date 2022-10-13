import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongodb';
import NextAuth from 'next-auth';
import {
  createEmptyWorkspaces,
  getPopulatedUserWorkspaces,
} from '@/controllers/userController';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      /**
       * Add additional user fields to the session to fit our app's needs.
       */
      session.user._id = user.id;
      session.user.workspaces = user.workspaces
        ? await getPopulatedUserWorkspaces(user.id)
        : await createEmptyWorkspaces(user.id);

      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
