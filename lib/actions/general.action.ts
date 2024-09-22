"use server";

import Question from "@/database/question.model";
import { connectToDb } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "user", "answer", "tag"];

export async function globalSearch({ query, type }: SearchParams) {
  try {
    await connectToDb();
    const regexQuery = { $regex: query, $options: "i" };
    let results = [];
    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search accros everything
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((result) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkId
                : type === "answer"
                ? result.question
                : result._id,
          }))
        );
      }
    } else {
      // specific search
      const modelInfo = modelsAndTypes.find((model) => model.type === type);
      if (!modelInfo) {
        throw new Error("Invalid search Type");
      }
      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);
      results = queryResult.map((result) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : result[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? result.clerkId
            : type === "answer"
            ? result.question
            : result._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error found: ${error}`);
    throw error;
  }
}
