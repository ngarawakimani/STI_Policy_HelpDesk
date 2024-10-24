import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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
}

const UnmatchReason = ({
  profileName,
  username,
  email,
  profileUrl,
  expertId,
}: Props) => {
  const [userData, setUserData] = useState({
    reason: "",
  });
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    if (isEmpty(userData.reason)) {
      setDone(false);
    } else {
      setDone(true);
    }
  }, [userData]);
  const handleUnmatch = async () => {
    setSubmitted(true);
    const referenceData = doc(
      db,
      "submissions",
      router.query.request?.toString() || ""
    );
    await updateDoc(referenceData, {
      unmatchReason: userData.reason,
      matched: false,
      unmatched: true,
      unmatchedFrom: arrayUnion({
        expert_name: profileName,
        expert_profile: profileUrl,
        expert_email: email,
        expert_id: expertId,
        expert_username: username,
        timestamp: serverTimestamp(),
      }),
    });
  };
  return (
    <div>
      <div className="">
        <div className="mt-3 mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
          Reason for Unmatching
        </div>
        <div className="relative items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This information will be not be visible
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
                        Reason for Unmatching
                      </label>
                      <div className="mt-1 flex rounded-md">
                        <div className="flex">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-200 px-3 text-sm text-gray-900">
                            Enter your reason
                          </span>
                        </div>
                        <textarea
                          rows={10}
                          name="reason"
                          id="reason"
                          value={userData.reason}
                          onChange={handleChange}
                          className="block w-full flex-1 rounded-none rounded-r-lg border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder=" "
                          required
                        />
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        Specify the reason for cancellation/unmatching Project.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 text-xs font-normal text-gray-600">
                  This information will be visible by the entrepreneur. By
                  proceeding you agree to the STI Policy Help Desk&apos;s{" "}
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
              onClick={handleUnmatch}
              className={`${
                submitted ? "bg-slate-400" : "bg-slate-800  hover:bg-gray-800"
              } col-span-3 mb-2 w-full rounded-md px-5 py-3 text-base font-semibold text-white md:mr-2`}
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
              Unmatch Project
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

export default UnmatchReason;
