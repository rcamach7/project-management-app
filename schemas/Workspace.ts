import { model, Schema, models } from 'mongoose';

const Workspace = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board', required: true }],
});

const WorkspaceSchema: any = models.Workspace || model('Workspace', Workspace);

export const initializeWorkspaceSchema = () => {
  WorkspaceSchema;
};

export default WorkspaceSchema;
