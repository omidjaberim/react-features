import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { TextFieldIdentity } from "components";
import { addAddress } from "redux/slices/registerUser";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { SuccessToast } from "components/toast-view/func-toast";
import { ToastRenderFuncProps } from "model/etc/toast-final.model";
import DistrictDropdown from "../DistrictDropdown/DistrictDropdown";
import { CustomerServiceUM } from "services/customer/customer-um.service";
import { StepperBackwardsForwards } from "model/etc/stepperBackwardsForwards.model";
import { RootState } from "redux/store";

interface IinitialValues {
  postalCode: string;
  tell: string;
  address: string;
  region: number | null;
}

export interface IAddr {
  province: string;
  city: string;
}

const customerUserMode = new CustomerServiceUM();

const AddressInformation = (props: StepperBackwardsForwards) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const successDes = t("personalInfoEnteredSuccessfully");
  const successTitle = t("EnterAddressInformation");
  const referralId = useAppSelector(
    (store: RootState) => store.registerUser.referralId
  );

  const [addrObj, setAddrObj] = useState<IAddr>({
    province: "",
    city: "",
  });

  const successMes: ToastRenderFuncProps = {
    title: successTitle,
    id: Math.random(),
    description: successDes,
  };

  const initialValues: IinitialValues = {
    postalCode: "",
    tell: "",
    address: "",
    region: null,
  };

  const validationSchema = Yup.object({
    postalCode: Yup.number().required(t("thisFieldIsMandatory") as string),
    tell: Yup.number().required(t("thisFieldIsMandatory") as string),
    address: Yup.string().required(t("thisFieldIsMandatory") as string),
    region: Yup.number()
      .typeError(t("thisFieldIsMandatory") as string)
      .required(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          region: values.region,
          address: values.address,
          postalCode: values.postalCode,
          tel: values.tell,
        };

        dispatch(addAddress({ ...payload, ...addrObj }));
        const registerPersonalInfo = await customerUserMode.registerAddress(
          payload,
          referralId
        );

        afterClick();
        SuccessToast(successMes);
      } catch (e) {
        console.log(e);
      }
    },
  });

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

  return (
    <div className="rounded-xl border-2 border-primary w-[760px] mx-auto mt-24 py-8  ">
      <h1 className="font-bold text-center mt-10 mb-14">
        {t("EnterAddressInformation")}
      </h1>
      <div className="mx-14">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div
            className={`flex justify-between ${
              formik.touched.region ? "mb-4" : "mb-8"
            }`}
          >
            <DistrictDropdown
              name="region"
              selectWidth="w-56"
              labelWidth="w-[85px]"
              setAddrObj={setAddrObj}
              value={formik.values.region}
              secondSelectLabel={t("city")}
              onChange={formik.handleChange}
              firstSelectLabel={t("province")}
              error={formik.touched.region && Boolean(formik.errors.region)}
              helperText={formik.touched.region && formik.errors.region}
            />
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("postalCode")}</label>
              <TextFieldIdentity
                classes="w-60"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
                inputClasses={"font-sans"}
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">
                {t("staticPhoneNumber")}
              </label>
              <TextFieldIdentity
                classes="w-60"
                name="tell"
                value={formik.values.tell}
                onChange={formik.handleChange}
                error={formik.touched.tell && Boolean(formik.errors.tell)}
                helperText={formik.touched.tell && formik.errors.tell}
                inputClasses={"font-sans"}
              />
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <label className="w-[55px] font-bold">{t("address")}</label>
            <TextFieldIdentity
              classes="w-[400px] mr-3"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              inputClasses={"font-sans"}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            className="bg-primary px-40 rounded-lg mt-10 py-3 mx-auto mb-20"
          >
            {t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddressInformation;
