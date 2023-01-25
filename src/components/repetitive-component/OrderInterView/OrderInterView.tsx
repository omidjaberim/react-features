import { useAppSelector } from "../../../redux/hooks";
import { isObject } from "../../../tools/pure-function/check-object";
import { useTranslation } from 'react-i18next';

const OrderInterview = () => {
  const customerOrder = useAppSelector((state) => state.registerUser);
  const {t} = useTranslation()

  console.log(Object.entries(customerOrder.person));
  return (
    <div className="mt-20">
      <div className="flex flex-wrap w-full">
        {Object.entries(customerOrder.person).map((item) => (
          <p className="w-96 flex-grow mb-5">
            <span className="font-bold">{t(item[0])} : </span>
            <span>{isObject(item[1]) ? item[1]['no'] : t(item[1])}</span>
          </p>
        ))}
      </div>
      <hr/> 
      <div className="flex flex-wrap w-full mt-10">
        {Object.entries(customerOrder.address).map((item) => (
          <p className="w-96 flex-grow mb-5">
            <span className="font-bold">{t(item[0])} : </span>
            <span>{isObject(item[1]) ? item[1]['no'] : t(item[1])}</span>
          </p>
        ))}
      </div>
      <hr/>
      {/* <div className="flex flex-wrap w-full mt-10">
        {Object.entries(customerOrder.referral).map((item) => (
          <p className="w-96 flex-grow mb-5">
            <span className="font-bold">{t(item[0])} : </span>
            <span>{isObject(item[1]) ? item[1]['no'] : t(item[1])}</span>
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default OrderInterview;
