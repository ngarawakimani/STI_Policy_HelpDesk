import Image from "next/image";
import React, { useState } from "react";

import { useExperts } from "@/model";

import ProfileExpertCard from "../professional-profile/components/ProfileExpertCard";
import ProfileCard from "../profile/ProfileCard";
import CardSkeleton from "../utils/CardSkeleton";
import SubmissionTable from "./SubmissionTable";

const ExpertProfileCard = () => {
  const { experts, isLoading, isError } = useExperts();

  const [showDetail, setShowDetail] = useState(false);
  const [visible, setVisible] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    profileUrl: "",
    id: "",
    skill_description: "",
    area_of_expertise: "",
    resume: [],
    publications: [],
  });
  const handleItemClick = (
    expert: React.SetStateAction<{
      name: string;
      username: string;
      email: string;
      profileUrl: string;
      id: string;
      skill_description: any;
      area_of_expertise: any;
      resume: any;
      publications: any;
    }>
  ) => {
    setShowDetail(true);
    setVisible(false);
    setProfile(expert);
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  };

  const handleItemDismiss = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="flex gap-4">
      <div className={`${showDetail ? "hidden" : "w-full"}`}>
        {/* List of items */}
        <div
          className={`${
            showDetail ? "space-y-5" : "grid grid-cols-3 gap-5 py-5"
          }`}
        >
          {!isLoading &&
            !isError &&
            experts?.data?.map((expert: any) => (
              <div
                className={`group rounded-2xl border hover:bg-gray-50 hover:shadow-md ${
                  showDetail ? "border-gray-300" : "border-gray-400"
                }`}
                key={expert.id}
              >
                <div className="flex-col">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex">
                          <div className="relative mr-5 inline-flex items-center">
                            <Image
                              className="rounded-full"
                              src={
                                expert.profileUrl !== undefined
                                  ? expert.profileUrl
                                  : "/assets/images/placeholder.png"
                              }
                              width="50"
                              height="50"
                              alt={expert.name}
                            />
                          </div>

                          <div className="pr-1">
                            <div className="inline-flex text-gray-800 hover:text-gray-900">
                              <div className="justify-center text-base font-semibold leading-snug">
                                {expert.name}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className=" text-gray-400"></span>
                              <span className="text-sm">{expert.username}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative hidden shrink-0"
                        x-data="{ open: false }"
                      >
                        <button className="rounded-full text-gray-400  hover:text-gray-500 ">
                          <span className="sr-only">Menu</span>
                          <svg
                            className="h-8 w-8 fill-current"
                            viewBox="0 0 32 32"
                          >
                            <circle cx="16" cy="16" r="2" />
                            <circle cx="10" cy="16" r="2" />
                            <circle cx="22" cy="16" r="2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      {expert.area_of_expertise ? (
                        <span className="mt-2 rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-600">
                          Area of expertise:{" "}
                          <span className="uppercase">
                            {expert.area_of_expertise}
                          </span>
                        </span>
                      ) : (
                        <span className="mt-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-medium text-orange-600">
                          No area of expertise set by expert
                        </span>
                      )}
                      {expert.skill_description ? (
                        <div className="mt-2 text-sm line-clamp-1 hover:line-clamp-3">
                          {expert.skill_description}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm">
                          No description available for this expert.
                        </div>
                      )}
                      <div className="mt-2 text-sm text-indigo-800">
                        {expert.email}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300">
                    <div className="flex divide-x divide-gray-300">
                      <button
                        className="block flex-1 px-3 py-4 text-center text-sm font-medium text-indigo-600 hover:rounded-b-2xl hover:bg-indigo-900 hover:text-indigo-100"
                        onClick={() => {
                          handleItemClick(expert);
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <svg
                            className="mr-2 h-4 w-4 shrink-0 fill-current"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                          </svg>
                          <span>View Expert Details</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="col-span-3">
            {isLoading && <CardSkeleton number={6} />}
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showDetail
            ? "sticky top-0 w-full overflow-y-auto rounded-2xl border border-gray-400 bg-white p-4 shadow-2xl"
            : "hidden"
        }`}
      >
        {/* Detail page */}
        <div>
          <div className="flex items-start justify-between">
            <h2 className="m-2 text-2xl font-extrabold text-slate-700">
              View Expert Details
            </h2>
            <div>
              <button
                className="rounded-full text-gray-500  hover:text-gray-900"
                onClick={handleItemDismiss}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="my-4 border-b">
            <div className="rounded-xl border border-slate-300 bg-slate-50">
              <ProfileCard
                name={profile.name}
                username={profile.username}
                email={profile.email}
                profileUrl={profile.profileUrl}
              />
            </div>
            <div className="col-span-2 py-5">
              {!visible && (
                <div className="w-full">
                  <CardSkeleton number={5} />
                </div>
              )}
              {visible && <ProfileExpertCard account={profile} />}
            </div>
            <div className="mx-5 my-6">
              <h2 className="mb-4 text-base font-medium text-indigo-700">
                Request {profile.name}&apos;s help for
              </h2>
              <SubmissionTable
                name={profile.name}
                username={profile.username}
                email={profile.email}
                profileUrl={profile.profileUrl}
                expertId={profile.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileCard;
