import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import cs from "classnames";
interface IProp {
  classname?: string;
  children: React.ReactNode;
}

const Typography = (props: TypographyProps & IProp) => {
  const { children, classname } = props;
  return (
    <MuiTypography {...props} className={cs("font-sans ", classname)}>
      {children}
    </MuiTypography>
  );
};
export default Typography;
