import mongoose from 'mongoose';

export interface UserSchema {
  _id: string;
  image: string;
  name: string;
  email: string;
  emailVerified: boolean;
  workspaces?: string[];
}
