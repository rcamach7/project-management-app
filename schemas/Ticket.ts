import { model, Schema, models } from 'mongoose';

const Ticket = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
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
      required: true,
    },
  ],
});

const TicketSchema: any = models.Ticket || model('Ticket', Ticket);

export const initializeTicketSchema = () => {
  return TicketSchema;
};

export default TicketSchema;
