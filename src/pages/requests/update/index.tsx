// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Main } from "@/base/Main";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const OverviewCard = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Add Request - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="All Work Requests"
    >
      <div className="block bg-slate-50 px-20 lg:grid lg:grid-flow-row-dense lg:grid-cols-4">
        <div className="container top-6 col-span-3 my-12 mt-10 rounded-xl border border-slate-200 bg-white p-1 shadow-xl sm:mt-0">
          <div className="mt-3 mb-1 px-5 text-xl font-bold text-slate-900 sm:text-2xl">
            Update Request
          </div>
          <div className="relative mx-5 items-center self-center overflow-hidden text-slate-600 focus-within:text-gray-400">
            <div className="mb-4 text-xs font-normal text-gray-600">
              This information will be displayed publicly on through the EviSTI
              domain.
            </div>
          </div>
          <div className="mt-3 md:mt-0">
            <form action="#">
              <div className="sm:overflow-hidden">
                <div className="space-y-6 px-4 py-2 sm:p-5">
                  <div>
                    <label
                      htmlFor="company-website"
                      className="block text-base font-medium text-slate-900"
                    >
                      Request Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="hidden items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-50 px-3 text-base text-gray-500 md:inline-flex">
                        Request for
                      </span>
                      <input
                        type="text"
                        name="primary_need"
                        id="pr-mary"
                        className="block w-full flex-1 rounded-md border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base md:rounded-none md:rounded-r-md"
                        placeholder=" "
                        required
                      />
                    </div>
                    <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                      Brief title of your project. Should be short and precise
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
                        id="about"
                        name="primary_gap"
                        rows={7}
                        className="mt-1 block w-full rounded-md border border-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                        placeholder="Description of Request/Need"
                        required
                      />
                    </div>
                    <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                      Detailed description for your request. URLs are
                      hyperlinked. Ensure to include references if any.
                    </div>
                    <p className="mt-2 text-base text-gray-500"></p>
                  </div>

                  <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                  <div className="grid grid-cols-2 divide-x">
                    <div className="mr-2">
                      <label
                        htmlFor="company-website"
                        className="block text-base font-medium text-slate-900"
                      >
                        Area of Expertise Needed
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="area_of_expertise"
                          id="company-website"
                          className="block w-full flex-1 rounded-md border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder=" "
                          required
                        />
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        The Area of expertise of the project this could be the
                        category.
                      </div>
                    </div>
                    <div className="px-2">
                      <label
                        htmlFor="company-website"
                        className="block text-base font-medium text-slate-900"
                      >
                        Sector Focus
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="business_focus"
                          id="company-website"
                          className="block w-full flex-1 rounded-md border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                          placeholder=" "
                          required
                        />
                      </div>
                      <div className="mt-2 text-xs font-normal text-slate-700">
                        Sector focus of your request i.e Agriculture,
                        Industrial.
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 h-px border-0 bg-gray-200"></hr>
                  <div className="bg-gray-50 px-4 text-right">
                    <button
                      type="button"
                      className="mr-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                      Submit Request
                    </button>
                  </div>
                  {/* <div className="px-2">
                    <label
                      htmlFor="company-website"
                      className="block text-base font-medium text-slate-900"
                    >
                      Help Required
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="hidden items-center rounded-l-md border border-r-0 border-slate-400 bg-gray-50 px-3 text-base text-gray-500 md:inline-flex"></span>
                      <input
                        type="text"
                        name="help_required"
                        id="pr-mary"
                        className="block w-full flex-1 rounded-md border-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base md:rounded-none md:rounded-r-md"
                        placeholder=" "
                        required
                      />
                    </div>
                    <div className="mt-2 ml-3 text-xs font-normal text-slate-700">
                      Brief explanation od your project need.
                    </div> */}
                  {/* </div> */}
                </div>
                <hr className="my-4 h-px border-0 bg-gray-200"></hr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default OverviewCard;
