import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ steps, currentStep }: any) => {
  const [newStep, setNewStep] = useState<any>([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber: number, step: any) => {
    const newSteps = [...step];
    let count = 0;
    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count += 1;
      }

      // step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count += 1;
      }
      // step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count += 1;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step: any, index: number) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map(
    (
      step: {
        selected: any;
        completed: any;
        highlighted: any;
        description:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined;
      },
      index: any
    ) => {
      return (
        <div
          key={index}
          className={
            index !== newStep.length - 1
              ? "flex w-full items-center"
              : "flex items-center"
          }
        >
          <div className="relative flex flex-col items-center text-slate-800">
            <div
              className={`flex h-12 w-28 items-center justify-center rounded-lg border-2 border-gray-300 py-3 transition duration-500 ease-in-out  ${
                step.selected
                  ? "border border-slate-800 bg-slate-800 font-bold text-white "
                  : ""
              }`}
            >
              {step.completed && !step.highlighted && (
                <span className="text-xl font-bold text-white">&#10003;</span>
              )}
              {step.highlighted && index + 1}
              {!step.completed && index + 1}
            </div>
            <div
              className={`absolute top-0  mt-14 w-32 text-center text-xs font-medium uppercase ${
                step.highlighted ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {step.description}
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
              step.completed ? "border-slate-600" : "border-gray-300 "
            }  `}
          ></div>
        </div>
      );
    }
  );

  return (
    <div className="mx-4 flex items-center justify-between">{stepsDisplay}</div>
  );
};
export default Stepper;
