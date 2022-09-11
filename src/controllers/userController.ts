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

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongo();
    const user: IUser = await User.findOne({ email });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Update Resources (PUT)
 */

export const addWorkspaceToUser = async (
  email: string,
  workspaceId: string
) => {
  try {
    await connectMongo();
    const user: IUser = await User.findOneAndUpdate(
      { email },
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
