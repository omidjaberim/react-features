import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MdOutlineSearch } from "react-icons/md";
import cs from "classnames";
interface Iprop {
  classname?: string;
}
const SearchInput = (props: Iprop) => {
  const { classname } = props;
  return (
    <TextField
      className={cs(
        "bg-bgInput border-none h-10 rounded-lg py-1 px-2 w-56",
        classname
      )}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdOutlineSearch className="text-iconColor" />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
      inputProps={{ className: "font-sans text-sm text-txtDark" }}
    />
  );
};
export default SearchInput;
