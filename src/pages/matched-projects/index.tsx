import { Tabs } from "flowbite-react";

import { Main } from "@/base/Main";
import MatchedProjects from "@/components/projects/MatchedProjects";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`Projects - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="Matched Projects"
    >
      <BreadCrumbHeader
        title="All Projects"
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink="/requests/create"
        darkButtonTitle=""
        lightButtonIcon=""
        lightButtonLink=""
        lightButtonTitle=""
        description="An Overview of all your Matched Projects/Requests."
        parentLink="Home"
        currentLink="Projects"
      />
      <div className="mt-3 px-20">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="Matched Projects">
            <MatchedProjects />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </Main>
  );
};

export default Index;
