/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { useUser } from "@clerk/nextjs";
import { addDoc, collection } from "firebase/firestore";
import router from "next/router";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import { isEmpty } from "@/validator";

interface Props {
  profileName: string;
  username: string;
  email: string;
  profileUrl: string;
  expertId: string;
  sector_focus: string;
  researcher_profile: string;
  researcher_name: string;
  researcher_id: string;
  request_title: string;
  researcher_email: string;
  request_details: string;
  matched: string;
  area_of_expertise: string;
  resources: any;
}

const RequestTerms = ({
  profileName,
  username,
  email,
  profileUrl,
  expertId,
  sector_focus,
  researcher_profile,
  researcher_name,
  researcher_id,
  request_title,
  researcher_email,
  request_details,
  matched,
  area_of_expertise,
  resources,
}: Props) => {
  console.log({
    profileName,
    username,
    email,
    profileUrl,
    expertId,
    sector_focus,
    researcher_profile,
    researcher_name,
    researcher_id,
    request_title,
    researcher_email,
    request_details,
    matched,
    area_of_expertise,
    resources,
  });
  const [userData, setUserData] = useState({
    cost: "",
    duration: "",
  });
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    if (isEmpty(userData.cost) || isEmpty(userData.duration)) {
      setDone(false);
    } else {
      setDone(true);
    }
  }, [userData]);

  const handleInvite = async () => {
    setSubmitted(true);
    if (user?.unsafeMetadata.data === "expert") {
      await addDoc(collection(db, "bids"), {
        project_id: router.query.request?.toString() || "",
        cost: userData.cost,
        duration: userData.duration,
        bid: true,
        invite: false,
        requester: user?.unsafeMetadata.data,
        requester_id: user?.id,
        expert_name: user?.fullName,
        expert_profile: user?.profileImageUrl,
        expert_email: user?.primaryEmailAddress?.emailAddress,
        expert_id: user?.id,
        expert_username: user?.username,
        sector_focus: sector_focus,
        researcher_profile: researcher_profile,
        researcher_name: researcher_name,
        researcher_id: researcher_id,
        request_title: request_title,
        researcher_email: researcher_email,
        request_details: request_details,
        resources,
        matched: matched,
        // area_of_expertise: area_of_expertise,
      }).then(function () {
        router.push({
          pathname: "/my-bids",
        });
      });
    } else {
      await addDoc(collection(db, "invites"), {
        project_id: router.query.request?.toString() || "",
        cost: userData.cost,
        duration: userData.duration,
        bid: false,
        invite: true,
        requester: user?.unsafeMetadata.data,
        requester_id: user?.id,
        expert_name: profileName,
        expert_profile: profileUrl,
        expert_email: email,
        expert_id: expertId,
        expert_username: username,
        sector_focus: sector_focus,
        researcher_profile: researcher_profile,
        researcher_name: researcher_name,
        researcher_id: researcher_id,
        request_title: request_title,
        researcher_email: researcher_email,
        request_details: request_details,
        matched: matched,
        area_of_expertise: area_of_expertise,
        resources,
      }).then(function () {
        router.push({
          pathname: "/my-invites",
        });
      });
    }
  };
  return (
    <div>
      <div className="">
        <div className="mt-3 mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
          Your Terms
        </div>
        <div className="relative items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This information will be visible by the expert
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <form>
            <div className="sm:overflow-hidden">
              <div className="space-y-6 p-3 ">
                <div>
                  <div>
                    <div className="mr-2">
                      <label
                        htmlFor="company-website"
                        className="block text-base font-medium text-slate-900"
                      >
                        Duration of the Project
                      </label>
                      <div className="mt-1 flex rounded-md">
                        <div className="flex">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-200 px-3 text-sm text-gray-900">
                            Estimated Duration (Days)
                          </span>
                        </div>
                        <input
                          type="text"
                          name="duration"
                          id="company-website"
                          value={userData.duration}
                          onChange={handleChange}
                          className="block w-full flex-1 rounded-none rounded-r-lg border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder=" "
                          required
                        />
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        Specify the estimated duration of the Project.
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                  <div>
                    <div className="mr-2">
                      <label
                        htmlFor="company-website"
                        className="block text-base font-medium text-slate-900"
                      >
                        {user?.unsafeMetadata.data === "expert"
                          ? "What's your preferred rate?"
                          : "What is the rate you'd like to support?"}
                      </label>
                      <div className="mt-1 flex rounded-md">
                        <div className="flex">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-200 px-3 text-sm text-gray-900">
                            $
                          </span>
                        </div>
                        <input
                          type="text"
                          name="cost"
                          id="company-website"
                          value={userData.cost}
                          onChange={handleChange}
                          className="block w-full flex-1 rounded-r-lg border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        If you don&apos;t have an amount you can type 0.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 text-xs font-normal text-gray-600">
                  This information will be visible by to the request&apos;s
                  owner. By proceeding you agree to the STI Policy Help
                  Desk&apos;s
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                  .
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="block rounded-xl sm:mt-0">
        {done ? (
          <div className="m-5 grid grid-cols-4">
            <button
              onClick={handleInvite}
              className={`${
                submitted ? "bg-slate-400" : "bg-slate-800  hover:bg-gray-800"
              }  mb-2 flex w-full items-center rounded-md px-5 py-3 text-base font-semibold text-white md:mr-2`}
            >
              <svg
                className={`${
                  submitted ? "block" : "hidden"
                } mr-3 h-5 w-5 animate-spin text-white`}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              {user?.unsafeMetadata.data === "expert"
                ? "Connect"
                : "Request for Help"}
            </button>
            <button
              type="button"
              className="mb-2 w-full rounded-md border border-gray-400 bg-white px-5 py-2.5 text-base font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-gray-200 md:ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RequestTerms;
