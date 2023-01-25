import { Isteps } from "model/etc/stepper.model";
import { StyledSingleStep } from "./style";

const SingleStep = (props: Isteps) => {
  const { isActive, stepNum, title } = props;

  return (
    <StyledSingleStep
      className={` ${
        isActive ? "bg-primary text-white" : "bg-background2 text-text2"
      } bg-primary py-2 text-center relative 2xl:text-base xl:text-xs`}
    >
      <p>
        <span className="me-3">{stepNum}</span>
        <span>{title}</span>
      </p>
      <div className="shap shap-1 bg-mainBg"></div>
      <div className="shap shap-2 bg-mainBg"></div>
      {/* <div className="shap shap-3 bg-mainBg"></div>
      <div className="shap shap-4 bg-mainBg"></div> */}
    </StyledSingleStep>
  );
};
export default SingleStep;
