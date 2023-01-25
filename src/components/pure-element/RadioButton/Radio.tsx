import MuiRadio, { RadioProps } from "@mui/material/Radio";
import { forwardRef, ForwardedRef } from "react";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import cs from "classnames";

interface ValuesProps {
  value?: string;
  label?: string | undefined;
}

interface IProp {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  values: ValuesProps[];
  classes?: string;
  width?: string;
  name?: string;
}
const RadioButton = forwardRef(
  (props: IProp & RadioProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { values, value, handleChange, name } = props;

    const controlProps = (item: string) => ({
      checked: value === item,
      onChange: handleChange,
      value: item,
      inputProps: { "aria-label": item },
      name,
    });
    return (
      <div ref={ref} className={`${props.width}`}>
        <div className={cs("flex", props.classes)}>
          {values.map((val: ValuesProps) => (
            <div className="m-5" key={val.value}>
              <MuiRadio
                id={val.value!}
                {...controlProps(val.value!)}
                icon={<MdRadioButtonUnchecked />}
                checkedIcon={<MdRadioButtonChecked />}
                className="text-primary"
              />
              <label htmlFor={val.value!} className="cursor-pointer">
                {val.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default RadioButton;
