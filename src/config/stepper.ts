import { useTranslation } from "react-i18next";

export const useReturnSteps = () => {
  const { t } = useTranslation();

  const StepsStepper = [
    { stepNum: 0, title: t("Authentication"), isActive: true },
    { stepNum: 1, title: t("selectProductKind"), isActive: false },
    { stepNum: 2, title: t("SubscriptionKind"), isActive: false },
    { stepNum: 3, title: t("PersonalInfo"), isActive: false },
    { stepNum: 4, title: t("LocationInfo"), isActive: false },
    { stepNum: 5, title: t("UploadDocuments"), isActive: false },
    { stepNum: 6, title: t("OrderReview"), isActive: false },
  ];
  return {
    StepsStepper,
  };
};
