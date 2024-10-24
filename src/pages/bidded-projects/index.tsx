/* eslint-disable import/no-extraneous-dependencies */
import { Tabs } from "flowbite-react";

import { Main } from "@/base/Main";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

import BidList from "./bid-list";

const SubmissionsIndex = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Bidded Projects - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="Bidded Projects"
    >
      <BreadCrumbHeader
        title="Bidded Projects"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/submissions"
        darkButtonTitle="View All Projects"
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="An Overview of all Bids."
        parentLink="Projects"
        currentLink="Bidded Projects"
      />
      <div className="px-20">
        <div className="mt-4">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="All">
              <BidList />
            </Tabs.Item>
            <Tabs.Item title="Saved">
              Saved Content is under development
            </Tabs.Item>
          </Tabs.Group>
        </div>
      </div>
    </Main>
  );
};

export default SubmissionsIndex;
