import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { useMySubmissions } from "@/model";

import CardSkeleton from "../utils/CardSkeleton";

interface Props {
  name: string;
  username: string;
  email: string;
  profileUrl: string;
  expertId: string;
}

const SubmissionTable = ({
  name,
  username,
  email,
  profileUrl,
  expertId,
}: Props) => {
  const { user } = useUser();

  const { mySubmissions, isLoading, isError } = useMySubmissions(user?.id);

  return (
    <div>
      {isError && !isLoading && (
        <div className="flex items-center justify-center text-sm font-bold">
          Kindly Check Your Internet Connection!
        </div>
      )}
      {isLoading && <CardSkeleton number={6} />}

      {!isError &&
        !isLoading &&
        mySubmissions?.data?.map((submission: any) => (
          <div
            className="relative mt-5 overflow-x-auto rounded-2xl border border-gray-300"
            key={submission.id}
          >
            <table className="w-full text-left text-sm text-gray-50">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    My Requests
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 hover:cursor-pointer hover:text-indigo-900 hover:underline">
                    {submission.request_title}
                  </td>
                  <td className="px-6 py-4 line-clamp-1"></td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={{
                        pathname: "match",
                        query: {
                          request: submission.id,
                          name,
                          username,
                          email,
                          profileUrl,
                          expertId,
                        },
                      }}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Connect
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default SubmissionTable;
