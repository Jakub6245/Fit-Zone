import * as Yup from "yup";
import { phoneRegExp } from "../phoneNumberRegex";

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(
    phoneRegExp,
    "Provided number is incorrect"
  ),
});
