import { Schema, model } from 'mongoose';

const Comment = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, minLength: 3, maxLength: 255 },
});

export default model('Comment', Comment);
