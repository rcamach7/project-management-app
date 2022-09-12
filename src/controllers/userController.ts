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
    return Promise.reject(error);
  }
};
/**
 * Read Resources (GET)
 */

const getAllUsers = async () => {
  try {
    await connectMongo();
    const users: IUser[] = await User.find();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (_id: string) => {
  try {
    await connectMongo();
    const user: IUser = await User.findById(_id);
    return user;
  } catch (error) {
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
    return Promise.reject(error);
  }
};

/**
 * Delete Resources (DELETE)
 */
