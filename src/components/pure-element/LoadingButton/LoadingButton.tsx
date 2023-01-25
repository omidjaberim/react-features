import LoadingButton , {LoadingButtonProps}  from '@mui/lab/LoadingButton';
// import { ButtonProps } from "@mui/material/Button";
import { forwardRef, RefObject , ForwardedRef } from "react";



const CustomButtonLoading = forwardRef(
  (props: LoadingButtonProps, ref: ForwardedRef<HTMLButtonElement> | null) => {
    return <LoadingButton ref={ref} {...props} />;
  }
);

export default CustomButtonLoading;
