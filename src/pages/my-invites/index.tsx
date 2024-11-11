/* eslint-disable import/no-extraneous-dependencies */
import { Tabs } from "flowbite-react";

import { Main } from "@/base/Main";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

import InviteList from "./invite-list";

const SubmissionsIndex = () => {
  return (
    <Main
      meta={
        <Meta
          title={`My Invites - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="My Invites"
    >
      <BreadCrumbHeader
        title="My Invites"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/submissions"
        darkButtonTitle="View All Projects"
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="An Overview of all Invites."
        parentLink="Projects"
        currentLink="My Invites"
      />
      <div className="px-20">
        <div className="mt-4">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="All">
              <InviteList />
            </Tabs.Item>
            {/* <Tabs.Item title="Saved">
              Saved Content is under development
            </Tabs.Item> */}
          </Tabs.Group>
        </div>
      </div>
    </Main>
  );
};

export default SubmissionsIndex;
