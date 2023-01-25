import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  RadioButton,
  TextFieldIdentity,
  LoadingButton,
  Modal,
} from "components";
import * as Yup from "yup";
import { prepareDataForValidation, useFormik } from "formik";
import { CustomerServiceUM } from "services/customer/customer-um.service";
import { StepperBackwardsForwards } from "model/etc/stepperBackwardsForwards.model";
import {
  IdentificationTypeEnum,
  INQURY_STATUS,
  PersonKindEnum,
} from "constants/enum/customer.enum";
import { addReferral, saveReferalId } from "redux/slices/registerUser";
import { RootState } from "redux/store";
import OtpCustomer from "../otp-customer-verfication/OtpCustomer";
import InquiryResult from "../InquiryResult/InquiryResult";

const customerUserMode = new CustomerServiceUM();

function Identity(props: StepperBackwardsForwards) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const referralId = useAppSelector(
    (store: RootState) => store.registerUser.referralId
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [isInquiry, setIsInquiry] = useState<boolean>(false);
  const [radio, setRadio] = useState<string>("withSimCard");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const initialValues = {
    nationalCode: "",
    phoneNumber: "",
    phoneNumberConsultant: "",
    nationalCodeConsultant: "",
  };

  const schema = Yup.object({
    nationalCode: Yup.string()
      .length(10, t("nationalCodeInvalid") as string)
      .required(t("thisFieldIsMandatory") as string),
    phoneNumber:
      radio === "withOutSimCard"
        ? Yup.string()
            .matches(
              /^09[0|1|2|3|9][0-9]{8}$/,
              t("theMobileNumberIsNotCorrect") as string
            )
            .length(11)
            .nullable()
        : Yup.string()
            .matches(
              /^09[0|1|2|3|9][0-9]{8}$/,
              t("theMobileNumberIsNotCorrect") as string
            )
            .length(11)
            .required(t("thisFieldIsMandatory") as string),
    phoneNumberConsultant:
      radio === "withOutSimCard"
        ? Yup.string()
            .matches(
              /^09[0|1|2|3|9][0-9]{8}$/,
              t("theMobileNumberIsNotCorrect") as string
            )
            .length(11)
            .required(t("thisFieldIsMandatory") as string)
        : Yup.string()
            .matches(
              /^09[0|1|2|3|9][0-9]{8}$/,
              t("theMobileNumberIsNotCorrect") as string
            )
            .length(11)
            .nullable(),
    nationalCodeConsultant:
      radio === "withOutSimCard"
        ? Yup.string()
            .length(10, t("EnterAmaximumOf10Digits") as string)
            .required(t("thisFieldIsMandatory") as string)
        : Yup.string()
            .length(10, t("EnterAmaximumOf10Digits") as string)
            .nullable(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = {
          kind: PersonKindEnum.NATURAL,
          referral: {
            identification: {
              type: IdentificationTypeEnum.NATIONAL_CODE,
              no:
                radio === "withOutSimCard"
                  ? values.nationalCodeConsultant
                  : values.nationalCode,
            },
            mobile: {
              value:
                radio === "withOutSimCard"
                  ? values.phoneNumberConsultant
                  : values.phoneNumber,
            },
          },
          person: {
            identification: {
              type: IdentificationTypeEnum.NATIONAL_CODE,
              no: values.nationalCode,
            },
          },
        };
        dispatch(addReferral(data));
        const res = await customerUserMode.create(data);
        if (res.data.id) setIsInquiry(true);
        dispatch(saveReferalId(res.data.id));
      } catch (e) {
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
      {/* inquiry result modal */}
      <Modal open={isInquiry} title={t("inquiryResult")} handleClose={() => {}}>
        <InquiryResult
          onClose={() => [setIsInquiry(false), setIsConfirmed(true)]}
        />
      </Modal>

      {/* OTP modal */}
      <Modal
        open={isConfirmed}
        title={t("otp")}
        handleClose={() => setIsConfirmed(false)}
      >
        <OtpCustomer
          onClose={() => setIsConfirmed(false)}
          afterStep={afterClick}
        />
      </Modal>

      <div className="flex flex-col justify-center items-center pt-5">
        <Typography
          variant="h6"
          children={t("Identifity")}
          className="font-sans"
        />

        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center m-7 mt-20">
            <label className="w-[140px]">{t("nationalCode")}</label>
            <TextFieldIdentity
              classes="w-96"
              name="nationalCode"
              value={formik.values.nationalCode}
              onChange={formik.handleChange}
              error={
                formik.touched.nationalCode &&
                Boolean(formik.errors.nationalCode)
              }
              helperText={
                formik.touched.nationalCode && formik.errors.nationalCode
              }
              inputClasses={"font-sans"}
            />
          </div>
          <RadioButton
            width="w-full"
            classes={"justify-between "}
            values={[
              {
                value: "withSimCard",
                label: t("hasSIMCardInOperators") as string,
              },
              {
                value: "withOutSimCard",
                label: t("noSIMCardInOperators") as string,
              },
            ]}
            handleChange={(e) => setRadio(e.target.value)}
            value={radio}
          />

          {radio === "withOutSimCard" ? (
            <>
              <div className="flex flex-col items-center justify-center m-7 mt-11">
                <div className="flex mt-5 items-center">
                  <label className="w-[140px]">{t("nationalExpertCode")}</label>
                  <TextFieldIdentity
                    classes="w-96"
                    name={"nationalCodeConsultant"}
                    value={formik.values.nationalCodeConsultant}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nationalCodeConsultant &&
                      Boolean(formik.errors.nationalCodeConsultant)
                    }
                    helperText={
                      formik.touched.nationalCodeConsultant &&
                      formik.errors.nationalCodeConsultant
                    }
                    inputClasses={"font-sans"}
                  />
                </div>
                <div className="flex mt-5 items-center">
                  <label className="w-[140px]"> {t("mobileExpert")} </label>
                  <TextFieldIdentity
                    classes="w-96"
                    name={"phoneNumberConsultant"}
                    value={formik.values.phoneNumberConsultant}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumberConsultant &&
                      Boolean(formik.errors.phoneNumberConsultant)
                    }
                    helperText={
                      formik.touched.phoneNumberConsultant &&
                      formik.errors.phoneNumberConsultant
                    }
                    inputClasses={"font-sans"}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center m-7 mt-11">
                <div className="flex mt-2 items-center">
                  <label className="w-[140px]"> {t("phoneNumber")} </label>
                  <TextFieldIdentity
                    classes="w-96"
                    name={"phoneNumber"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    inputClasses={"font-sans"}
                  />
                </div>
              </div>
            </>
          )}

          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            sx={{ borderRadius: "10px" }}
            className={`font-sans px-40 rounded-lg mt-11 bg-primary justify-center flex mx-auto ${
              radio === "withOutSimCard" ? "mt-20" : "mt-28"
            }`}
            loading={loading}
            loadingIndicator={<CircularProgress color="warning" size={16} />}
          >
            {t("submit")}
          </LoadingButton>
        </form>

        <button onClick={afterClick}>click button befor</button>
      </div>
    </div>
  );
}
export default Identity;
