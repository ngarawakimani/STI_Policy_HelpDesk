import { Menu } from "@headlessui/react";

const SideCard = () => {
  return (
    <div className=" mx-4 max-w-sm overflow-hidden rounded-xl border bg-slate-50/40 hover:bg-slate-50">
      <div className="flex">
        <div className="flex-1  p-1 ">
          <Menu as="div" className="relative mt-6 flex justify-center">
            <div>
              {/* <Image
                src={
                  ud[0].profile !== undefined
                    ? ud[0].profile
                    : "/assets/images/placeholder.png"
                }
                alt="Picture of the author"
                width={70}
                height={70}
                className="rounded-full"
              /> */}
            </div>
          </Menu>
          <div className="relative mx-5 items-center overflow-hidden text-gray-600 focus-within:text-gray-400">
            <div className="mb-1 text-xs font-normal text-indigo-700">
              {/* {ud[0].about} */}
              Description
            </div>
          </div>
          <div className="mb-1 px-5 text-base font-medium text-slate-700">
            {/* {`${ud[0].firstName} ${ud[0].lastName}`} */}
            Hover over submission titles to view detailed Description
          </div>
          <div className="mx-3 mb-3 flex-1 rounded-lg border p-4 px-2 text-center text-sm">
            {/* <Link href="/user" className="font-bold text-indigo-500">
              {" "}
              View Profile
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
