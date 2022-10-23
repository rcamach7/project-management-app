import { model, Schema, models } from 'mongoose';

const Ticket = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
      },
    },
  ],
  labels: [
    {
      type: String,
      enum: [
        'BACKEND',
        'FRONTEND',
        'FEAT',
        'REFACTOR',
        'TEST',
        'PERF',
        'STYLE',
        'ASSET',
        'DOC',
        'CI',
        'CHORE',
        'WIP',
      ],
    },
  ],
});

const TicketSchema = models.Ticket || model('Ticket', Ticket);

export const initializeCardSchema = () => {
  return TicketSchema;
};

export default TicketSchema;
