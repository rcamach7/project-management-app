import { model, Schema, models } from 'mongoose';

const User = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  emailVerified: { type: Boolean, required: true },
  workspaces: [
    { _id: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true } },
  ],
});

const UserModel: any = models.User || model('User', User);

export const initializeUserSchema = () => {
  UserModel;
};

export default UserModel;
