"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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
