"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTag(tagData: GetTopInteractedTagsParams) {
  try {
    connectToDb();
    const { userId, limit = 3 } = tagData;
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
    const { filter, page, pageSize, searchQuery } = tagData;
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
