import Link from "next/link";
import React from "react";

interface Props {
  buttonLink: string;
  name: string;
}

const HyperLinks = ({ buttonLink, name }: Props) => {
  return (
    <div>
      <Link
        href={buttonLink}
        aria-label=""
        className="group inline-flex text-sm font-bold text-blue-700 underline-offset-4 transition duration-200 hover:text-blue-900 hover:underline md:w-auto"
      >
        {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="my-auto ml-1 h-3 w-3 items-center text-blue-700 transition duration-200 ease-in-out group-hover:translate-x-[2px] group-hover:text-blue-900"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
};

export default HyperLinks;
