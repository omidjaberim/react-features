import { Isteps } from "./stepper.model";

export interface StepperBackwardsForwards {
  setSteps?: React.Dispatch<React.SetStateAction<Isteps[]>>;
  steps?: Isteps[];
  currentSteps: number;
  beforeSteps?: number;
  afterSteps?: number;
}
