import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  username: string;
  email: string;
  profileUrl: string;
}

const ProfileCard = ({ name, username, email, profileUrl }: Props) => {
  return (
    <div>
      <div className="mx-2 flex items-start justify-between rounded-2xl p-4">
        <div>
          <div className="mb-2 flex">
            <div className="relative mr-5 inline-flex items-center">
              <Image
                className="rounded-full"
                src={
                  profileUrl !== undefined
                    ? profileUrl
                    : "/assets/images/placeholder.png"
                }
                width="50"
                height="50"
                alt={name}
              />
            </div>

            <div className="pr-1">
              <div className="inline-flex text-gray-800 hover:text-gray-900">
                <div className="justify-center text-lg font-semibold leading-snug">
                  {name}
                </div>
              </div>
              <div className="flex items-center">
                <span className=" text-gray-400"></span>
                <span className="text-sm">{username}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-sm">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
