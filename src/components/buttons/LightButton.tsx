import Link from "next/link";
import React from "react";

import HeroIcon from "@/icons/HeroIcon";

interface Props {
  link: string;
  title: string;
  width: string;
  name: any;
}

const LightButton = ({ link, title, width, name }: Props) => {
  return (
    <div>
      <Link
        href={encodeURI(link)}
        className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-blue-900 transition duration-300 hover:bg-slate-50 hover:shadow-xl focus:outline-none ${width}`}
      >
        <HeroIcon name={name} />
        <div className="px-2">{title}</div>
      </Link>
    </div>
  );
};

export default LightButton;
