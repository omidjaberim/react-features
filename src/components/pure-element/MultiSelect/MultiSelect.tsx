import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { MdKeyboardArrowDown } from "react-icons/md";
import cs from "classnames";
import { Typography } from "components";
import i18n from "config/locales/i18n";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Skeleton,
} from "@mui/material";
import React from "react";

interface SelectValues {
  key: string | number;
  value: string;
}
interface IProp {
  value?: number[] | string[];
  onChange: (event: any) => void;
  values: SelectValues[];
  classname?: string;
  loading?: boolean;
  helperText?: string | string[] | never[] | undefined;
}

const MultiSelect = (props: IProp & SelectProps) => {
  const { value, onChange, values, classname, loading, helperText } = props;

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        justifyContent: "flex-start",
      }}
      error
    >
      <MuiSelect
        {...props}
        multiple
        MenuProps={{ classes: { paper: "max-h-48" } }}
        value={value ? value : []}
        onChange={onChange}
        className={cs(
          "bg-bgInput font-sans [&>.muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline]:border-none mx-1 h-15 rounded-none",
          classname
        )}
        displayEmpty
        IconComponent={() => (
          <MdKeyboardArrowDown className="w-8 h-8 mx-2 cursor-pointer" />
        )}
        renderValue={(selected: any) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((sel: string) => {
              if (selected[0] !== "") {
                const index = values.findIndex((v) => v.key === sel);
                return <Chip key={sel} label={values[index].value} />;
              }
            })}
          </Box>
        )}
      >
        {loading ? (
          <Box className="w-full">
            <Skeleton variant="rounded" className="h-10 w-full" />
          </Box>
        ) : (
          values.map((val) => (
            <MenuItem
              key={val.key}
              dir={i18n.language === "fa-IR" ? "rtl" : "ltr"}
              value={val.key}
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
export default MultiSelect;
