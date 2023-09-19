import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  quantity: Yup.number().positive().required("Quantity is required"),
});
