"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDb } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDb();
    const { author, content, question, path } = params;
    const answer = new Answer({
      author,
      content,
      question,
      path,
    });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
