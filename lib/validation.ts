import { z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(10),
});

export const ProfileSchema = z.object({
  name: z.string().min(10),
  username: z.string().min(10),
  bio: z.string().min(10),
  portfolioWebsite: z.string().min(10),
  location: z.string().min(10),
});
