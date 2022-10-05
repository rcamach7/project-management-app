import connectMongo from '../lib/connectToMongo';
import Workspace from '../../schemas/Workspace';
import User from '../../schemas/User';

/**
 * Create Resources (POST)
 */

export const createNewWorkspace = async (workspace: any) => {
  try {
    await connectMongo();
    /** workspace coming in causing error below:
      {
        _id: new ObjectId("631fd720b666337cc4fb9af0"),
        name: 'New Workspace',
        description: 'New Workspace Description',
        users: [ '631e6203d20ad22ef48d8a6a' ],
        boards: []
      }
    */
    const newWorkspace = await Workspace.create(workspace);

    return newWorkspace;
  } catch (error) {
    console.error('Error creating workspace: ', error);
    return Promise.reject(error);
  }
};

/**
 * Read Resources (GET)
 */

export const getAllWorkspaces = async () => {
  try {
    await connectMongo();
    const workspaces = await Workspace.find({}).populate('users');

    return workspaces;
  } catch (error) {
    console.error('Error retrieving all workspaces: ', error);
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
    const workspace = await Workspace.findByIdAndUpdate(_id, {
      $set: fields,
    });

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
const updateWorkspaceBoard = async (_id: string, board: any) => {
  try {
    await connectMongo();
    // const workspace: IWorkspace = await Workspace.findOneAndUpdate(
    //   { _id },
    //   { $set: { 'boards.$': board } }
    // );
    // return workspace;
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
