import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How use express with nextJS?",
    tags: [
      { _id: "1", name: "Javascript" },
      { _id: "2", name: "Typescript" },
    ],
    author: {
      _id: "user1",
      name: "Rajaonarison",
      picture: "url_to_user_picture",
    },
    upVotes: 10,
    answers: [
      { answerId: "answer1", text: "Sample answer 1" },
      { answerId: "answer2", text: "Sample answer 2" },
    ],
    createdAt: new Date("2024-01-15T12:00:00.00Z"),
    views: 50,
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "3", name: "Css" },
      { _id: "4", name: "Design" },
    ],
    author: {
      _id: "user2",
      name: "Fitia",
      picture: "url_to_user_picture",
    },
    upVotes: 3,
    answers: [
      { answerId: "answer3", text: "Sample answer 3" },
      { answerId: "answer4", text: "Sample answer 4" },
      { answerId: "answer5", text: "Sample answer 5" },
      { answerId: "answer6", text: "Sample answer 6" },
      { answerId: "answer7", text: "Sample answer 7" },
    ],
    createdAt: new Date("2023-02-15T12:00:00.00Z"),
    views: 50,
  },
];

function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex-between mt-11 flex gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

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
            title="There's no Qestion to show"
          />
        )}
      </div>
    </>
  );
}

export default Home;
