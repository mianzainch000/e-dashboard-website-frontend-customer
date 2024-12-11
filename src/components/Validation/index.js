import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const loginFormValidation = (t) => {
  return Yup.object({
    email: Yup.string()
      .required(t("EMAIL_REQUIRED"))
      .matches(/\S+@\S+\.\S+/, t("INVALID_EMAIL")),
    password: Yup.string().required(t("PASSWORD_REQUIRED")),
  });
};

export const signupFormValidation = (t) => {
  return Yup.object({
    firstName: Yup.string().required(t("FIRST_NAME_REQUIRED")),
    lastName: Yup.string().required(t("LAST_NAME_REQUIRED")),
    email: Yup.string()
      .required(t("EMAIL_REQUIRED"))
      .matches(/\S+@\S+\.\S+/, t("INVALID_EMAIL")),
    password: Yup.string()
      .required(t("PASSWORD_REQUIRED"))
      .min(8, t("PASSWORD_MIN_LENGTH"))
      .matches(/[a-z]/, t("PASSWORD_LOWERCASE"))
      .matches(/[A-Z]/, t("PASSWORD_UPPERCASE"))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t("PASSWORD_SYMBOL")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("CONFIRM_PASSWORD_MATCH"))
      .required(t("CONFIRM_PASSWORD_REQUIRED")),
  });
};

export const userAddressValidation = (t) => {
  return Yup.object({
    name: Yup.string().required(t("NAME_IS_REQUIRED")),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, t("PHONE_INVALID"))
      .required(t("PHONE_REQUIRED")),
    address: Yup.string().required(t("ADDRESS_REQUIRED")),
    city: Yup.string().required(t("CITY_REQUIRED")),
    postalCode: Yup.string()
      .matches(/^[0-9]{5}$/, t("POSTAL_CODE_INVALID"))
      .required(t("POSTAL_CODE_REQUIRED")),
  });
};
// Export the hook as well
export const useValidationSchemas = () => {
  const { t } = useTranslation();
  return {
    loginFormValidation: loginFormValidation(t),
    signupFormValidation: signupFormValidation(t),
    userAddressValidation: userAddressValidation(t),
  };
};
