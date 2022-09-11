import { IUser } from '../../models/global.types';
import connectMongo from '../lib/connectToMongo';
import User from '../../models/User';

export const getAllUsers = async () => {
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

export const getUserById = async (id: string) => {
  try {
    await connectMongo();
    const user: IUser = await User.findById(id);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (user: IUser) => {
  try {
    await connectMongo();
    const newUser: IUser = await User.create(user);
    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (
  id: string,
  fields: { avatar?: string; name?: string }
) => {
  if (!Object.keys(fields).length) return Promise.reject('No fields to update');

  try {
    await connectMongo();
    const user: IUser = await User.findByIdAndUpdate(id, fields, { new: true });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
