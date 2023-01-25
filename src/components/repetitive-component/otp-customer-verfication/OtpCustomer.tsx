import { useState, useEffect, useCallback, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector } from "redux/hooks";
import { CircularProgress } from "@mui/material";
import useCountDown from "tools/hooks/use-count-down";
import { LoadingButton, TextFieldIdentity } from "components";
import { CustomerServiceUM } from "services/customer/customer-um.service";
import { SuccessToast } from "components/toast-view/func-toast";
import { ToastRenderFuncProps } from "model/etc/toast-final.model";

const customerUserMode = new CustomerServiceUM();

interface IProps {
  onClose: () => void;
  afterStep: () => void;
}

function OtpCustomer(props: IProps) {
  const { onClose, afterStep } = props;

  const mobileNumber = useAppSelector(
    (store) => store.registerUser.referral.referral.mobile
  );
  const referralId = useAppSelector((store) => store.registerUser.referralId);

  const initialTime: number = 10 * 6000; // initial time in milliseconds, defaults to 60000
  const interval: number = 1000;
  const { t } = useTranslation();

  const successTitle = t("Authentication");
  const successDes = t("otpWasSuccessfully");

  const successMes: ToastRenderFuncProps = {
    title: successTitle,
    id: Math.random(),
    description: successDes,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, actions] = useCountDown(initialTime, interval);

  useEffect(() => {
    actions.start();
  }, []);

  const restart = useCallback(() => {
    actions.start!(initialTime);
  }, []);

  const initialValues = {
    otpCode: "",
  };

  const schema = Yup.object({
    otpCode: Yup.string()
      // .length(5, t("EnterAmaximumOf5Digits") as string)
      .required(t("thisFieldIsMandatory") as string),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          code: values.otpCode,
          id: referralId,
        };

        await customerUserMode.confirmOTP(payload);
        onClose();
        afterStep();
        SuccessToast(successMes);
      } catch (e) {
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full mx-auto p-8">
      <div className="">
        {`${t("verificationCodeForTheNumber")} ${mobileNumber.value} ${t(
          "itWasTexted"
        )}`}
      </div>
      <button
        className="mt-4 text-[#3E8BFF] cursor-pointer border-b-2 border-sky-500 w-fit"
        onClick={onClose}
      >
        {t("editingNo")}
      </button>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-center m-7 mt-10">
          <label className="w-[140px]">{t("SMSCode")}</label>
          <TextFieldIdentity
            classes="w-96"
            name="otpCode"
            value={formik.values.otpCode}
            onChange={formik.handleChange}
            error={formik.touched.otpCode && Boolean(formik.errors.otpCode)}
            helperText={formik.touched.otpCode && formik.errors.otpCode}
            inputClasses={"font-sans"}
          />
        </div>
        <div className="font-sans w-10/12 justify-center flex flex-col mx-auto mt-32">
          <span className="text-center mb-5">
            {timeLeft === 0 ? (
              <button onClick={restart}>{t("getTheCodeAgain")}</button>
            ) : (
              `${(timeLeft / 1000) as any} ${t(
                "secondsLeftToReceiveTheCodeAgain"
              )}`
            )}
          </span>
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            sx={{ borderRadius: "10px" }}
            className={`font-sans bg-primary `}
            loading={loading}
            loadingIndicator={<CircularProgress color="warning" size={16} />}
          >
            {t("submit")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
export default OtpCustomer;
