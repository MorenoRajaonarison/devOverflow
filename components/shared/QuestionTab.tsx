import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, clerkId, userId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          clerkId={clerkId}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          answers={question.answers}
          views={question.views}
          upVotes={question.upVotes}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
