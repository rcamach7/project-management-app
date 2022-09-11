import { model, Schema } from 'mongoose';
import { IWorkspace } from './global.types';
import Board from './Board';

const Workspace = new Schema<IWorkspace>({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  boards: [Board],
});

const WorkspaceModel = model<IWorkspace>('Workspace', Workspace);

export default WorkspaceModel;
