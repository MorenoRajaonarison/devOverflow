import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filter";
import { getSaveQuestion } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

async function Home({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;
  const { questions } = await getSaveQuestion({
    clerkId,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="flex-between mt-11 flex gap-5 max-sm:flex-col">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
            title="There's no saved question to show"
          />
        )}
      </div>
    </>
  );
}

export default Home;
