"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import Question from "@/database/question.model";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDb();
    // eslint-disable-next-line no-unused-vars
    const { clerkId, path, updateData } = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    // revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDb();
    const { clerkId } = userData;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // eslint-disable-next-line no-unused-vars
    const userQstId = await Question.find({ author: user._id }).distinct("_id");
    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUsers(userData: GetAllUsersParams) {
  try {
    connectToDb();
    // const { page = 1, pageSize = 20, filter, searchQuery } = userData;
    const users = await User.find().sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
