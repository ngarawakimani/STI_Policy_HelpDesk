/* eslint-disable no-console */
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { db } from "@/config/firebase";

import { useStepperContext } from "../contexts/StepperContext";

const ReviewCard = () => {
  const { userData } = useStepperContext();
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(userData, "userData");
  console.log(user, "user");

  // const savetoDb = async () => {
  //
  //   console.log(docRef.id);
  //   router.push("/submissions");
  // };

  const savetoDb = async () => {
    setIsSubmitting(true); // Set to true when the submission starts

    // Ensure that downloadUrls exists and contains only defined values
    const sanitizedDownloadUrls = userData.downloadUrls
      ? userData.downloadUrls.filter((url: undefined) => url !== undefined)
      : [];

    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        request_title: userData.request_title,
        request_details: userData.request_details,
        // area_of_expertise: userData.area_of_expertise || "",
        sector_focus:
          userData.sector_focus === "Other"
            ? userData.other_sector_focus
            : userData.sector_focus,
        matched: false,
        // resources: userData.downloadUrls,
        resources: sanitizedDownloadUrls,
        researcher_id: user?.id,
        estimated_cost: userData.amount,
        timestamp: serverTimestamp(),
        aproximate_days: userData.aproximate_days,
        // researcher_name: `${user?.firstName} ${user?.lastName}`,
        researcher_profile: user?.profileImageUrl,
        researcher_email: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(docRef.id);
      router.push("/submissions");
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsSubmitting(false); // Reset after submission or error
    }
  };

  return (
    <div className="top-6">
      <div className="mt-10 sm:mt-0">
        {" "}
        <div className="mb-1 mt-3 px-5 text-2xl font-extrabold text-slate-900 sm:text-2xl">
          Review Submission
        </div>
        <div className="relative mx-5 items-center self-center overflow-hidden text-gray-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-slate-600">
            This information will be shown in the submission feed.
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="sm:overflow-hidden">
            <div className="space-y-6 px-4 py-2 sm:p-5">
              <div>
                <label
                  htmlFor="company-website"
                  className="block text-base font-medium text-slate-900"
                >
                  Request Title
                </label>
                <div className="mt-1 grid grid-cols-2 rounded-md">
                  <div className="mb-1 justify-start text-xl font-semibold text-slate-900 sm:text-2xl">
                    {userData.request_title}
                  </div>
                  <div className="mr-4 flex justify-end">
                    <Image
                      src="/assets/images/dash/edit.svg"
                      alt="Picture of the author"
                      width={29}
                      height={29}
                    />
                  </div>
                </div>
                <div className="text-xs font-normal text-slate-600">
                  Title of your request. Should be precise
                </div>
              </div>
              <hr className="my-8 h-px border-0 bg-gray-200"></hr>
              <div>
                <div>
                  <label
                    htmlFor="company-website"
                    className="block text-base font-medium text-slate-900"
                  >
                    Request details
                  </label>
                  <div className="mt-1 grid grid-cols-2 rounded-md">
                    <div className="mb-1 justify-start text-xl font-semibold text-slate-900 sm:text-2xl">
                      {userData.request_details}
                    </div>
                    <div className="mr-4 flex justify-end">
                      <Image
                        src="/assets/images/dash/edit.svg"
                        alt="Picture of the author"
                        width={29}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className="text-xs font-normal text-slate-600">
                    Detailed description for your requests need. URLs are
                    hyperlinked. Ensure to include references if any.
                  </div>
                </div>
              </div>
              <hr className="my-8 h-px border-0 bg-gray-200"></hr>
              <div className="grid grid-cols-2 divide-x">
                <div>
                  <label
                    htmlFor="company-website"
                    className="block text-base font-medium text-slate-900"
                  >
                    Area of Expertise Needed
                  </label>
                  <div className="mt-1 grid grid-cols-2 rounded-md">
                    <div className="mb-1 justify-start text-xl font-semibold text-slate-900 sm:text-2xl">
                      {userData.area_of_expertise}
                    </div>
                    <div className="mr-4 flex justify-end">
                      <Image
                        src="/assets/images/dash/edit.svg"
                        alt="Picture of the author"
                        width={29}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className="text-xs font-normal text-slate-600">
                    The Area of expertise of the request this could be the
                    category.
                  </div>
                </div>
                <div className="pl-3">
                  <label
                    htmlFor="company-website"
                    className="block text-base font-medium text-slate-900"
                  >
                    Sector Focus
                  </label>
                  <div className="mt-1 grid grid-cols-2 rounded-md">
                    <div className="mb-1 justify-start text-xl font-semibold text-slate-900 sm:text-2xl">
                      {userData.sector_focus === "Other"
                        ? userData.other_sector_focus
                        : userData.sector_focus}
                    </div>
                    <div className="mr-4 flex justify-end">
                      <Image
                        src="/assets/images/dash/edit.svg"
                        alt="Picture of the author"
                        width={29}
                        height={29}
                      />
                    </div>
                  </div>
                  <div className="text-xs font-normal text-slate-600">
                    Sector focus of your request i.e Agriculture, Industrial.
                  </div>
                </div>
              </div>

              <hr className="my-8 h-px border-0 bg-gray-200"></hr>
            </div>
            <hr className="my-4 h-3 border-0 bg-gray-200"></hr>
            <div className="bg-gray-50 px-4 text-right sm:px-6">
              <button
                type="button"
                className="mb-2 mr-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={savetoDb}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
