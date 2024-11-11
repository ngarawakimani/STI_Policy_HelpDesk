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
import { FetchBidDetails } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const router = useRouter();

  const { user } = useUser();
  console.log(router, "user");

  const { bidDetails, bidDetailsError, bidDetailsLoading } = FetchBidDetails(
    router?.query?.submission_id
  );
  console.log(bidDetails, "bidDetails");
  const updateMatch = async () => {
    if (!router.isReady) {
      console.warn("Router not ready yet");
      return;
    }

    const projectId = router?.query?.project_id?.toString();

    if (typeof projectId !== "string") {
      console.error("Invalid project ID");
      return;
    }

    const referenceData = doc(db, "submissions", projectId);

    try {
      await updateDoc(referenceData, {
        cost: bidDetails?.data?.[0]?.cost,
        duration: bidDetails?.data?.[0]?.duration,
        matched: true,
        unmatched: false,
        expert_name: bidDetails?.data?.[0]?.expert_email,
        expert_email: bidDetails?.data?.[0]?.expert_email,
        expert_id: bidDetails?.data?.[0]?.expert_id,
      });
      console.log("Document updated successfully.");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  async function handleMatching(): Promise<string> {
    await updateMatch();
    const success = await router.push("/project");
    if (success) {
      return "Matched with expert successfully!";
    }
    return "Navigation failed.";
  }


  return (
    <Main
      meta={
        <Meta
          title={`Bids Description - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab={router?.query?.path?.toString() || ""}
    >
      {bidDetailsError && !bidDetailsLoading && (
        <div className="flex items-center justify-center text-sm font-bold">
          Kindly Check Your Internet Connection!
        </div>
      )}
      {bidDetailsLoading && (
        <div className="py-20 px-10">
          {bidDetailsLoading && <CardSkeleton number={6} />}
        </div>
      )}
      {!bidDetailsError &&
        !bidDetailsLoading &&
        bidDetails?.data?.map((submissionDetail: any) => (
          <div key={submissionDetail.id}>
            <BreadCrumbHeader
              title={submissionDetail?.request_title}
              darkButtonIcon={
                user?.unsafeMetadata.data !== "expert"
                  ? "DocumentArrowDownIcon"
                  : "XCircleIcon"
              }
              // darkButtonLink={
              //   user?.unsafeMetadata.data !== "expert"
              //     ? "/project"
              //     : `/my-bids/cancel-bid?id=${submissionDetail.id}`
              // }
              // darkButtonClick={() => handleMatching(submissionDetail)}
              darkButtonLink={
                user?.unsafeMetadata.data !== "expert"
                  ? ""
                  : `/my-bids/cancel-bid?id=${submissionDetail.id}`
              }
              // Inline arrow function to handleMatching
              darkButtonClick={
                user?.unsafeMetadata.data !== "expert"
                  ? () => handleMatching()
                  : undefined
              }
              darkButtonTitle={
                user?.unsafeMetadata.data !== "expert"
                  ? "Match with Expert"
                  : "Cancel Bid"
              }
              lightButtonIcon=""
              lightButtonLink=""
              lightButtonTitle=""
              description=""
              parentLink="Home"
              currentLink="Bid Description"
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
                    {submissionDetail.sector_focus}
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
