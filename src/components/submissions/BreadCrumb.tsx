import React from "react";

interface Props {
  parentLink: string;
  current: string;
}

const BreadCrumb = ({ parentLink, current }: Props) => {
  return (
    <div>
      <nav className="flex text-gray-700 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-xs text-gray-700 hover:text-blue-600 "
            >
              {parentLink}
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                className="ml-1 text-xs text-gray-900 hover:text-blue-600 md:ml-2"
              >
                {current}
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
