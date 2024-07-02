"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import Answer from "@/database/answer.model";

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

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDb();
    const { questionId, userId, path } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const isSaved = user.saved.includes(questionId);
    if (isSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSaveQuestion(params: GetSavedQuestionParams) {
  try {
    connectToDb();
    const { clerkId, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "_id name",
          },
          {
            path: "author",
            model: User,
            select: "_id clerkId name picture",
          },
        ],
      },
    });
    if (!user) throw new Error("User not found");
    const savedQst = user.saved;
    return { questions: savedQst };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found...");
    const totalQst = await Question.countDocuments({
      author: user._id,
    });
    const totalAnswer = await Answer.countDocuments({
      author: user._id,
    });
    return {user, totalQst, totalAnswer}
  } catch (error) {
    console.log(error);
    throw error;
  }
}
