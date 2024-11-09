/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";

import { db } from "@/config/firebase";

interface Props {
  profileName: string;
  email: string;
  researcher_name: string;
  request_title: string;
  researcher_email: string;
  request_details: string;
  researcher_id: string;
}

const RequestMailer = ({
  profileName,
  email,
  request_title,
  researcher_email,
  researcher_id,
  request_details,
}: Props) => {
  const { user } = useUser();
  const [submitted, setSubmitted] = useState(false);

  console.log({
    profileName,
    email,
    request_title,
    researcher_email,
    researcher_id,
    request_details,
  });

  const handleInvite = async () => {
    setSubmitted(true);
    await addDoc(collection(db, "mail"), {
      to: user?.unsafeMetadata.data !== "expert" ? email : researcher_email,
      bid: user?.unsafeMetadata.data === "expert",
      invite: user?.unsafeMetadata.data !== "expert",
      from: user?.unsafeMetadata.data !== "expert" ? researcher_email : email,
      // userId:  user?.unsafeMetadata.data !== "expert" ? researcher_id : user?.id,
      timestamp: serverTimestamp(),
      template: {
        name: "mainTemplate",
        data: {
          main:
            user?.unsafeMetadata.data === "expert"
              ? `${profileName} has offered to help`
              : `${researcher_id} is requesting for your help`,
          subject:
            user?.unsafeMetadata.data === "expert"
              ? `${profileName} has offered to help you with, ${request_title}`
              : `${researcher_id} is requesting for your help with, ${request_title}`,
          body: `${request_details}. You can proceed by visiting the link below to take you to the STI Policy Help Desk Dashboard. Signin with your STI Policy Help Desk account. If you don't agree to their request/offer you are free to decline`,
        },
      },
    }).then(() => {
      setSubmitted(false);
      router.push("/submissions");
    });
  };
  return (
    <div>
      <div className="">
        <div className="mt-3 mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
          {user?.unsafeMetadata.data !== "expert"
            ? `Get Help From ${profileName}`
            : `Offer Help  for ${request_title}`}
        </div>
        <div className="relative items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This will send an email notification to the{" "}
            {user?.unsafeMetadata.data !== "expert" ? "Expert" : "SGC Member"}
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <form>
            <div className="sm:overflow-hidden">
              <div className="space-y-6 p-3 ">
                <div className="pt-5 text-xs font-normal text-gray-600">
                  This information will be visible to the request&apos;s owner.
                  By proceeding you agree to the STI Policy Help Desk&apos;s
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
        <div className="m-5 grid grid-cols-2">
          <button
            onClick={handleInvite}
            className={`${
              submitted ? "bg-slate-400" : "bg-slate-800  hover:bg-gray-800"
            }  mb-2 flex w-full items-center rounded-md px-5 py-3 text-center text-sm font-semibold text-white md:mr-2`}
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
            {user?.unsafeMetadata.data !== "expert"
              ? "Request for Help"
              : "Offer Help"}
          </button>
          <Link
            href="/submissions"
            className="mb-2 flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-gray-200 md:ml-2"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestMailer;
