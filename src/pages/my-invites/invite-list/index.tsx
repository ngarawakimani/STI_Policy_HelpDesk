// import { getAuth } from "firebase/auth";
import { useUser } from "@clerk/nextjs";

import MainCard from "@/components/cards/submissions/MainCard";
import SideCard from "@/components/cards/submissions/SideCard";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { FetchMyInvites } from "@/model";

const InviteList = () => {
  const { user } = useUser();
  const { invites, invitesLoading, invitesError } = FetchMyInvites(user?.id);

  

  return (
    <div className="block gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
      <div className="col-span-3">
        {invitesError && !invitesLoading && (
          <div className="mt-12 flex items-center justify-center text-sm font-bold text-red-300">
            Kindly Check Your Internet Connection!
          </div>
        )}
        {invitesLoading && <CardSkeleton number={6} />}
        {!invitesError && !invitesLoading && (
          <MainCard submissions={invites} path="My Invites" />
        )}
      </div>
      <div className="sticky top-6 hidden py-5 md:block lg:block">
        <SideCard />
      </div>
    </div>
  );
};

export default InviteList;
