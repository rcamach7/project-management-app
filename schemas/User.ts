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
  workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
});

const UserModel: any = models.User || model('User', User);

export default UserModel;
