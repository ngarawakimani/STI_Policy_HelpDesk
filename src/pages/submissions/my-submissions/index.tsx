/* eslint-disable import/no-extraneous-dependencies */
import { Tabs } from "flowbite-react";

import { Main } from "@/base/Main";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import MySubmissions from "@/components/submissions/MySubmissions";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const SubmissionsIndex = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Submissions - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="My Work Requests"
    >
      <BreadCrumbHeader
        title="My Work Requests"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/requests/create"
        darkButtonTitle="Add a Work Request"
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="An Overview of all your Work Requests to Experts"
        parentLink="My Work Requests"
        currentLink="My Work Requests"
      />
      <div className="px-20">
        <div className="mt-4">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="All">
              <MySubmissions />
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
