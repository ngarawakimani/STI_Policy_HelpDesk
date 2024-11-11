import type { CustomFlowbiteTheme } from "flowbite-react";

export const tabTheme: CustomFlowbiteTheme = {
  tab: {
    tablist: {
      tabitem: {
        base: "flex items-center justify-center py-4 px-10 text-sm first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          underline: {
            base: "rounded-t-lg border-gray-300",
            active: {
              on: "text-slate-800 font-medium rounded-t-lg border-b-2 border-slate-800 focus:outline-none active",
              off: "border-b-2 border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-600",
            },
          },
        },
      },
    },
    tabpanel: "py-1",
  },
};
