import { Tabs } from "flowbite-react";
import React from "react";

import { Main } from "@/base/Main";
import ExpertProfileCard from "@/components/experts/ExpertProfileCard";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Expert Profile - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="Experts Profile"
    >
      <BreadCrumbHeader
        title="Experts Profile"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/expert-profile"
        darkButtonTitle=""
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="Search, View and Connect with Experts."
        parentLink="Home"
        currentLink="Expert Profiles"
      />

      <div className={`mt-4 px-20`}>
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="All">
            <ExpertProfileCard />
          </Tabs.Item>
          <Tabs.Item title="Saved">
            Saved Content is under development
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </Main>
  );
};

export default Index;
