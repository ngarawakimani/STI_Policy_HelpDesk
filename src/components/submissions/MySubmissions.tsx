// import { getAuth } from "firebase/auth";
import { useUser } from "@clerk/nextjs";

import MainCard from "@/components/cards/submissions/MainCard";
import SideCard from "@/components/cards/submissions/SideCard";
import { useMySubmissions } from "@/model";

import CardSkeleton from "../utils/CardSkeleton";

const MySubmissions = () => {
  const { user } = useUser();
  const { mySubmissions, isLoading, isError } = useMySubmissions(user?.id);

  return (
    <div className="block gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
      <div className="col-span-3">
        {isError && !isLoading && (
          <div className="mt-12 flex items-center justify-center text-sm font-bold text-red-300">
            Kindly Check Your Internet Connection!
          </div>
        )}
        {isLoading && <CardSkeleton number={6} />}
        {!isError && !isLoading && (
          <MainCard submissions={mySubmissions} path="Submissions" />
        )}
      </div>
      <div className="sticky top-6 hidden py-5 md:block lg:block">
        <SideCard />
      </div>
    </div>
  );
};

export default MySubmissions;
