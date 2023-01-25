import { useState } from "react";
import { CircularProgress, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RadioButton, LoadingButton, Select } from "components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { StepperBackwardsForwards } from "model/etc/stepperBackwardsForwards.model";
import { NationalityEnum } from "constants/enum/customer.enum";
import { useDispatch } from "react-redux";
import { addNationality } from "redux/slices/registerUser";
import { ToastRenderFuncProps } from "model/etc/toast-final.model";
import { SuccessToast } from "components/toast-view/func-toast";

const CustomerType = (props: StepperBackwardsForwards) => {
  const { t } = useTranslation();
  const tUS = t("US");
  const tIran = t("iran");
  const tGermany = t("Germany");
  const successDes = t("nationalitySetSuccessfully");
  const successTitle = t("chooseCustomerTypeAndNationality");

  const successMes: ToastRenderFuncProps = {
    title: successTitle,
    id: Math.random(),
    description: successDes,
  };

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    customerType: Yup.string(),
    nationalityType: Yup.string(),
    country: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      country: NationalityEnum.IRN,
      customerType: "personal",
      nationalityType: "ir",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        // alert(JSON.stringify(values, null, 2));
        setLoading(true);
        /// TODO: correct the api
        // const res = await customerUserMode.delete("1");
        // console.log(res);
        afterClick();
        dispatch(addNationality(NationalityEnum.IRN));
        SuccessToast(successMes);
      } catch (e) {
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
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
    <div className="rounded-xl border-2 border-primary w-[640px] mx-auto mt-24 py-8 ">
      <div className="flex flex-col justify-center items-center pt-5">
        <Typography
          variant="h6"
          children={t("chooseCustomerTypeAndNationality")}
          className="font-sans"
        />
        <form onSubmit={formik.handleSubmit} className="w-11/12">
          <div className="flex m-7 mt-20">
            <label className="text-base w-28 flex justify-center items-center">
              {t("customerType")}
            </label>
            <RadioButton
              width="w-full"
              classes={"justify-around"}
              values={[
                {
                  value: "personal",
                  label: t("personal") as string,
                },
                {
                  value: "legal",
                  label: t("legal") as string,
                },
              ]}
              id="customerType"
              name="customerType"
              value={formik.values.customerType}
              handleChange={formik.handleChange}
            />
          </div>

          <Divider />

          <div className="flex flex-col justify-between mt-11">
            <label className="text-base w-28 flex justify-center items-center">
              {t("nationality")}
            </label>
            <div className="flex flex-row">
              <RadioButton
                width="w-full"
                classes={"flex flex-col items-start"}
                values={[
                  {
                    value: "ir",
                    label: t("iranian") as string,
                  },
                ]}
                id="nationalityType"
                name="nationalityType"
                value={formik.values.nationalityType}
                handleChange={formik.handleChange}
              />
            </div>

            <div className="flex flex-row">
              <RadioButton
                width="w-full"
                classes={"flex flex-col items-start"}
                values={[
                  {
                    value: "for",
                    label: t("foreigner") as string,
                  },
                ]}
                id="nationalityType"
                name="nationalityType"
                value={formik.values.nationalityType}
                handleChange={formik.handleChange}
              />
              <div className="flex flex-row relative">
                <label className="text-base flex justify-center items-center relative -right-4 -top-12">
                  {t("country")}
                </label>
                <Select
                  classname={`w-48 flex justify-center left-0 -top-8 ${
                    formik.values.nationalityType === "ir" &&
                    "pointer-events-none opacity-50"
                  }`}
                  values={
                    formik.values.nationalityType === "ir"
                      ? [{ key: "IRN", value: tIran }]
                      : [
                          { key: "IRN", value: tGermany },
                          { key: "IRN", value: tUS },
                        ]
                  }
                  id="country"
                  name="country"
                  value={
                    formik.values.nationalityType === "ir"
                      ? (formik.values.country = NationalityEnum.IRN)
                      : formik.values.country
                  }
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <LoadingButton
              type="submit"
              size="large"
              variant="contained"
              sx={{ borderRadius: "10px" }}
              className={`font-sans px-40 rounded-lg mt-11 bg-primary justify-center flex mx-auto mb-20`}
              loading={loading}
              loadingIndicator={<CircularProgress color="warning" size={16} />}
            >
              {t("submit")}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CustomerType;
