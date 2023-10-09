import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  description: Yup.string().max(1000, "Your descritpion is too long"),
});
