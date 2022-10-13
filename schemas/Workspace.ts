import { model, Schema, models } from 'mongoose';

const Workspace = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  boards: [
    {
      title: { type: String, required: true, minLength: 3, maxLength: 50 },
      description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
      },
      cards: [
        {
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
        },
      ],
    },
  ],
});

const WorkspaceSchema: any = models.Workspace || model('Workspace', Workspace);

export const initializeWorkspaceSchema = () => {
  WorkspaceSchema;
};

export default WorkspaceSchema;
