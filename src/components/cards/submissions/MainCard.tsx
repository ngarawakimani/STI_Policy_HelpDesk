/* eslint-disable tailwindcss/no-custom-classname */
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/dist/client/router";

interface DataProps {
  submissions: any;
  path: string;
}

const MainCard = ({ submissions, path }: DataProps) => {
  console.log(submissions, "submissions");
  const router = useRouter();
  const { user } = useUser();
  const getDone = (id: any, project_id: any) => {
    if (path === "My Invites" || path === "Invited Projects") {
      router.push({
        pathname: "/invites/description",
        query: { submission_id: id, project_id, path },
      });
    } else if (path === "My Bids" || path === "Bidded Projects") {
      router.push({
        pathname: "/bids/description",
        query: { submission_id: id, project_id, path },
      });
    } else {
      router.push({
        pathname: "/submissions/description",
        query: { submission_id: id, path },
      });
    }
  };
  return (
    <div>
      {submissions?.data
        ?.slice()
        .sort((a, b) => {
          // Safely access the timestamp and provide a fallback value of 0
          const timestampA = a.timestamp?.seconds ?? 0;
          const timestampB = b.timestamp?.seconds ?? 0;
          return timestampB - timestampA; // Sort in descending order (newest first)
        })
        .map((feed: any) => (
          <div
            key={feed.id}
            className={`${
              feed.invite || feed.bid
                ? "border-l-orange-300"
                : "border-l-primary"
            } group mt-6 rounded-2xl border border-l-4 border-gray-400  bg-white shadow transition hover:cursor-pointer hover:bg-gray-50`}
            onClick={() => {
              getDone(feed.id, feed.project_id);
            }}
          >
            {feed.invite ? (
              <div className="w-full rounded-t-2xl bg-orange-200 py-2 px-5 text-sm font-medium text-slate-800">
                {user?.unsafeMetadata.data === "expert"
                  ? "You have been invited by"
                  : "You have invited"}
                <span>
                  {" "}
                  {user?.unsafeMetadata.data === "expert"
                    ? feed.researcher_name
                    : feed.expert_name}{" "}
                </span>{" "}
                for <span>{feed?.duration}</span>
                <span>
                  {" "}
                  {feed.cost > 0 ? ` at $${feed.cost}` : " with no amount set"}
                </span>
              </div>
            ) : (
              ""
            )}

            {feed.bid ? (
              <div className="w-full rounded-t-2xl bg-orange-200 py-2 px-5 text-sm font-medium text-slate-800">
                {user?.unsafeMetadata.data === "expert"
                  ? "You have bidded on this project by"
                  : "This project has been bidded by"}
                <span>
                  {" "}
                  {user?.unsafeMetadata.data === "expert"
                    ? feed.researcher_email
                    : feed.expert_email}{" "}
                </span>{" "}
                for <span>{feed?.duration}</span>
                <span>
                  {" "}
                  {feed.cost > 0 ? ` at $${feed.cost}` : " with no amount set"}
                </span>
              </div>
            ) : (
              ""
            )}

            {path === "unmatched" ? (
              <div className="w-full rounded-t-2xl bg-red-200 py-2 px-5 text-sm font-medium text-red-800">
                This project has been unmatched from
                <span> {feed.unmatchedFrom.expert_name}</span>
                <span>
                  {" "}
                  {feed.unmatchReason ? ` Reason: ${feed.unmatchReason}` : ""}
                </span>
              </div>
            ) : (
              ""
            )}

            <div className="mb-2 flex justify-start p-1 pt-3">
              <div className="mt-2 flex w-full">
                <div className="ml-4 cursor-pointer text-xs text-indigo-700 underline">
                  {feed.researcher_email}
                </div>
              </div>
              <div className="flex justify-end pr-5">
                <span className="mr-2 h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-400 px-[7px] pt-2 text-center text-slate-400 transition duration-300 ease-out hover:border-red-500 hover:text-red-500 lg:h-10 lg:w-10 lg:px-[9px] lg:pt-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="20px"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="mx-3 mb-3 px-2 text-lg font-medium text-slate-800 hover:line-clamp-none group-hover:cursor-pointer group-hover:text-indigo-800 group-hover:underline md:text-xl lg:line-clamp-1">
              {feed.request_title}
            </div>
            <p className="mx-8 text-sm text-indigo-700">
              Budget:{" "}
              {feed.estimated_cost
                ? `$${feed.estimated_cost}`
                : "flexible budget"}
            </p>

            <p className="mx-8 text-sm text-indigo-700">
              Estimated Time (Days):{" "}
              {feed.aproximate_days ? `${feed.aproximate_days}` : "flexible"}
            </p>

            <div className="mt-3 mb-8 flex w-full">
              <div className="text-primary-500 mx-5 items-center rounded-md text-sm font-normal line-clamp-3 hover:line-clamp-none">
                {feed.request_details}
              </div>
            </div>
            <div className="mx-3 mb-3 px-2 text-base text-slate-700 line-clamp-3"></div>

            <div className="mx-3 flex justify-start px-2">
              <button
                type="button"
                className="mr-2 mb-2 rounded-full border border-slate-200 bg-gray-100 py-[6px] px-5 text-sm text-slate-600 hover:bg-slate-100 hover:text-blue-800"
              >
                {feed.area_of_expertise}
              </button>

              <button
                type="button"
                className="mr-2 mb-2 rounded-full border border-slate-200 bg-gray-100 py-[6px] px-5 text-sm text-slate-600 hover:bg-slate-100 hover:text-blue-800"
              >
                {feed.sector_focus}
              </button>

              {/* {feed.area_of_expertise?.map((item) => (
              <button
                type="button"
                key={item}
                className="mr-2 mb-2 rounded-full border border-slate-200 bg-slate-100 py-[6px] px-5 text-sm text-slate-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                {item}
              </button>
            ))} */}
            </div>

            <div className="relative mx-3 items-center self-center overflow-hidden text-gray-600 focus-within:text-gray-400">
              <hr className="my-3 h-px border-0 bg-gray-200" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MainCard;
