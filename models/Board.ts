import { model, Schema } from 'mongoose';

const Board = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

export default model('Board', Board);
