import { IUser } from '../../models/global.types';
import connectMongo from '../lib/connectToMongo';
import User from '../../models/User';

/**
 * Create Resources (POST)
 */

export const createEmptyWorkspaces = async (_id: string) => {
  try {
    await connectMongo();
    const user = await User.findByIdAndUpdate(
      _id,
      { workspaces: [] },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error('Error creating empty workspaces: ', error);
    return Promise.reject(error);
  }
};
/**
 * Read Resources (GET)
 */

export const getUserById = async (_id: string) => {
  try {
    await connectMongo();
    const user = await User.findById(_id);
    return user;
  } catch (error) {
    console.error('Error retrieving user: ', error);
    return Promise.reject(error);
  }
};

/**
 * Update Resources (PUT)
 */

export const addWorkspaceToUser = async (_id: string, workspaceId: string) => {
  try {
    await connectMongo();
    const user: IUser = await User.findOneAndUpdate(
      { _id },
      { $push: { workspaces: workspaceId } }
    );
    return user;
  } catch (error) {
    console.error('Error adding workspace to user: ', error);
    return Promise.reject(error);
  }
};

/**
 * Delete Resources (DELETE)
 */
