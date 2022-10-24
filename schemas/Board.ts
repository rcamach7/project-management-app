import { model, Schema, models } from 'mongoose';

const Board = new Schema({
  workspace_id: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket', required: true }],
});

Board.pre('findOneAndDelete', async function (next) {
  const boardToBeDeleted = await this.model.findOne({
    _id: this.getQuery()._id,
  });

  // Delete board from workspace
  await model('Workspace').updateOne(
    { _id: boardToBeDeleted.workspace_id },
    {
      $pull: { boards: boardToBeDeleted._id },
    }
  );

  // Delete all tickets associated with the board
  await model('Ticket').deleteMany({
    _id: { $in: boardToBeDeleted.tickets },
  });

  next();
});

const BoardSchema: any = models.Board || model('Board', Board);

export const initializeBoardSchema = () => {
  return BoardSchema;
};

export default BoardSchema;
