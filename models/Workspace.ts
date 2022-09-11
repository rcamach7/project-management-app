import { model, models, Schema } from 'mongoose';
import Board from './Board';

const Workspace = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  description: { type: String, required: true, minLength: 3, maxLength: 255 },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  boards: [Board],
});

const WorkspaceModel = models.Workspace || model('Workspace', Workspace);

export default WorkspaceModel;
