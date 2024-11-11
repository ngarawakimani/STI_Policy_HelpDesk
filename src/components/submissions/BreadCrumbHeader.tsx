/* eslint-disable no-nested-ternary */
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import DarkButton from "@/components/buttons/DarkButton";
import LightButton from "@/components/buttons/LightButton";
import BreadCrumb from "@/components/submissions/BreadCrumb";

interface Props {
  title: string;
  description: string;
  darkButtonLink: string;
  darkButtonTitle: string;
  darkButtonIcon: string;
  lightButtonLink?: string;
  lightButtonTitle: string;
  lightButtonIcon: string;
  parentLink: string;
  currentLink: string;
  darkButtonClick?: () => void;
}

const BreadCrumbHeader = ({
  title,
  description,
  darkButtonLink,
  darkButtonIcon,
  darkButtonTitle,
  lightButtonLink,
  lightButtonTitle,
  lightButtonIcon,
  parentLink,
  darkButtonClick,
  currentLink,
}: Props) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { user } = useUser();

  return (
    <div
      className={`mt-1 bg-gradient-to-b from-green-50/50 px-20 transition-all duration-500 ease-in-out ${
        isSticky ? "sticky top-0 z-50 border-b bg-white" : "shadow-none "
      }`}
    >
      <div
        className={`${
          isSticky ? "hidden py-0" : "py-3"
        } transition-all duration-500 ease-in-out`}
      >
        <BreadCrumb parentLink={parentLink} current={currentLink} />
      </div>

      <div className="flex w-full justify-between">
        <div className="w-6/12">
          <h1
            className={`mt-3 font-bold tracking-tighter text-gray-900 transition-all duration-500 ease-in-out ${
              isSticky ? "text-2xl " : "text-3xl"
            }`}
          >
            {title}
          </h1>
          <div
            className={`text-sm text-gray-500 transition-all duration-500 ease-in-out ${
              isSticky ? "mb-4" : "mt-1"
            }`}
          >
            {description}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lightButtonTitle === "" ? (
            ""
          ) : (
            <LightButton
              link={lightButtonLink}
              title={lightButtonTitle}
              width="w-full"
              name={lightButtonIcon}
            />
          )}

          {darkButtonTitle === "" ? (
            ""
          ) : user?.unsafeMetadata.data === "expert" &&
            darkButtonTitle === "Add Work Request" ? (
            ""
          ) : (
            <DarkButton
              onClick={darkButtonClick}
              link={darkButtonLink}
              title={darkButtonTitle}
              width="w-full"
              name={darkButtonIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbHeader;
