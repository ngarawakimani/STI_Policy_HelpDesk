/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";

import { Main } from "@/base/Main";
import Stepper from "@/components/requests/components/Stepper";
import StepperControl from "@/components/requests/components/StepperControl";
import { UseContextProvider } from "@/components/requests/contexts/StepperContext";
import AdditionalCard from "@/components/requests/views/AdditionalCard";
import ReviewCard from "@/components/requests/views/ReviewCard";
import TitleDescriptionCard from "@/components/requests/views/TitleDescriptionCard";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [done, setDone] = useState(false);

  const steps = ["Overview", "Additional", "Review"];

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
        return <TitleDescriptionCard getDone={getDone} />;
      case 2:
        return <AdditionalCard getDone={getDone} />;
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
          title={`Add Request - ${AppConfig.title}`}
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
              {displayStep(currentStep)}

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
