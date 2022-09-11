import { model, Schema } from 'mongoose';

const Workspace = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Workspace', Workspace);
