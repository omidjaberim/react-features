import cs from "classnames";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface Iprop {
  classname?: string;
}

const TextFieldIdentity = (props: Iprop & TextFieldProps) => {
  const { classname } = props;
  return (
    <TextField
      {...props}
      className={cs(
        "bg-silver border-none h-10 rounded-lg py-1 px-2 ",
        classname
      )}
      variant="standard"
      InputProps={{
        disableUnderline: true,
      }}
      inputProps={{
        className: "font-sans text-sm text-txtDark bg-bgInput p-2 ",
      }}
    />
  );
};
export default TextFieldIdentity;
