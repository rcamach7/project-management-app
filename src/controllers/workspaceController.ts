import { IBoard, IUser, IWorkspace } from '../../models/global.types';
import connectMongo from '../lib/connectToMongo';
import Workspace from '../../models/Workspace';
import User from '../../models/User';

/**
 * Create Resources (POST)
 */

export const createWorkspace = async (workspace: IWorkspace) => {
  try {
    await connectMongo();
    const newWorkspace: IWorkspace = await Workspace.create(workspace);
    return newWorkspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Read Resources (GET)
 */

export const getAllWorkspaces = async () => {
  try {
    await connectMongo();
    const workspaces: IWorkspace[] = await Workspace.find();
    return workspaces;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Update Resources (PUT)
 */

export const updateWorkspaceDetails = async (
  _id: string,
  fields: { name?: string; description?: string }
) => {
  if (!fields.name && !fields.description) {
    return Promise.reject('No fields to update');
  }

  try {
    await connectMongo();
    const workspace: IWorkspace = await Workspace.findByIdAndUpdate(_id, {
      $set: fields,
    });

    return workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addUserToWorkspace = async (_id: string, email: string) => {
  try {
    await connectMongo();
    const user: IUser = await User.findOne({ email });
    const workspace: IWorkspace = await Workspace.findOneAndUpdate(
      { _id },
      { $push: { users: user._id } }
    );
    return workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addBoardToWorkspace = async (_id: string, board: IBoard) => {
  try {
    await connectMongo();
    const workspace: IWorkspace = await Workspace.findByIdAndUpdate(_id, {
      $push: { boards: board },
    });
    return workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update the board in the workspace, without updating the entire workspace
const updateWorkspaceBoard = async (_id: string, board: IBoard) => {
  try {
    await connectMongo();
    // const workspace: IWorkspace = await Workspace.findOneAndUpdate(
    //   { _id },
    //   { $set: { 'boards.$': board } }
    // );
    // return workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Delete Resources (DELETE)
 */

export const deleteWorkspace = async (_id: string) => {
  try {
    await connectMongo();
    const workspace: IWorkspace = await Workspace.findByIdAndDelete(_id);
    return workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};
