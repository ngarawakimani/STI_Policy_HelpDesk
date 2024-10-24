import { createContext, useContext, useState } from "react";

interface StepperContextProps {
  userData: {
    [key: string]: any;
  };
  setUserData: (data: { [key: string]: any }) => void;
}

const StepperContext = createContext<StepperContextProps>({
  userData: {},
  setUserData: () => {},
});

export function UseContextProvider({ children }: any) {
  const [userData, setUserData] = useState<{ [key: string]: any }>({});

  const contextValue: StepperContextProps = {
    userData,
    setUserData: (data: { [key: string]: any }) => {
      setUserData({ ...userData, ...data });
    },
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  );
}

export const useStepperContext = () => useContext(StepperContext);

// export function useStepperContext() {
//   const { userData, setUserData } = useContext(StepperContext);
//   return { userData, setUserData };
// }
