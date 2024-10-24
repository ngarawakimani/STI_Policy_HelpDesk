import { Menu } from "@headlessui/react";

const SideCard = () => {
  return (
    <div className=" mx-4 max-w-sm overflow-hidden rounded-xl border bg-slate-50/40 hover:bg-slate-50">
      <div className="flex">
        <div className="flex-1  p-1 ">
          <Menu as="div" className="relative mt-6 flex justify-center"></Menu>
          <div className="relative mx-5 items-center overflow-hidden text-gray-600 focus-within:text-gray-400">
            <div className="mb-1 text-sm font-normal text-indigo-700">
              Criteria For Selection
            </div>
          </div>
          <div className="my-2 px-5 text-sm text-slate-700">
            <ul>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Expertise fit with job requirements
              </li>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Financial viability
              </li>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Ethics
              </li>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Gender inclusion
              </li>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Sustainability
              </li>
              <li className="flex items-center py-2">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Ability of candidate to complete on time
              </li>
            </ul>
          </div>

          {/* <div className="mx-3 my-4 flex-1 rounded-lg border p-4 px-2 text-center text-sm"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SideCard;
