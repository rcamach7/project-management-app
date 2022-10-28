import { Types } from 'mongoose';
import { Workspace, User } from 'schemas';

/**
 * Create Resources (POST)
 */

export const createNewWorkspace = async (
  workspaceFields: Object,
  userId: string
) => {
  try {
    const newWorkspace = new Workspace({
      ...workspaceFields,
      owner: new Types.ObjectId(userId),
      users: [new Types.ObjectId(userId)],
      boards: [],
    });
    const workspace = await newWorkspace.save();

    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { workspaces: new Types.ObjectId(workspace._id) } }
      );
    } catch (error) {
      console.error('Error saving new workspace to user: ', error);
    }

    return workspace;
  } catch (error) {
    console.error('Error creating workspace: ', error);
    return Promise.reject(error);
  }
};

/**
 * Read Resources (GET)
 */

export const getWorkspaceById = async (_id: string) => {
  try {
    const workspace = await Workspace.findOne({ _id })
      .populate({
        path: 'owner users',
        select: ['name', 'email', 'image', '_id'],
      })
      .populate({
        path: 'boards',
        model: 'Board',
        select: ['title', 'description', 'workspace_id', 'tickets', '_id'],
        populate: {
          path: 'tickets',
          model: 'Ticket',
          select: ['title', 'description', 'labels', 'board_id', '_id'],
        },
      });
    return workspace;
  } catch (error) {
    console.error('Error getting workspace by id: ', error);
    return Promise.reject(error);
  }
};

/**
 * Update Resources (PUT)
 */

export const updateGeneralWorkspaceDetails = async (
  _id: string,
  fields: { name?: string; description?: string }
) => {
  if (!fields.name && !fields.description) {
    return Promise.reject('No fields to update');
  }

  try {
    const workspace = await Workspace.findByIdAndUpdate(
      _id,
      {
        $set: fields,
      },
      { new: true }
    );

    return workspace;
  } catch (error) {
    console.error('Error updating workspace details: ', error);
    return Promise.reject(error);
  }
};

export const addUserToWorkspace = async (_id: string, email: string) => {
  try {
    const user = await User.findOne({ email });
    const workspace = await Workspace.findOneAndUpdate(
      { _id },
      { $push: { users: user._id } }
    );

    return workspace;
  } catch (error) {
    console.error('Error adding user to workspace: ', error);
    return Promise.reject(error);
  }
};

/**
 * Delete Resources (DELETE)
 */

export const deleteWorkspace = async (_id: string) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(_id);

    return workspace;
  } catch (error) {
    console.error('Error deleting workspace: ', error);
    return Promise.reject(error);
  }
};

export const deleteWorkspaceFromUsers = async (users: string[]) => {};
