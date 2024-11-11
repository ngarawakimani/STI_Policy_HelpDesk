// import { getAuth } from "firebase/auth";

import SideCard from "@/components/cards/submissions/SideCard";
import { useSubmissions } from "@/model";

import MainCard from "../cards/submissions/MainCard";
import CardSkeleton from "../utils/CardSkeleton";

const AllSubmissions = () => {
  const { submissions, isLoading, isError } = useSubmissions();

  console.log(submissions, "submissions");

  return (
    <div className="block gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
      <div className="col-span-3">
        {isError && !isLoading && (
          <div className="flex items-center justify-center text-sm font-bold">
            Kindly Check Your Internet Connection!
          </div>
        )}
        {isLoading && <CardSkeleton number={6} />}
        {!isError && !isLoading && (
          <MainCard submissions={submissions} path="Submissions" />
        )}
      </div>
      <div className="sticky top-6 hidden py-5 md:block lg:block">
        <SideCard />
      </div>
    </div>
  );
};

export default AllSubmissions;
