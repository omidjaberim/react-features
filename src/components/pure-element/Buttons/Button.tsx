import Button, { ButtonProps } from "@mui/material/Button";
import { ForwardedRef, forwardRef } from "react";

const CustomButton = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement> | null) => {
    return <Button ref={ref} {...props} />;
  }
);

export default CustomButton;
