import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterIcon from "components/icons/filter/Filter";

interface IProp {
  onClick: () => void;
}
const FilterButton = (props: IProp) => {
  const { t } = useTranslation();
  const { onClick } = props;
  return (
    <Chip
      className="h-10 rounded-lg bg-bgInput font-sans"
      label={t("filter")}
      icon={<FilterIcon />}
      onClick={onClick}
    />
  );
};
export default FilterButton;
