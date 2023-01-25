import React, { useState } from "react";
import AddressInformation from "components/repetitive-component/AddressInformation/AddressInformation";
import PersonalInfo from "components/repetitive-component/PersonalInfo/PersonalInfo";
import StyledStepper from "components/repetitive-component/StyledStepper/StyledStepper";
import { Isteps } from "model/etc/stepper.model";
import { useTranslation } from "react-i18next";

const AddUserContainer = () => {
  const { t } = useTranslation();
  const personalInfo = t("PersonalInfo");
  const locationInfo = t("LocationInfo");
  const [steps, setSteps] = useState<Isteps[]>([
    { stepNum: 0, title: personalInfo, isActive: true },
    { stepNum: 1, title: locationInfo, isActive: false },
  ]);

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
          <PersonalInfo
            setSteps={setSteps}
            steps={steps}
            afterSteps={1}
            currentSteps={0}
          />
        );
      case 1:
        return (
          <AddressInformation
            setSteps={setSteps}
            steps={steps}
            currentSteps={1}
            beforeSteps={0}
          />
        );
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
export default AddUserContainer;
