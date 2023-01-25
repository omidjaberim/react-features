import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "redux/hooks";
import { CircularProgress } from "@mui/material";
import { LoadingButton, Typography } from "components";
import { INQURY_STATUS } from "constants/enum/customer.enum";
import { CustomerServiceUM } from "services/customer/customer-um.service";

interface InquiryResType {
  desc: string;
  status: string;
}

interface PropsType {
  onClose: () => void;
}

const InquiryResult = (props: PropsType) => {
  const { t } = useTranslation();
  const customerUserMode = new CustomerServiceUM();
  const referralId = useAppSelector((store) => store.registerUser.referralId);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inquiryResObj, setInquiryResObj] = useState<InquiryResType>({
    desc: "",
    status: "",
  });

  const getInquiryRefrral = useCallback(async () => {
    try {
      setIsLoading(true);
      const inquiryRes = await customerUserMode.getById(
        `${referralId}/inquiries?inquiry=referral`
      );
      setInquiryResObj({
        desc: inquiryRes.data.referral.inquiry.description,
        status: inquiryRes.data.referral.inquiry.status,
      });
    } catch (err) {}
  }, [referralId]);

  useEffect(() => {
    getInquiryRefrral();
  }, [getInquiryRefrral]);

  return (
    <div className="w-full mx-auto p-8">
      <Typography>
        {inquiryResObj.desc ||
          ` لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`}
      </Typography>

      {inquiryResObj.status === INQURY_STATUS.CONFIRMED && (
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ borderRadius: "10px" }}
          className="font-sans w-10/12 mt-11 bg-primary justify-center flex mx-auto"
          loading={false}
          loadingIndicator={<CircularProgress color="warning" size={16} />}
          onClick={props.onClose}
        >
          {t("confirm")}
        </LoadingButton>
      )}
    </div>
  );
};

export default InquiryResult;
