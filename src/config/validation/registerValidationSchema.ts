import * as Yup from "yup";
import { emailRegex } from "../emailRegex";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Firstname must be at least 2 characters")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(2, "Lastname must be at least 2 characters")
    .required("Lastname is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
