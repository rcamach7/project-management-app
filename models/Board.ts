import { Schema } from 'mongoose';

const Comment = {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, minLength: 3, maxLength: 255 },
};

const Card = {
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  comments: [Comment],
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
};

const Board = {
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  cards: [Card],
};

export default Board;
