import { SIM_KIND } from "constants/enum/product.enum";
import { StyledCard } from "./prodtctCardStyle";
import { BsSim } from "react-icons/bs";
import SimDecorate from "../../icons/SimDecorate";
import { useTranslation } from "react-i18next";

interface Iprops {
  type: SIM_KIND;
  productKind: string;
}

const ProductCard = (props: Iprops) => {
  const { t } = useTranslation();

  return (
    <StyledCard
      type={props.type}
      className="flex-auto relative rounded-2xl text-white"
    >
      <span className="absolute top-0 right-0 left-0 bottom-0 center text-6xl">
        <SimDecorate className="w-full h-full" />
      </span>
      <span className="absolute flex-col top-0 right-0 left-0 bottom-0 center text-6xl">
        <BsSim />
        <span className="text-lg mt-5">{props.productKind}</span>
      </span>
      <div className="absolute top-48 flex justify-between w-full px-12 ">
        <span className="border-4 rounded-xl px-4  py-2 bg-white2 hover:bg-goldLite hover:-translate-y-1 border-gold text-gold cursor-pointer transition-all ease-in-out ">
          {t("GoldSIM")}
        </span>
        <span className="border-4 rounded-xl px-4  py-2 bg-white2 hover:bg-silverLite hover:-translate-y-1 border-silver text-silver cursor-pointer transition-all ease-in-out ">
          {t("SilverSIM")}
        </span>
        <span className="border-4 rounded-xl px-4  py-2 bg-white2 hover:bg-normalLite hover:-translate-y-1 border-normal text-normal cursor-pointer transition-all ease-in-out ">
          {t("NormalSIM")}
        </span>
      </div>
    </StyledCard>
  );
};
export default ProductCard;
