import { Schema, model } from 'mongoose';

const Card = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
});

export default model('Card', Card);
