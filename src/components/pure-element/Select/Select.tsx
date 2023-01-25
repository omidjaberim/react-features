import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";
import cs from "classnames";
import { Typography } from "components";
import i18n from "config/locales/i18n";
import { Box, FormControl, FormHelperText, Skeleton } from "@mui/material";

interface SelectValues {
  key: string | number | null;
  value: string;
}
interface IProp {
  value?: number | string | null;
  onChange: (event: any) => void;
  values: SelectValues[];
  classname?: string;
  loading?: boolean;
  helperText?: string | false | undefined;
  defaultValue?: string;
  name?: string;
}

const Select = (props: IProp & SelectProps) => {
  const { value, onChange, values, classname, loading, helperText } = props;
  return (
    <FormControl
      sx={{
        minWidth: 120,
        justifyContent: "flex-start",
      }}
    >
      <MuiSelect
        {...props}
        MenuProps={{ classes: { paper: "max-h-48" } }}
        value={value !== 0 ? value : 0}
        onChange={onChange}
        className={cs(
          "font-sans [&>.muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline]:border-none mx-1 h-9 rounded-none bg-bgInput [&> .muirtl-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper]:bg-white ",
          classname
        )}
        IconComponent={() => (
          <MdKeyboardArrowDown className="w-8 h-8 mx-2 cursor-pointer" />
        )}
      >
        {loading ? (
          <Box className="w-full ">
            <Skeleton variant="rounded" className="h-10 w-full" />
          </Box>
        ) : (
          values.map((val) => (
            <MenuItem
              dir={i18n.language === "fa-IR" ? "rtl" : "ltr"}
              value={val.key ? val.key : 0}
              key={val.key ? val.key : 0}
            >
              <Typography>{val.value}</Typography>
            </MenuItem>
          ))
        )}
      </MuiSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default Select;
