/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react";
import validator from "validator";

import { isEmpty } from "@/validator";

import { useStepperContext } from "../contexts/StepperContext";

const TitleDescriptionCard = ({ getDone }: any) => {
  const [error, setError] = useState(false);

  const { userData, setUserData } = useStepperContext();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (isEmpty(userData.request_title) || isEmpty(userData.request_details)) {
      getDone(false);
    } else {
      getDone(true);
    }
  }, [userData]);

  const savetoDb = async (e: any) => {
    e.preventDefault();
    if (
      validator.isEmpty(userData.request_title) ||
      validator.isEmpty(userData.request_details)
    ) {
      setError(true);
    }
  };
  return (
    <div>
      <div>
        <div className="mt-3 mb-1 px-5 text-xl font-bold text-slate-900 sm:text-2xl">
          Add Request
        </div>
        <div className="relative mx-5 items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This information will be displayed publicly on through the STI
            Policy Helpdesk domain.
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <form action="#" onSubmit={savetoDb}>
            <div className="sm:overflow-hidden">
              <div className="space-y-6 px-4 py-2 sm:p-5">
                <div>
                  <label
                    htmlFor="company-website"
                    className="block text-base font-medium text-slate-900"
                  >
                    Request Title
                  </label>
                  <div className="mt-1 flex rounded-2xl shadow-sm">
                    <span className="hidden items-center rounded-l-2xl border-2 border-r-0 border-slate-300 bg-gray-50 px-3 text-base text-gray-500 md:inline-flex">
                      Request for
                    </span>
                    <input
                      type="text"
                      name="request_title"
                      id="request_title"
                      className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base md:rounded-none md:rounded-r-md"
                      placeholder=""
                      value={userData.request_title}
                      style={{ border: error ? "2px solid red" : "" }}
                      onChange={handleChange}
                      required
                    />
                    {error ? (
                      <div style={{ color: "red" }}>
                        This is a required field
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                    Brief title of your project. Should be short and precise
                  </div>
                </div>
                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-base font-medium text-slate-900"
                  >
                    Estimated Budget
                  </label>
                  <div className="mt-1 flex rounded-2xl shadow-sm">
                    <span className="hidden items-center rounded-l-2xl border-2 border-r-0 border-slate-300 bg-gray-50 px-3 text-base text-gray-500 md:inline-flex">
                      Estimated amount $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base md:rounded-none md:rounded-r-md"
                      placeholder=""
                      value={userData.amount}
                      style={{ border: error ? "2px solid red" : "" }}
                      onChange={handleChange}
                      required
                    />
                    {error ? (
                      <div style={{ color: "red" }}>
                        This is a required field
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                    Estimated Budget
                  </div>
                </div>
                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div>
                  <label
                    htmlFor="aproximate_days"
                    className="block text-base font-medium text-slate-900"
                  >
                    Estimated Time of Completion (Days)
                  </label>
                  <div className="mt-1 flex rounded-2xl shadow-sm">
                    <span className="hidden items-center rounded-l-2xl border-2 border-r-0 border-slate-300 bg-gray-50 px-3 text-base text-gray-500 md:inline-flex">
                      Estimated Time of Completion (Days)
                    </span>
                    <input
                      type="number"
                      name="aproximate_days"
                      id="aproximate_days"
                      className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base md:rounded-none md:rounded-r-md"
                      placeholder=""
                      value={userData.aproximate_days}
                      style={{ border: error ? "2px solid red" : "" }}
                      onChange={handleChange}
                      required
                    />
                    {error ? (
                      <div style={{ color: "red" }}>
                        This is a required field
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                    Estimated Time of Completion
                  </div>
                </div>
                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-base font-medium text-slate-900"
                  >
                    Request details
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="request_details"
                      name="request_details"
                      rows={10}
                      className="mt-1 block w-full rounded-2xl border-2 border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                      placeholder="Description of Request/Need"
                      value={userData.request_details}
                      onChange={handleChange}
                      required
                    />
                    {error ? (
                      <div style={{ color: "red" }}>
                        This is a required field
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                    Detailed description for your request. URLs are hyperlinked.
                    Ensure to include references if any.
                  </div>
                  <p className="mt-2 text-base text-gray-500"></p>
                </div>

                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TitleDescriptionCard;
