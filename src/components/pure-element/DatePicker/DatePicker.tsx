import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AdapterJalaali from "@date-io/jalaali";
import cs from "classnames";
interface Iprops {
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => any;
  name: string;
  error: boolean | undefined;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any> ? void : (e: string) => void;
  };
  value: string;
  classname?: string;
}

export default function DatePicker(props: Iprops) {
  const { error, name, onChange, setValue, classname, value } = props;

  function formatDate(date: string) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleChange = (newValue: any) => {
    setValue(name, formatDate(newValue._d));
  };
  const selectedDate = new Date(value);
  return (
    <LocalizationProvider dateAdapter={AdapterJalaali}>
      <DesktopDatePicker
        inputFormat="DD/MM/YYYY"
        mask=""
        value={selectedDate}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            value={selectedDate.toLocaleDateString("fa-IR")}
            name={name}
            error={error}
            onChange={onChange}
            className={cs("px-3 bg-bgInput", classname)}
            variant="standard"
            inputProps={{
              disableUnderline: true,
            }}
            sx={{
              "& .muirtl-whebh7-MuiInputBase-root-MuiInput-root:before": {
                borderBottom: "none",
              },
            }}
          />
        )}
        disableFuture
        //   onAccept={(e) => console.log(e)}
      />
    </LocalizationProvider>
  );
}
