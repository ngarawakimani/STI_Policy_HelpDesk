/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Main } from "@/base/Main";
import Stepper from "@/components/professional-profile/components/Stepper";
import StepperControl from "@/components/professional-profile/components/StepperControl";
import { UseContextProvider } from "@/components/professional-profile/contexts/StepperContext";
import PublicationsCard from "@/components/professional-profile/views/PublicationsCard";
import ReviewCard from "@/components/professional-profile/views/ReviewCard";
import SkillsCard from "@/components/professional-profile/views/SkillsCard";
import Loading from "@/components/utils/Loading";
import { Meta } from "@/layouts/Meta";
import { useAccount } from "@/model";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [done, setDone] = useState(false);
  const { user } = useUser();
  const { account, isLoading, isError } = useAccount(user?.id);

  const steps = ["Skills", "Publications", "Review"];

  const handleClick = (direction: string) => {
    let newStep = currentStep;

    direction === "next" ? (newStep += 1) : (newStep -= 1);
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const getDone = (doneDetails: boolean) => {
    setDone(doneDetails);
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <SkillsCard getDone={getDone} account={account?.data[0]} />;
      case 2:
        return <PublicationsCard getDone={getDone} />;
      case 3:
        return <ReviewCard />;
      // case 4:
      //   return <ReviewCard />;
      default:
    }
    return "foo";
  };
  return (
    <Main
      meta={
        <Meta
          title={`Professional Profile - ${AppConfig.title}`}
          description={AppConfig.description}
        />
      }
      currentTab="All Work Requests"
    >
      <div className="mx-auto flex max-w-6xl justify-center py-2">
        <div className="container mt-5">
          <UseContextProvider>
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="my-12 rounded-2xl border border-gray-400 p-1">
              <div className="col-span-2 py-5">
                {isLoading && (
                  <div className="flex w-full items-center justify-center py-5">
                    <Loading />
                  </div>
                )}
                {!isLoading && !isError && displayStep(currentStep)}
              </div>

              <div className="px-4 text-right sm:px-6">
                {currentStep !== steps.length && (
                  <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps}
                    done={done}
                  />
                )}
              </div>
            </div>
          </UseContextProvider>
        </div>
      </div>
    </Main>
  );
};
export default Index;
