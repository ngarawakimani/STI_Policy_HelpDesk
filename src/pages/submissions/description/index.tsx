/* eslint-disable no-nested-ternary */
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { Key } from "react";

import { Main } from "@/base/Main";
import DescriptionCard from "@/components/description/DescriptionCard";
import ResourcesCard from "@/components/description/ResourcesCard";
import FilePreview from "@/components/resources/FilePreview";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { Meta } from "@/layouts/Meta";
import { useSubmissionDetails } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const router = useRouter();

  const { user } = useUser();

  const { submissionDetails, isLoading, isError } = useSubmissionDetails(
    router?.query?.submission_id
  );

  console.log("submissionDetails", submissionDetails);

  function handleMatching(): string {
    const expertHref = `/match?request=${router?.query?.submission_id}`;
    return user?.unsafeMetadata.data === "expert"
      ? expertHref
      : "/expert-profile";
  }

  return (
    <Main
      meta={
        <Meta
          title={`Submissions Description - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab={router?.query?.path?.toString() || ""}
    >
      {isError && !isLoading && (
        <div className="flex items-center justify-center text-sm font-bold">
          Kindly Check Your Internet Connection!
        </div>
      )}
      {isLoading && (
        <div className="py-20 px-5">
          {isLoading && <CardSkeleton number={6} />}
        </div>
      )}
      {!isError &&
        !isLoading &&
        submissionDetails?.data?.map((submissionDetail: any) => (
          <div key={submissionDetail.id}>
            <BreadCrumbHeader
              title={submissionDetail?.request_title}
              darkButtonIcon={
                router?.query?.path?.toString() === "Submissions"
                  ? "DocumentArrowDownIcon"
                  : "XCircleIcon"
              }
              darkButtonLink={
                router?.query?.path?.toString() === "Submissions"
                  ? handleMatching()
                  : "/unmatch"
              }
              darkButtonTitle={
                router?.query?.path?.toString() === "Submissions"
                  ? user?.unsafeMetadata.data === "expert"
                    ? "Help With Request"
                    : submissionDetail.researcher_id === user?.id
                    ? "Request For Help"
                    : "hideButton"
                  : "Unmatch Project"
              }
              lightButtonIcon=""
              lightButtonLink=""
              lightButtonTitle=""
              description=""
              parentLink="Home"
              currentLink="Submission Description"
            />
            <p className="mx-28 text-sm text-indigo-700">
              Budget:{" "}
              {submissionDetail.estimated_cost
                ? `$${submissionDetail.estimated_cost}`
                : "flexible budget"}
            </p>
            <p className="mx-28 text-sm text-indigo-700">
              Estimated Time (Days):{" "}
              {submissionDetail.aproximate_days
                ? `${submissionDetail.aproximate_days}`
                : "flexible"}
            </p>

            <div className="mt-8 grid grid-cols-4 gap-6 border-t px-20 py-10">
              <div className="col-span-3">
                <div>
                  <div className="mb-2 cursor-pointer text-sm font-medium text-indigo-700">
                    Description
                  </div>

                  <div className="prose-sm cursor-pointer text-sm text-slate-700">
                    <DescriptionCard
                      details={submissionDetail?.request_details}
                    />
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
