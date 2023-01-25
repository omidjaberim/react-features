import React, { useState } from "react";
import Identity from "components/repetitive-component/Identity-verification/Identity";
import SelectProductKind from "components/selectProductKind/SelectProductKind";
import { Isteps } from "model/etc/stepper.model";
import { useReturnSteps } from "config/stepper";
import CustomerType from "components/repetitive-component/CustomerType/CustomerType";
import AddressInformation from "components/repetitive-component/AddressInformation/AddressInformation";
import StyledStepper from "components/repetitive-component/StyledStepper/StyledStepper";
import PersonalInfo from "components/repetitive-component/PersonalInfo/PersonalInfo";
import OrderInterview from "components/repetitive-component/OrderInterView/OrderInterView";

const CreateUser = () => {
  const { StepsStepper } = useReturnSteps();
  const [steps, setSteps] = useState<Isteps[]>(StepsStepper);

  const handleBackStep = (stepNum: number) => {
    const allSteps = [...steps];
    const updatedSteps = allSteps.map((step) =>
      step.stepNum === stepNum ? { ...step, isActive: true } : { ...step }
    );
    setSteps(updatedSteps);
  };

  const renderComponentSteps = (stepNum: number | undefined) => {
    switch (stepNum) {
      case 0:
        return (
          <Identity
            setSteps={setSteps}
            steps={steps}
            afterSteps={1}
            currentSteps={0}
          />
        );
      case 1:
        return (
          <SelectProductKind
            setSteps={setSteps}
            steps={steps}
            currentSteps={1}
            beforeSteps={0}
            afterSteps={2}
          />
        );
      case 2:
        return (
          <CustomerType
            setSteps={setSteps}
            steps={steps}
            currentSteps={2}
            beforeSteps={1}
            afterSteps={3}
          />
        );
      case 3:
        return (
          <PersonalInfo
            setSteps={setSteps}
            steps={steps}
            currentSteps={3}
            beforeSteps={2}
            afterSteps={4}
          />
        );
      case 4:
        return (
          <AddressInformation
            setSteps={setSteps}
            steps={steps}
            currentSteps={4}
            beforeSteps={3}
            afterSteps={5}
          />
        );
      case 5:
        return null;
      case 6:
        return <OrderInterview />;
    }
  };

  return (
    <React.Fragment>
      <StyledStepper
        steps={steps}
        currentStep={steps.find((step) => step.isActive === true)?.stepNum}
        handleBackStep={handleBackStep}
      />
      {steps.length !== 0 &&
        renderComponentSteps(steps.find((item) => item.isActive)?.stepNum)}
    </React.Fragment>
  );
};

export default CreateUser;
