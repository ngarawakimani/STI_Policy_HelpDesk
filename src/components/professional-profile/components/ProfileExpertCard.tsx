/* eslint-disable tailwindcss/no-custom-classname */
import { useUser } from "@clerk/nextjs";
import type { Key } from "react";
import { useState } from "react";

import ResourcesCard from "@/components/description/ResourcesCard";
import FilePreview from "@/components/resources/FilePreview";

interface Props {
  account: any;
}

const ProfileExpertCard = ({ account }: Props) => {
  const { user } = useUser();
  // const reference = doc(db, "users", user?.id || "0");

  const [userData, setUserData] = useState({
    skill_description: "",
    area_of_expertise: "",
  });

  const getDetails = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const savetoDb = async () => {
  //   try {
  //     await updateDoc(reference, {
  //       skill_description: userData.skill_description,
  //       area_of_expertise: userData.area_of_expertise,
  //     });
  //   } catch (err) {
  //     //
  //   }
  // };
  return (
    <div>
      <div className="top-6 mt-4">
        <div className="rounded-xl border border-slate-300 bg-white p-1">
          <div className="mt-10 sm:mt-0">
            <div className="font-playfair mt-3 mb-1 px-5 text-xl font-bold text-slate-700 sm:text-2xl">
              {user?.unsafeMetadata.data === "experts"
                ? "My Profile"
                : "Expertise"}
            </div>
            <div className="relative mx-5 items-center self-center overflow-hidden text-gray-600 focus-within:text-gray-400">
              <div className="mb-4 text-xs font-normal text-grey-600">
                This information will be displayed publicly throughout the STI
                Policy Helpdesk domain.
              </div>
            </div>
            <div className="mt-5 md:mt-0">
              <form action="#" method="POST">
                <div className="sm:overflow-hidden">
                  <div className="space-y-6 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Area of Expertise
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-50 px-3 text-sm text-gray-500">
                            expert in
                          </span>
                          <input
                            type="text"
                            name="area_of_expertise"
                            value={
                              account.area_of_expertise
                                ? account.area_of_expertise
                                : userData.area_of_expertise
                            }
                            onChange={getDetails}
                            id="area_of_expertise"
                            className="block w-full flex-1 rounded-none rounded-r-md border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder=""
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Skills
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="skill_description"
                          name="skill_description"
                          value={
                            account.skill_description
                              ? account.skill_description
                              : userData.skill_description
                          }
                          onChange={getDetails}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          disabled
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your skills. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>
                  <div className="border-t py-6 px-5">
                    <div className="text-sm font-medium text-indigo-700">
                      Resume and Publications
                    </div>
                    {account.resume || account.publications ? (
                      <div className="mt-4 flex gap-4">
                        {account?.resume.map(
                          (resource: any, index: Key | null | undefined) => (
                            <div key={index}>
                              <ResourcesCard
                                fileUrls={resource}
                              ></ResourcesCard>
                            </div>
                          )
                        )}
                        {account?.publications.map(
                          (
                            publications: any,
                            index: Key | null | undefined
                          ) => (
                            <div key={index}>
                              <ResourcesCard
                                fileUrls={publications}
                              ></ResourcesCard>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <FilePreview fileName="No Files uploaded" />
                      </div>
                    )}
                  </div>
                  {/* <div className="bg-gray-50 px-4 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => {
                        savetoDb();
                      }}
                      className="mr-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Save
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileExpertCard;
