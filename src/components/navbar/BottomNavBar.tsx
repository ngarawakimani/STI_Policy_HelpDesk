import { useUser } from "@clerk/nextjs";
import { Popover } from "@headlessui/react";
import Link from "next/link";

const navigation: any[] = [
  // {
  //   name: "My Work Requests",
  //   href: "/submissions/my-submissions",
  //   current: false,
  // },
  // {
  //   name: "Unmatched Projects",
  //   href: "/submissions/unmatched-projects",
  //   current: false,
  // },
  // { name: "Drafts", href: "/submissions/drafts", current: false },
  // { name: "Cancelled", href: "/submissions/cancelled", current: false },
];

interface Props {
  currentTab: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BottomNavBar = ({ currentTab }: Props) => {
  const { user } = useUser();
  return (
    <Popover
      className={`${
        user?.unsafeMetadata.data !== "expert"
          ? "relative bg-white/20 px-20 lg:block"
          : "hidden"
      }`}
    >
      <>
        <div className="mx-auto">
          <div className="flex items-center py-3 md:justify-start">
            <div className="-my-2 -mr-2 flex justify-start md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-blue-900 hover:bg-gray-100 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
              </Popover.Button>
            </div>
            <Popover.Group
              as="nav"
              className="hidden justify-start space-x-5 md:flex "
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.name === currentTab
                      ? " bg-grey-100 text-slate-700 font-medium"
                      : "text-gray-700 hover:bg-grey-100 hover:text-slate-700",
                    "px-3 py-1 rounded-md text-sm"
                  )}
                  aria-current={item.name === currentTab ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </Popover.Group>
          </div>
        </div>
      </>
    </Popover>
  );
};

export default BottomNavBar;
