import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ForwardedRef, forwardRef, RefObject } from "react";

const CustomTextField = forwardRef(
  (props: TextFieldProps, ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined) => {
    return <TextField ref={ref} {...props} />;
  }
);

export default CustomTextField;