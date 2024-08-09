import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionInterface } from "@/database/question.model";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const { tagTitle, questions } = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: QuestionInterface) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              answers={question.answers}
              views={question.views}
              upVotes={question.upVotes}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae."
            link="/ask-question"
            textButton="Ask a Question"
            title="There's no tag question to show"
          />
        )}
      </div>
    </>
  );
};

export default Page;
