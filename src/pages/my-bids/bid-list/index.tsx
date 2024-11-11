// import { getAuth } from "firebase/auth";
import { useUser } from "@clerk/nextjs";

import MainCard from "@/components/cards/submissions/MainCard";
import SideCard from "@/components/cards/submissions/SideCard";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { FetchMyBids } from "@/model";

const BidList = () => {
  const { user } = useUser();
  const { bids, bidsLoading, bidsError } = FetchMyBids(user?.id);

  return (
    <div className="block gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
      <div className="col-span-3">
        {bidsError && !bidsLoading && (
          <div className="mt-12 flex items-center justify-center text-sm font-bold text-red-300">
            Kindly Check Your Internet Connection!
          </div>
        )}
        {bidsLoading && <CardSkeleton number={6} />}
        {!bidsError && !bidsLoading && (
          <MainCard submissions={bids} path={"My Bids"} />
        )}
      </div>
      <div className="sticky top-6 hidden py-5 md:block lg:block">
        <SideCard />
      </div>
    </div>
  );
};

export default BidList;
