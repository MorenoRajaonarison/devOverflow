import Profile from "@/components/forms/Profile";
import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit profile</h1>
      <h1 className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </h1>
    </div>
  );
};

export default page;
