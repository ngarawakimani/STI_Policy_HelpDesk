/* eslint-disable import/no-extraneous-dependencies */
import { Tabs } from "flowbite-react";

import { Main } from "@/base/Main";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import UnmatchedProjects from "@/components/unmatch/UnmatchedProjects";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const SubmissionsIndex = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Unmatched Projects - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="Unmatched Projects"
    >
      <BreadCrumbHeader
        title="Unmatched Projects"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/requests/create"
        darkButtonTitle=""
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="An Overview of all your Unmatched Projects."
        parentLink="Unmatched Projects"
        currentLink="Unmatched Projects"
      />
      <div className="px-20">
        <div className="mt-4">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="All">
              <UnmatchedProjects />
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
