import { useRouter } from "next/router";
import React from "react";

import { Main } from "@/base/Main";
import DescriptionCard from "@/components/description/DescriptionCard";
import ResourcesCard from "@/components/description/ResourcesCard";
import ProfileCard from "@/components/profile/ProfileCard";
import UnmatchReason from "@/components/reason/UnmatchReason";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { Meta } from "@/layouts/Meta";
import { useSubmissionDetails } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const router = useRouter();

  const { submissionDetails, isLoading, isError } = useSubmissionDetails(
    router.query.request?.toString() || ""
  );

  return (
    <Main
      meta={
        <Meta
          title={`Request Help - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="Experts Profile"
    >
      <div className="mx-auto mt-9 max-w-5xl">
        <div
          className={`mt-3 mb-5 text-2xl font-bold tracking-tighter text-gray-900 transition-all duration-500 ease-in-out`}
        >
          Unmatch Request With Expert
        </div>
        <div
          className={`overflow-hidden rounded-2xl border border-gray-400 bg-white p-4 transition-all duration-500`}
        >
          <ProfileCard
            name={router.query.name?.toString() || ""}
            username={router.query.username?.toString() || ""}
            email={router.query.email?.toString() || ""}
            profileUrl={router.query.profileUrl?.toString() || ""}
          />
        </div>

        <div
          className={`my-6 overflow-hidden rounded-2xl border border-gray-400 bg-white p-6 transition-all duration-500`}
        >
          {isError && !isLoading && (
            <div className="flex items-center justify-center text-sm font-bold">
              Kindly Check Your Internet Connection!
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center">
              {isLoading && <CardSkeleton number={6} />}
            </div>
          )}
          {!isError &&
            !isLoading &&
            submissionDetails?.data?.map((submissionDetail: any) => (
              <div key={submissionDetail.id}>
                <div className="font-medium">
                  {submissionDetail.request_title}
                </div>
                <div className="col-span-3">
                  <div>
                    <div className="mt-7 mb-2 cursor-pointer text-sm font-medium text-indigo-700">
                      Description
                    </div>
                    <div className="prose-sm cursor-pointer text-sm text-slate-700">
                      <DescriptionCard
                        details={submissionDetail.request_details}
                      ></DescriptionCard>
                    </div>
                  </div>
                  <div
                    className={`${
                      submissionDetail.downloadUrl && "border-t py-6"
                    }`}
                  >
                    <div className="cursor-pointer text-sm font-medium text-indigo-700">
                      {submissionDetail.downloadUrl && "Resources"}
                    </div>
                    {submissionDetail.downloadUrl && (
                      <div className="mt-4 flex gap-4">
                        <ResourcesCard
                          fileUrls={submissionDetail.downloadUrl}
                        ></ResourcesCard>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          className={`my-6 overflow-hidden rounded-2xl border border-gray-400 bg-white p-6 transition-all duration-500`}
        >
          <UnmatchReason
            profileName={router.query.name?.toString() || ""}
            username={router.query.username?.toString() || ""}
            email={router.query.email?.toString() || ""}
            profileUrl={router.query.profileUrl?.toString() || ""}
            expertId={router.query.expertId?.toString() || ""}
          />
        </div>
      </div>
    </Main>
  );
};

export default Index;
