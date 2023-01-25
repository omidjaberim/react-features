import { Isteps } from "model/etc/stepper.model";
import SingleStep from "./singelStep/SingleStep";

interface SteperProps {
  steps: Array<Isteps>
  setSteps: React.Dispatch<React.SetStateAction<Isteps[]>>
}

const Steper = (props:SteperProps) => {


  return (
    <div className="flex">
      {props.steps.map((step) => (
        <SingleStep {...step} />
      ))}
    </div>
  );
};

export default Steper;
