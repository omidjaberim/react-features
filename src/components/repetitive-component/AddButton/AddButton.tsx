import { Button } from "components";
import { MdAdd } from "react-icons/md";
import cs from "classnames";
interface IProp {
  children: React.ReactNode;
  classname?: string;
  onClick: any;
}
const AddBtn = (props: IProp) => {
  const { children, classname, onClick } = props;
  return (
    <Button
      variant="contained"
      className={cs("bg-primary font-sans rounded-lg h-10 w-40", classname)}
      onClick={onClick}
    >
      <MdAdd className="text-PureWhite" fontSize="large" />
      {children}
    </Button>
  );
};
export default AddBtn;
