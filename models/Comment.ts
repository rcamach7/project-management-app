import { Schema, model, models } from 'mongoose';

const Comment = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, minLength: 3, maxLength: 255 },
});

const CommentModel = models.Comment || model('Comment', Comment);

export default CommentModel;
