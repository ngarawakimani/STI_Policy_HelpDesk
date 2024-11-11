/* eslint-disable no-nested-ternary */
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import type { Key } from "react";

import { Main } from "@/base/Main";
import DescriptionCard from "@/components/description/DescriptionCard";
import ResourcesCard from "@/components/description/ResourcesCard";
import FilePreview from "@/components/resources/FilePreview";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { db } from "@/config/firebase";
import { Meta } from "@/layouts/Meta";
import { FetchInviteDetails } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const router = useRouter();

  const { user } = useUser();

  const { inviteDetails, inviteDetailsError, inviteDetailsLoading } =
    FetchInviteDetails(router?.query?.submission_id);

  const updateMatch = async () => {
    const projectId = router.query.project_id?.toString();

    if (!projectId) {
      console.error("No valid project ID found");
      return; // Exit if projectId is missing or invalid
    }
    const referenceData = doc(
      db,
      "submissions",
      router.query.project_id?.toString() || ""
    );

    await updateDoc(referenceData, {
      cost: inviteDetails?.data?.[0]?.cost,
      duration: inviteDetails?.data?.[0]?.duration,
      matched: true,
      unmatched: false,
      expert_name: inviteDetails?.data?.[0]?.expert_name,
      expert_profile: inviteDetails?.data?.[0]?.expert_profile,
      expert_email: inviteDetails?.data?.[0]?.expert_email,
      expert_id: inviteDetails?.data?.[0]?.expert_id,
      expert_username: inviteDetails?.data?.[0]?.expert_username,
    });
  };

  function handleMatching(): string {
    updateMatch();
    return "";
  }

  return (
    <Main
      meta={
        <Meta
          title={`Invite Description - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab={router?.query?.path?.toString() || ""}
    >
      {inviteDetailsError && !inviteDetailsLoading && (
        <div className="flex items-center justify-center text-sm font-bold">
          Kindly Check Your Internet Connection!
        </div>
      )}

      {inviteDetailsLoading && (
        <div className="py-20 px-10">
          {inviteDetailsLoading && <CardSkeleton number={6} />}
        </div>
      )}

      {!inviteDetailsError &&
        !inviteDetailsLoading &&
        inviteDetails?.data?.map((submissionDetail: any) => (
          <div key={submissionDetail.id}>
            <BreadCrumbHeader
              title={submissionDetail?.request_title}
              darkButtonIcon={
                user?.unsafeMetadata.data === "expert"
                  ? "DocumentArrowDownIcon"
                  : "XCircleIcon"
              }
              darkButtonLink={
                user?.unsafeMetadata.data === "expert"
                  ? handleMatching()
                  : `/my-invites/cancel-invite?id=${submissionDetail.id}`
              }
              darkButtonTitle={
                user?.unsafeMetadata.data === "expert"
                  ? "Match with SGC Member"
                  : "Cancel Invitation"
              }
              lightButtonIcon=""
              lightButtonLink=""
              lightButtonTitle=""
              description=""
              parentLink="Home"
              currentLink="Invite Description"
            />

            <div className="mt-8 grid grid-cols-4 gap-6 border-t px-20 py-10">
              <div className="col-span-3">
                <div>
                  <div className="mb-2 cursor-pointer text-sm font-medium text-indigo-700">
                    Description
                  </div>
                  <div className="prose-sm cursor-pointer text-sm text-slate-700">
                    <DescriptionCard
                      details={submissionDetail.request_details}
                    ></DescriptionCard>
                  </div>
                </div>
                <div className="border-t py-6">
                  <div className="cursor-pointer text-sm font-medium text-indigo-700">
                    Resources
                  </div>
                  {submissionDetail.resources ? (
                    <div className="mt-4 flex gap-4">
                      {submissionDetail.resources.map(
                        (resource: any, index: Key | null | undefined) => (
                          <div key={index}>
                            <ResourcesCard fileUrls={resource}></ResourcesCard>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="mt-2">
                      <FilePreview fileName="No Project Files for this Request" />
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-gray-100 py-4 px-2">
                <div className="flex">
                  <button
                    type="button"
                    className="mr-2 rounded-full border border-slate-200 bg-gray-100 py-[6px] px-5 text-xs text-slate-600 hover:bg-slate-100 hover:text-blue-800"
                  >
                    {submissionDetail.area_of_expertise}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Main>
  );
};

export default Index;
