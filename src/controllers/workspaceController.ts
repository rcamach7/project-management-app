import connectMongo from '../lib/connectToMongo';
import { Types } from 'mongoose';
import Workspace from 'schemas/Workspace';
import User from 'schemas/User';

/**
 * Create Resources (POST)
 */

export const createNewWorkspace = async (
  workspaceFields: Object,
  userId: string
) => {
  try {
    await connectMongo();
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
    await connectMongo();
    const workspace = await Workspace.findOne({ _id }).populate({
      path: 'owner users',
      select: ['name', 'email', 'image', '_id'],
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
    await connectMongo();
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
    await connectMongo();
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

export const addBoardToWorkspace = async (_id: string, board: any) => {
  try {
    await connectMongo();
    const workspace = await Workspace.findByIdAndUpdate(_id, {
      $push: { boards: board },
    });

    return workspace;
  } catch (error) {
    console.error('Error adding board to workspace: ', error);
    return Promise.reject(error);
  }
};

// Update the board in the workspace, without updating the entire workspace
export const updateWorkspaceBoard = async (_id: string, board: any) => {
  try {
    await connectMongo();
  } catch (error) {
    console.error('Error updating workspace board: ', error);
    return Promise.reject(error);
  }
};

/**
 * Delete Resources (DELETE)
 */

export const deleteWorkspace = async (_id: string) => {
  try {
    await connectMongo();
    const workspace = await Workspace.findByIdAndDelete(_id);

    return workspace;
  } catch (error) {
    console.error('Error deleting workspace: ', error);
    return Promise.reject(error);
  }
};

export const deleteWorkspaceFromUsers = async (users: string[]) => {};
