"use server";

import Question from "@/database/question.model";
import Tag, { TagInterface } from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDb } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";

export async function getTopInteractedTag(tagData: GetTopInteractedTagsParams) {
  try {
    connectToDb();
    const { userId } = tagData;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag1" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTags(tagData: GetAllTagsParams) {
  try {
    connectToDb();
    const { searchQuery } = tagData;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    const tags = await Tag.find(query);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionByTagIdParams) {
  try {
    connectToDb();
    const { tagId, searchQuery } = params;
    const tagFilter: FilterQuery<TagInterface> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) throw new Error("Tag not found ...");
    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    connectToDb();
    const hotTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return hotTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
