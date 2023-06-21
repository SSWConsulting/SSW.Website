import * as yup from "yup";
import {
  STATE_DEFAULT_VALUE,
  VALIDATION_ERROR_MESSAGE,
} from "../util/constants";

export const ValidationSchema = (isShowStates: boolean, isShareForm: boolean) =>
  yup.object().shape({
    fullName: yup.string().required(VALIDATION_ERROR_MESSAGE.FULL_NAME),
    email: yup.string().email().required(VALIDATION_ERROR_MESSAGE.EMAIL),
    phone: yup.string().required(VALIDATION_ERROR_MESSAGE.PHONE),
    location: yup.string().required(VALIDATION_ERROR_MESSAGE.LOCATION),
    states: isShowStates
      ? yup
          .string()
          .notOneOf([STATE_DEFAULT_VALUE, ""], VALIDATION_ERROR_MESSAGE.STATES)
      : yup.string(),
    note: isShareForm
      ? yup.string()
      : yup.string().required(VALIDATION_ERROR_MESSAGE.NOTE),
    referredFullName: isShareForm
      ? yup.string().required(VALIDATION_ERROR_MESSAGE.REFERRED_FULL_NAME)
      : yup.string(),
    referredEmail: isShareForm
      ? yup.string().email().required(VALIDATION_ERROR_MESSAGE.REFERRED_EMAIL)
      : yup.string(),
  });
