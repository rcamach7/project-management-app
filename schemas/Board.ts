import { model, Schema, models } from 'mongoose';

const Board = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket', required: true }],
});

const BoardSchema: any = models.Board || model('Board', Board);

export const initializeBoardSchema = () => {
  return BoardSchema;
};

export default BoardSchema;
