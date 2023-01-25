import { SIM_KIND } from "constants/enum/product.enum";
import { StepperBackwardsForwards } from "model/etc/stepperBackwardsForwards.model";
import { useTranslation } from "react-i18next";
import DataSim from "../icons/DataSim";
import PermanentSim from "../icons/PermanentSim";
import PrepaidSim from "../icons/PrepaidSim";
import ProductCard from "./producrCard/ProductCard";
import ReservationSIM from "./ReservationSIM/ReservationSIM";

const SelectProductKind = (props: StepperBackwardsForwards) => {
  const { t } = useTranslation();

  const products = [
    { type: SIM_KIND.PERMANENT, productKind: t("PermanentSIM") },
    { type: SIM_KIND.PREPAID, productKind: t("PrepaidSIM") },
    { type: SIM_KIND.DATA, productKind: t("DataSIM") },
  ];

  const afterClick = () => {
    const clonedData = [...props?.steps!];
    const afterClick = clonedData.map((d) =>
      d.stepNum === props.currentSteps ? { ...d, isActive: false } : d
    );
    const sds = afterClick.map((d) =>
      d.stepNum === props.afterSteps ? { ...d, isActive: true } : d
    );
    const newArr = [...sds];
    props.setSteps!(newArr);
  };

  const beforeClick = () => {
    const clonedData = [...props?.steps!];
    const afterClick = clonedData.map((d) =>
      d.stepNum === props.beforeSteps ? { ...d, isActive: true } : d
    );
    const sds = afterClick.map((d) =>
      d.stepNum === props.currentSteps ? { ...d, isActive: false } : d
    );
    const newArr = [...sds];
    props.setSteps!(newArr);
  };

  return (
    <div className="mx-32 mt-20">
      <h4 className="text-center mb-10 font-bold">{t("ProductKind")}</h4>
      <div className="flex justify-between">
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
      <div className="mt-20">
        <hr className="text-hoverBg" />
        <ReservationSIM />
      </div>

      <div>
        <button onClick={afterClick}>next</button>
      </div>

      <div>
        <button onClick={beforeClick}>before</button>
      </div>
    </div>
  );
};

export default SelectProductKind;
