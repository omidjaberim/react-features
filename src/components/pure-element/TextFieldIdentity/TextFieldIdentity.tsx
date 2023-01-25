import { TextField } from "components";
import cs from "classnames";
import { TextFieldProps } from "@mui/material/TextField";

interface Iprop {
  classes?: string;
  inputClasses?: string;
}

const TextFieldIdentity = (props: Iprop & TextFieldProps) => {
  const { classes, inputClasses } = props;
  return (
    <TextField
      {...props}
      className={cs(
        " border-none h-10 py-1 px-2 font-sans [&>.muirtl-1d1r5q-MuiFormHelperText-root.Mui-error]:font-sans ",
        classes
      )}
      variant="standard"
      InputProps={{
        disableUnderline: true,
        classes: {
          input: inputClasses,
        },
      }}
      inputProps={{
        className: "font-sans text-sm text-txtDark bg-bgInput p-2 ",
      }}
    />
  );
};
export default TextFieldIdentity;
