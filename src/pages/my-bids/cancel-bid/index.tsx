/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";

import { Main } from "@/base/Main";
import { db } from "@/config/firebase";
import HeroIcon from "@/icons/HeroIcon";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const CancelBid = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleDelete = async () => {
    setSubmitted(true);
    await deleteDoc(doc(db, "bids", router.query.id?.toString() || "")).then(
      function () {
        router.push({
          pathname: "/my-bids",
        });
      }
    );
  };
  return (
    <Main
      meta={
        <Meta
          title={`Cancel Bids - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab={"My Bids"}
    >
      <div className="px-20 py-10">
        <div
          className={` max-w-5xl overflow-hidden rounded-2xl border border-gray-400 bg-white p-4 px-10 transition-all duration-500`}
        >
          <div>
            <div className="mt-3 mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Cancel Bid
            </div>
            <div className="relative items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
              <div className="mb-4 text-xs font-normal text-gray-600">
                This information will be visible by the involved parties
              </div>
            </div>
            <div className="relative mt-3 items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
              <div className="mb-4 text-sm font-normal text-gray-600">
                Are you sure you want to cancel the Bid?
              </div>
            </div>
          </div>
          <div className="block rounded-xl sm:mt-0">
            <div className="my-5 grid grid-cols-4">
              <button
                onClick={handleDelete}
                className={`${
                  submitted ? "bg-red-400" : "bg-red-800  hover:bg-red-900"
                }  mb-2 flex w-full items-center rounded-md px-5 py-3 text-base font-semibold text-white md:mr-2`}
              >
                {" "}
                <HeroIcon
                  className={`${submitted ? "hidden" : "block"} `}
                  name="XCircleIcon"
                />
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
                <span className="ml-3">Cancel Bid</span>
              </button>
              <Link
                href={"/my-bids"}
                className="mb-2 rounded-md border border-gray-400 bg-white px-5 py-2.5 text-center text-base font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-gray-200 md:ml-2"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CancelBid;
