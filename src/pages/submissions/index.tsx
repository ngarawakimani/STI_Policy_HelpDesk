import { useUser } from "@clerk/nextjs";
import { Tabs } from "flowbite-react";
import { useRouter } from "next/router";

import { Main } from "@/base/Main";
import AllSubmissions from "@/components/submissions/AllSubmissions";
import BreadCrumbHeader from "@/components/submissions/BreadCrumbHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const SubmissionIndex = () => {
  const { user } = useUser();
  const router = useRouter();

  // console.log("User Metadata:", user?.unsafeMetadata.data); // Check the user metadata

  if (
    !user?.unsafeMetadata.data ||
    user.unsafeMetadata.data === "My Submissions"
  ) {
    router.push("/redirecting");
  }
  return (
    <Main
      meta={
        <Meta
          title={`Work Requests - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="All Work Requests"
    >
      <BreadCrumbHeader
        title="All Work Requests"
        lightButtonIcon="PlusCircleIcon"
        lightButtonLink={
          user?.unsafeMetadata.data === "expert"
            ? "/contact"
            : "/council/professional-profile"
        }
        lightButtonTitle={
          user?.unsafeMetadata.data === "expert"
            ? "Need Help?"
            : "Add a Professional Profile"
        }
        darkButtonIcon="DocumentArrowDownIcon"
        darkButtonLink={
          user?.unsafeMetadata.data === "expert"
            ? "/professional-profile/create"
            : "/requests/create"
        }
        darkButtonTitle={
          user?.unsafeMetadata.data === "expert"
            ? "Add a Professional Profile"
            : "Add a Work Request"
        }
        description="An Overview of all Work Requests from SGC Members to Experts"
        parentLink="Home"
        currentLink="All Work Requests"
      />
      <div className="px-20">
        <div className="mt-4">
          <Tabs.Group aria-label="Tabs with underline" style="underline">
            <Tabs.Item active={true} title="All">
              <AllSubmissions />
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

export default SubmissionIndex;
