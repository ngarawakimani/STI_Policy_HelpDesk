import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { type Key, useEffect, useState } from "react";

import { Main } from "@/base/Main";
import Requirements from "@/components/cards/match/Requirements";
import DescriptionCard from "@/components/description/DescriptionCard";
import ResourcesCard from "@/components/description/ResourcesCard";
import ProfileCard from "@/components/profile/ProfileCard";
import FilePreview from "@/components/resources/FilePreview";
import RequestTerms from "@/components/terms";
import CardSkeleton from "@/components/utils/CardSkeleton";
import Loading from "@/components/utils/Loading";
import { getResearcher } from "@/database/db";
import { Meta } from "@/layouts/Meta";
import { useSubmissionDetails } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const router = useRouter();
  const { user } = useUser();
  const [researcherId, setResearcherId] = useState("");
  const [researcher, setResearcher] = useState<any>(null);
  const [isResearcherLoading, setIsResearcherLoading] =
    useState<boolean>(false);
  const [researcherError, setResearcherError] = useState<string | null>(null);

  console.log(user, router, "user");

  const { submissionDetails, isLoading, isError } = useSubmissionDetails(
    router.query.request?.toString() || ""
  );
  useEffect(() => {
    if (
      submissionDetails &&
      submissionDetails.data &&
      submissionDetails.data.length > 0
    ) {
      setResearcherId(submissionDetails.data[0].researcher_id);
    }
  }, [submissionDetails]);

  useEffect(() => {
    if (researcherId) {
      setIsResearcherLoading(true);
      getResearcher(researcherId)
        .then((response) => {
          if (response.researcher) {
            setResearcher(response.researcher);
          } else {
            setResearcherError("Failed to fetch researcher data");
          }
        })
        .catch((error) => {
          setResearcherError(error.message || "An error occurred");
        })
        .finally(() => {
          setIsResearcherLoading(false);
        });
    }
  }, [researcherId]);

  console.log("submissionDetails", submissionDetails);
  console.log("researcher", researcher);

  return (
    <Main
      meta={
        <Meta
          title={`Match Request - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="All Work Requests"
    >
      <div className="gap-4 md:grid md:grid-flow-row-dense md:grid-cols-4 ">
        <div className="col-span-full mx-auto mt-9 max-w-5xl px-10 lg:col-span-3">
          <div
            className={`mt-3 mb-5 text-2xl font-bold tracking-tighter text-gray-900 transition-all duration-500 ease-in-out`}
          >
            Request Help
          </div>
          <div
            className={`overflow-hidden rounded-2xl border border-gray-400 bg-white p-4 transition-all duration-500`}
          >
            {user?.unsafeMetadata.data !== "expert" && (
              <ProfileCard
                name={router.query.name?.toString() || ""}
                username={router.query.username?.toString() || ""}
                email={router.query.email?.toString() || ""}
                profileUrl={router.query.profileUrl?.toString() || ""}
              />
            )}
            {user?.unsafeMetadata.data === "expert" &&
              isError &&
              !isLoading && (
                <div className="flex items-center justify-center text-sm font-bold">
                  Kindly Check Your Internet Connection!
                </div>
              )}
            {user?.unsafeMetadata.data === "expert" && isLoading && (
              <div className="flex items-center justify-center">
                {isLoading && <CardSkeleton number={6} />}
              </div>
            )}
            {user?.unsafeMetadata.data === "expert" &&
              !isError &&
              !isLoading &&
              submissionDetails?.data?.map((submissionDetail: any) => (
                <div key={submissionDetail.id}>
                  <ProfileCard
                    name={submissionDetail.researcher_name}
                    username={submissionDetail.researcher_name}
                    email={submissionDetail.researcher_email}
                    profileUrl={submissionDetail.researcher_profile}
                  />
                </div>
              ))}
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
                {isLoading && <Loading />}
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
                      <p className=" text-sm text-indigo-700">
                        Budget:{" "}
                        {submissionDetail.estimated_cost
                          ? `$${submissionDetail.estimated_cost}`
                          : "flexible budget"}
                      </p>
                      <p className="text-sm text-indigo-700">
                        Estimated Time (Days):{" "}
                        {submissionDetail.aproximate_days
                          ? `${submissionDetail.aproximate_days}`
                          : "flexible"}
                      </p>

                      <div className="prose-sm cursor-pointer text-sm text-slate-700">
                        <DescriptionCard
                          details={submissionDetail.request_details}
                        ></DescriptionCard>
                      </div>
                    </div>
                    <div
                      className={`${
                        submissionDetail.resources && "border-t py-6"
                      }`}
                    >
                      <div className="cursor-pointer text-sm font-medium text-indigo-700">
                        {submissionDetail.resources && "Resources"}
                      </div>
                      {submissionDetail.resources ? (
                        <div className="mt-4 flex gap-4">
                          {submissionDetail.resources.map(
                            (resource: any, index: Key | null | undefined) => (
                              <div key={index}>
                                <ResourcesCard
                                  fileUrls={resource}
                                ></ResourcesCard>
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
                </div>
              ))}
          </div>

          <div
            className={`my-6 overflow-hidden rounded-2xl border border-gray-400 bg-white p-6 transition-all duration-500`}
          >
            {isLoading && (
              <div className="flex items-center justify-center">
                {isLoading && <Loading />}
              </div>
            )}

            {/* {user?.unsafeMetadata.data !== "expert" ? (
  <RequestMailer
                profileName={router.query.request?.toString() || ""}
                email={router.query.email?.toString() || ""}
                request_details={submissionDetails?.data?.[0]?.request_details}
                request_title={submissionDetails?.data?.[0]?.request_title}
                researcher_id={submissionDetails?.data?.[0]?.researcher_id}
                researcher_email={
                  submissionDetails?.data?.[0]?.researcher_email
                }
                researcher_name={submissionDetails?.data?.[0]?.researcher_name}
              />
) : (
  <RequestMailer
    profileName={user?.id || ""}
    email={user?.primaryEmailAddress?.emailAddress || ""}
    request_details={submissionDetails?.data?.[0]?.request_details}
    request_title={submissionDetails?.data?.[0]?.request_title}
    researcher_id={submissionDetails?.data?.[0]?.researcher_id}
    researcher_email={
      submissionDetails?.data?.[0]?.researcher_email
    }
    researcher_name={submissionDetails?.data?.[0]?.researcher_name}
  />
  )} */}

            {user?.unsafeMetadata.data !== "expert" ? (
              <RequestTerms
                profileName={router.query.name?.toString() || ""}
                username={router.query.username?.toString() || ""}
                email={router.query.email?.toString() || ""}
                profileUrl={router.query.profileUrl?.toString() || ""}
                expertId={router.query.expertId?.toString() || ""}
                area_of_expertise={submissionDetails?.data?.[0]?.sector_focus}
                matched={submissionDetails?.data?.[0]?.matched}
                request_details={submissionDetails?.data?.[0]?.request_details}
                request_title={submissionDetails?.data?.[0]?.request_title}
                researcher_email={
                  submissionDetails?.data?.[0]?.researcher_email
                }
                researcher_id={submissionDetails?.data?.[0]?.researcher_id}
                researcher_name={submissionDetails?.data?.[0]?.researcher_email}
                researcher_profile={
                  submissionDetails?.data?.[0]?.researcher_profile
                }
                sector_focus={submissionDetails?.data?.[0]?.sector_focus}
                resources={submissionDetails?.data?.[0]?.resources}
              />
            ) : (
              <RequestTerms
                profileName={user?.fullName || ""}
                username={user?.username || ""}
                email={user?.primaryEmailAddress?.emailAddress || ""}
                profileUrl={user?.profileImageUrl || ""}
                expertId={user?.id || ""}
                area_of_expertise={submissionDetails?.data?.[0]?.sector_focus}
                matched={submissionDetails?.data?.[0]?.matched}
                request_details={submissionDetails?.data?.[0]?.request_details}
                request_title={submissionDetails?.data?.[0]?.request_title}
                researcher_email={
                  submissionDetails?.data?.[0]?.researcher_email
                }
                researcher_id={submissionDetails?.data?.[0]?.researcher_id}
                researcher_name={submissionDetails?.data?.[0]?.researcher_email}
                researcher_profile={
                  submissionDetails?.data?.[0]?.researcher_profile
                }
                sector_focus={submissionDetails?.data?.[0]?.sector_focus}
                resources={submissionDetails?.data?.[0]?.resources}
              />
            )}
          </div>
        </div>
        <div className="mt-20 hidden py-5 md:block lg:block">
          <Requirements />
        </div>
      </div>
    </Main>
  );
};

export default Index;
