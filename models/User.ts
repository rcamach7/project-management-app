import { model, Schema } from 'mongoose';
import { IUser } from './global.types';

const User = new Schema<IUser>({
  avatar: { type: String, required: true },
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: { type: String, required: true, minLength: 5, maxLength: 1024 },
  workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
});

const UserModel = model<IUser>('User', User);

export default UserModel;
