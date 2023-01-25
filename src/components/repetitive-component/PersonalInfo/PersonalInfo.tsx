import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  TextFieldIdentity,
  Select,
  Modal,
  Typography,
  LoadingButton,
} from "components";
import Button from "@mui/material/Button";
import {
  GenderEnum,
  IdentificationTypeEnum,
  NationalityEnum,
  PersonKindEnum,
} from "constants/enum/customer.enum";
import { StepperBackwardsForwards } from "model/etc/stepperBackwardsForwards.model";
import { CustomerServiceUM } from "services/customer/customer-um.service";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { addPersonInfo } from "redux/slices/registerUser";
import { CircularProgress } from "@mui/material";
import { ToastRenderFuncProps } from "model/etc/toast-final.model";
import { SuccessToast } from "components/toast-view/func-toast";
import DatePicker from "components/pure-element/DatePicker/DatePicker";

export interface IinitialValues {
  firstname: string;
  lastname: string;
  nationalCode: string;
  fatherName: string;
  birthDate: string;
  gender: GenderEnum;
  birthPlace: string;
  mobile: string;
  email: string;
}

interface genderType {
  key: string;
  value: string;
}

interface IRes {
  isRegistered: boolean;
  desc: string;
  status: string;
}

const PersonalInfo = (props: StepperBackwardsForwards) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const customerUserMode = new CustomerServiceUM();
  const referralId = useAppSelector((store) => store.registerUser.referralId);

  const successTitle = t("PersonalInfo");
  const successDes = t("personalInfoEnteredSuccessfully");

  const successMes: ToastRenderFuncProps = {
    title: successTitle,
    id: Math.random(),
    description: successDes,
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resObj, setResObj] = useState<IRes>({
    isRegistered: false,
    desc: "",
    status: "",
  });
  const [genderObj, setGenderObj] = useState<genderType[]>([
    {
      key: "",
      value: "",
    },
  ]);

  const initialValues: IinitialValues = {
    firstname: "",
    lastname: "",
    nationalCode: "",
    fatherName: "",
    birthDate: new Date().toString(),
    gender: GenderEnum.FEMAIL,
    birthPlace: "",
    mobile: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required(t("thisFieldIsMandatory") as string),
    lastname: Yup.string().required(t("thisFieldIsMandatory") as string),
    nationalCode: Yup.string()
      .length(10, t("EnterAmaximumOf10Digits") as string)
      .required(t("thisFieldIsMandatory") as string),
    fatherName: Yup.string().required(t("thisFieldIsMandatory") as string),
    birthDate: Yup.string().required(t("thisFieldIsMandatory") as string),
    gender: Yup.string().required(t("thisFieldIsMandatory") as string),
    birthPlace: Yup.string().required(t("thisFieldIsMandatory") as string),
    mobile: Yup.string()
      .matches(
        /^09[0|1|2|3|9][0-9]{8}$/,
        t("theMobileNumberIsNotCorrect") as string
      )
      .length(11)
      .required(t("thisFieldIsMandatory") as string),
    email: Yup.string()
      .email(t("EmailValidation") as string)
      .required(t("thisFieldIsMandatory") as string),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const personObj = {
          firstname: values.firstname,
          lastname: values.lastname,
          fatherName: values.fatherName,
          gender: values.gender,
          birthDate: values.birthDate,
          birthPlace: values.birthPlace,
          identification: {
            type: IdentificationTypeEnum.NATIONAL_CODE,
            no: values.nationalCode,
          },
          nationality: NationalityEnum.IRN,
          mobile: values.mobile,
          email: values.email,
        };

        const payload = {
          kind: PersonKindEnum.NATURAL,
          person: { ...personObj },
        };

        dispatch(
          addPersonInfo({
            ...personObj,
          })
        );

        const registerPersonalInfo =
          await customerUserMode.registerPersonalInfo(payload, referralId);

        setResObj({
          isRegistered: true,
          desc: registerPersonalInfo.data.person.inquiry.description,
          status: registerPersonalInfo.data.person.inquiry.status,
        });
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
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

  const clickHandler = () => {
    setResObj((prev) => ({
      ...prev,
      isRegistered: false,
    }));
    afterClick();
    SuccessToast(successMes);
  };

  useEffect(() => {
    const genderTempObj: genderType[] = [];

    Object.keys(GenderEnum).map((gender) => {
      genderTempObj.push({
        key: gender,
        value: t(gender),
      });
    });

    setGenderObj(genderTempObj);
  }, [GenderEnum]);

  return (
    <div className="rounded-xl border-2 border-primary w-[760px] mx-auto mt-24 py-8  ">
      {/* pesonal info modal */}
      <Modal
        open={resObj.isRegistered}
        title={t("inquiryResult")}
        handleClose={() =>
          setResObj((prev) => ({
            ...prev,
            isRegistered: false,
          }))
        }
      >
        <Typography>
          {resObj.desc ||
            ` لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`}
        </Typography>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ borderRadius: "10px" }}
          className={`font-sans w-10/12 mt-11 bg-primary justify-center flex mx-auto`}
          loading={isLoading}
          loadingIndicator={<CircularProgress color="warning" size={16} />}
          onClick={clickHandler}
        >
          {t("confirm")}
        </LoadingButton>
      </Modal>

      <h1 className="font-bold text-center mt-10 mb-14">{t("PersonalInfo")}</h1>
      <div className="mx-8">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("firstname")}</label>
              <TextFieldIdentity
                classes="w-64"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
                inputClasses={"font-sans"}
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("lastname")}</label>
              <TextFieldIdentity
                classes="w-64"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
                inputClasses={"font-sans"}
              />
            </div>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("nationalCode")}</label>
              <TextFieldIdentity
                classes="w-64"
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
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("fatherName")}</label>
              <TextFieldIdentity
                classes="w-64"
                name="fatherName"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fatherName && Boolean(formik.errors.fatherName)
                }
                helperText={
                  formik.touched.fatherName && formik.errors.fatherName
                }
                inputClasses={"font-sans"}
              />
            </div>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("email")}</label>
              <TextFieldIdentity
                classes="w-64"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputClasses={"font-sans"}
              />
            </div>

            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("gender")}</label>
              <Select
                id="gender"
                name="gender"
                values={genderObj}
                value={formik.values.gender}
                onChange={formik.handleChange}
                classname="w-60 !m-0 bg-bgInput p-0"
                helperText={formik.touched.gender && formik.errors.gender}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              />
            </div>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("birthPlace")}</label>
              <TextFieldIdentity
                classes="w-64"
                name="birthPlace"
                value={formik.values.birthPlace}
                onChange={formik.handleChange}
                error={
                  formik.touched.birthPlace && Boolean(formik.errors.birthPlace)
                }
                helperText={
                  formik.touched.birthPlace && formik.errors.birthPlace
                }
                inputClasses={"font-sans"}
              />
            </div>
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("mobile")}</label>
              <TextFieldIdentity
                classes="w-64"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                inputClasses={"font-sans"}
              />
            </div>
          </div>
          <div className="flex justify-between mb-10">
            <div className="flex items-center justify-center">
              <label className="w-[85px] font-bold">{t("birthDate")}</label>
              <DatePicker
                setValue={formik.setFieldValue}
                name="birthDate"
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                onChange={formik.handleChange}
                value={formik.values.birthDate}
                classname="w-60 mx-2"
              />
            </div>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="bg-primary mt-10 px-40 rounded-lg py-3 mx-auto"
            // onClick={formik.handleSub}
          >
            {t("submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
