import React, { ForwardedRef, forwardRef } from "react";
import {
  Backdrop,
  DialogContent,
  DialogTitle,
  Divider,
  Zoom,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import { TransitionProps } from "@mui/material/transitions";
import { MdOutlineClose } from "react-icons/md";
import cs from "classnames";

interface IProps {
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
  open: boolean;
  [x: string]: any;
  classname?: string;
}

const Modal = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLDivElement> | null) => {
    const { open, title, children, handleClose, classname, ...rest } = props;
    const { i18n } = useTranslation();
    return (
      <Dialog
        dir={i18n.language === "fa-IR" ? "rtl" : "ltr"}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        TransitionComponent={Transition}
        {...rest}
        ref={ref}
        className={cs(classname, "[&> .MuiPaper-root]:bg-white")}
      >
        <div className="flex w-full justify-center items-center ">
          <div className="flex justify-start w-1/2 mx-6">
            <DialogTitle className="font-sans text-lg ">{title}</DialogTitle>
          </div>
          <div className="flex justify-end w-1/2 mx-6">
            <MdOutlineClose onClick={handleClose} />
          </div>
        </div>
        <Divider className="w-11/12 mx-auto" />
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  }
);
export default Modal;

const Transition = React.forwardRef((props: any, ref: React.Ref<unknown>) => {
  return <Zoom in={true} ref={ref} {...props} />;
});
