/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react";
import validator from "validator";

import { useStepperContext } from "../contexts/StepperContext";

const SkillsCard = ({ getDone, account }: any) => {
  const [error, setError] = useState(false);

  const { userData, setUserData } = useStepperContext();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (
      userData.skill_description === undefined ||
      userData.area_of_expertise === undefined
    ) {
      getDone(false);
    } else {
      getDone(true);
    }
  }, [userData]);

  const savetoDb = async (e: any) => {
    e.preventDefault();
    if (validator.isEmpty(userData.skill_description)) {
      setError(true);
    }
  };
  return (
    <div>
      <div>
        <div className="mt-3 mb-1 px-5 text-xl font-bold text-slate-900 sm:text-2xl">
          Add Skills and Expertise
        </div>
        <div className="relative mx-5 items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
          <div className="mb-4 text-xs font-normal text-gray-600">
            This information will be displayed to council members on through the
            STI Policy Helpdesk domain.
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <form action="#" onSubmit={savetoDb}>
            <div className="sm:overflow-hidden">
              <div className="space-y-6 px-4 py-2 sm:p-5">
                <div>
                  <label
                    htmlFor="about"
                    className="block text-base font-medium text-slate-900"
                  >
                    Write a Brief Description of your skills
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="skill_description"
                      name="skill_description"
                      rows={10}
                      className="mt-1 block w-full rounded-2xl border-2 border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                      placeholder="Description of Skills"
                      value={
                        userData.skill_description === undefined
                          ? account?.skill_description
                          : userData.skill_description
                      }
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
                    Write a brief description for your skills. URLs are
                    hyperlinked. Ensure to include references if any.
                  </div>
                  <p className="mt-2 text-base text-gray-500"></p>
                </div>

                <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                <div className="mr-2">
                  <label
                    htmlFor="area_of_expertise"
                    className="block text-base font-medium text-slate-900"
                  >
                    Your Area of Expertise
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <select
                      name="area_of_expertise"
                      id="area_of_expertise"
                      className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                      placeholder=" "
                      value={
                        userData.area_of_expertise === undefined
                          ? account?.area_of_expertise
                          : userData.area_of_expertise
                      }
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select an option
                      </option>
                      <option value="Science, technology and innovation policy analysis">
                        Science, technology and innovation policy analysis
                      </option>
                      <option value="Innovation management">
                        Innovation management
                      </option>
                      <option value="Technology management">
                        Technology management
                      </option>
                      <option value="Social studies of research and/or science, technology and innovation">
                        Social studies of research and/or science, technology
                        and innovation
                      </option>
                      <option value="Monitoring, evaluation and learning">
                        Monitoring, evaluation and learning
                      </option>
                      <option value="Data management systems">
                        Data management systems
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mt-2 text-xs font-normal text-slate-700">
                    Your Area of expertise.
                  </div>
                </div>
                {userData.area_of_expertise === "Other" ? (
                  <div className="px-2">
                    <label
                      htmlFor="other_area_of_expertise"
                      className="block text-base font-medium text-slate-900"
                    >
                      Specify Other
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="other_area_of_expertise"
                        id="other_area_of_expertise"
                        className="block w-full flex-1 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 
                            sm:text-base"
                        placeholder=""
                        value={userData.other_area_of_expertise}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
