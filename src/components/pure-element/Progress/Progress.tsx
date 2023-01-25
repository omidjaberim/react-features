import { Box, Typography } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
  LinearProgressPropsColorOverrides,
} from "@mui/material/LinearProgress";
import React from "react";

interface IProp {
  progress: number;
}

const Progress = (props: IProp & LinearProgressPropsColorOverrides) => {
  const { progress } = props;

  React.useEffect(() => {}, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};
export default Progress;

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
