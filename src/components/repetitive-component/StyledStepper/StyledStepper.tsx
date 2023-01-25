import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Isteps } from "model/etc/stepper.model";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

interface IProps {
  steps: Isteps[];
  currentStep: number | undefined;
  handleBackStep: (stepNum: number) => void;
}

export default function StyledStepper(props: IProps) {
  const { steps, currentStep, handleBackStep } = props;

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#0d5c75 0%, 30%,#B07E73 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,#B07E73 0%,#B07E73 50%,#B07E73 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 5,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
      transition: "2s all",
      transitionTimingFunction: "linear",
    },
    [`& .${stepConnectorClasses.root}`]: {
        height: 10,
        border: 0,
        backgroundColor:
          theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
        transition: "2s all",
        transitionTimingFunction: "linear",
      },
  }));

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Stepper
        activeStep={currentStep}
        connector={<ColorlibConnector />}
        sx={{
          "& .MuiStep-horizontal": { padding: "0 !important" },
          "& .MuiStepConnector-line": {
            transition: "0.2s all",
            transitionTimingFunction: "linear",
          },
        }}
      >
        {steps.map(({ stepNum, title }) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step
              key={title}
              {...stepProps}
              onClick={() => handleBackStep(stepNum)}
              sx={{
                "& .MuiStepLabel-iconContainer": {
                  padding: "0 !important",
                },
                "& .MuiSvgIcon-root": {
                  transition: "0.2s all",
                  transitionTimingFunction: "linear",
                },
                "& .MuiStepLabel-root": { position: "relative" },
                "& .MuiStepLabel-label": {
                  position: "absolute",
                  width: "max-content",
                  top: "30px",
                  left: "0",
                  right: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  transform: "translate(-30%, -20%)",
                },
                "& .MuiSvgIcon-root.Mui-active": { color: "#0d5c75" },
                "& .MuiSvgIcon-root.Mui-completed": { color: "#B07E73" },
              }}
            >
              <StepLabel
                {...labelProps}
                onClick={() => handleBackStep(stepNum)}
              >
                {title}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
