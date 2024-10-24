/* eslint-disable tailwindcss/no-custom-classname */
// import FeedCard from './feedcard';
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { Main } from "@/base/Main";
import ProfileExpertCard from "@/components/professional-profile/components/ProfileExpertCard";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { Meta } from "@/layouts/Meta";
import { useAccount } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

export default function UserProfile() {
  const { user } = useUser();
  const { account, isLoading, isError } = useAccount(user?.id);

  return (
    <>
      <Main
        meta={
          <Meta
            title={`My Professional Profile - ${AppConfig.title}`}
            description={AppConfig.description}
          />
        }
        currentTab={"My Profile"}
      >
        <div className="relative w-full items-center justify-center overflow-x-hidden px-20">
          <div className="mx-auto">
            <div className="block md:grid md:grid-flow-row-dense md:grid-cols-3">
              <div className="col-span-2 py-5">
                {isLoading && (
                  <div className="w-full">
                    <CardSkeleton number={5} />
                  </div>
                )}
                {!isLoading && !isError && (
                  <ProfileExpertCard account={account?.data[0]} />
                )}
              </div>
              <div className="sticky top-6 hidden py-6 md:block lg:block">
                <div className="mx-4 max-w-sm overflow-hidden rounded-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-1 rounded-xl border border-slate-300 bg-slate-100 p-1">
                      <div>
                        <div className="mt-1 flex flex-col items-center">
                          <div className="font-inter mx-6 my-3 text-lg font-bold text-slate-700">
                            Profile Photo
                          </div>
                          <Image
                            src={user?.profileImageUrl || ""}
                            alt="Picture of the author"
                            width={80}
                            height={80}
                            className="rounded-full"
                          />

                          <div className="relative mx-5 mt-3 items-center self-center overflow-hidden text-center text-gray-600 focus-within:text-gray-400">
                            <div className="text-xs font-normal text-grey-600">
                              Update your profile from the settings page
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="m-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
                      {/* {ud?.length ? ( */}
                      <div>
                        <div className="font-inter mx-6 mt-3 text-lg font-bold text-slate-700">
                          {`${user?.firstName} ${user?.lastName}`}
                        </div>
                        <div className="mx-6 mb-4 items-center text-xs font-normal text-gray-600 focus-within:text-gray-400">
                          Full name
                        </div>
                        <hr className="m-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
                        <div className="font-inter mx-6 mt-3 text-sm text-slate-700">
                          {user?.username}
                        </div>
                        <div className="mx-6 mb-4 mt-2 items-center text-xs font-normal text-gray-600 focus-within:text-gray-400">
                          Username
                        </div>
                        <hr className="m-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
                        <div className="font-inter mx-6 mt-3 text-sm text-slate-700">
                          {user?.primaryEmailAddress?.emailAddress}
                        </div>
                        <div className="mx-6 mb-4 mt-2 items-center text-xs font-normal text-gray-600 focus-within:text-gray-400">
                          Email
                        </div>
                        <div className="mx-3 mb-3 rounded-lg border p-4 px-2 text-center text-sm">
                          <Link
                            href="/professional-profile/create"
                            className="mr-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                          >
                            {" "}
                            Update Profile
                          </Link>
                        </div>
                      </div>
                      {/* ) : (
                        "Loading Profile"
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
