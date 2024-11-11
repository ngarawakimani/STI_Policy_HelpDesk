import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { AppConfig } from "@/utils/AppConfig";

const counselor = [
  { name: "All Work Requests", href: "/submissions", current: true },
  {
    name: "My Work Requests",
    href: "/submissions/my-submissions",
    current: false,
  },
  { name: "Experts Profile", href: "/expert-profile", current: false },
  { name: "My Invites", href: "/my-invites", current: false },
  { name: "Bidded Projects", href: "/bidded-projects", current: false },
  { name: "Matched Projects", href: "/project", current: false },
  // { name: "Contact", href: "/contact", current: false },
];

const expert = [
  { name: "Work Requests", href: "/submissions", current: true },
  { name: "My Profile", href: "/professional-profile/create", current: true },
  { name: "My Bids", href: "/my-bids", current: false },
  { name: "Invited Work Requests", href: "/invited-projects", current: false },
  { name: "Matched Projects", href: "/matched-projects", current: false },
  // { name: "Contact", href: "/contact", current: false },
];

interface Props {
  currentTab: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TopNavBar = ({ currentTab }: Props) => {
  const { user } = useUser();
  return (
    <Disclosure as="nav" className={`px-10`}>
      <>
        <div className="mx-auto sm:px-6 sm:py-2 lg:px-0">
          <div className="relative flex h-14 items-center justify-between lg:h-10">
            <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
              <div className="flex shrink-0 items-center">
                <Image
                  src="/assets/images/acts-logo.png"
                  alt="STI Policy Helpdesk"
                  width={40}
                  height={40}
                />
                <span className="ml-4 font-black text-slate-800">
                  {AppConfig.site_name}
                </span>
              </div>
              <div className="hidden items-center truncate lg:ml-20 lg:flex">
                <div className="flex items-center space-x-4">
                  {(user?.unsafeMetadata.data === "expert"
                    ? expert
                    : counselor
                  ).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.name === currentTab
                          ? " bg-slate-800 text-white font-medium"
                          : "text-grey-600 hover:bg-gray-900 hover:text-white",
                        "px-3 py-1 rounded-md text-sm "
                      )}
                      aria-current={
                        item.name === currentTab ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
              <div className="w-full text-gray-600 lg:w-auto lg:pr-3 lg:pt-0">
                <div className="flex flex-col gap-6 truncate font-medium tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                  {user?.unsafeMetadata.data === "expert" ? (
                    <div className="hidden rounded-full bg-orange-200/50 px-4 py-1.5 text-orange-600 transition lg:block lg:text-xs">
                      <span>You&apos;re signed in as an Expert</span>
                    </div>
                  ) : (
                    <div className="hidden rounded-full bg-indigo-200/50 px-4 py-1.5 text-indigo-600 transition lg:block lg:text-xs">
                      <span>You&apos;re signed in as a Council Member</span>
                    </div>
                  )}
                </div>
              </div>
              <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton
                  appearance={{
                    variables: {
                      fontFamily: "Inter",
                    },
                    userProfile: { variables: { fontFamily: "Inter" } },
                  }}
                  afterSignOutUrl="/sign-in"
                />
              </SignedIn>
              <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
              </SignedOut>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 hidden">
                <div>
                  <Menu.Button className="flex rounded-full text-sm ">
                    <span className="sr-only">Open user menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-9 w-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    {/* <img className="h-9 w-9 rounded-full" src="" alt="" /> */}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {(user?.unsafeMetadata.data === "expert" ? expert : counselor).map(
              (item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.name === currentTab
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.name === currentTab ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              )
            )}
          </div>
        </Disclosure.Panel>
      </>
    </Disclosure>
  );
};

export default TopNavBar;
