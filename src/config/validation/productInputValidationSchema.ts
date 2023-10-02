import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  quantity: Yup.number()
    .max(10000, "Quantity is to large")
    .positive()
    .required("Quantity is required"),
});
