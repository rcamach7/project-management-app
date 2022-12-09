import { model, Schema, models } from 'mongoose';

const Ticket = new Schema({
  board_id: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
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
  createdAt: { type: Date, default: Date.now },
});

Ticket.pre('findOneAndDelete', async function (next) {
  const ticketToBeDeleted = await this.model.findOne({
    _id: this.getQuery()._id,
  });

  // Delete ticket from board
  await model('Board').updateOne(
    { _id: ticketToBeDeleted.board_id },
    {
      $pull: { tickets: ticketToBeDeleted._id },
    }
  );

  next();
});

const TicketSchema: any = models.Ticket || model('Ticket', Ticket);

export const initializeTicketSchema = () => {
  return TicketSchema;
};

export default TicketSchema;
