import type { ReactNode } from "react";

import NavBar from "@/components/navbar";
import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  currentTab: string;
};

const Main = (props: IMainProps) => (
  <div className="relative w-full text-gray-700 antialiased">
    {props.meta}

    <div className="z-auto mx-auto">
      <header className="border-b border-gray-200 ">
        <NavBar currentTab={props.currentTab} />
      </header>

      <main className="mx-auto max-w-screen-2xl text-xl">{props.children}</main>

      <footer className=" py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}
      </footer>
    </div>
  </div>
);

export { Main };
