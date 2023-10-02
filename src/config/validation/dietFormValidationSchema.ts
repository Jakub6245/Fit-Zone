import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  weight: Yup.number().positive().required("Weight is required"),
  height: Yup.number().positive().required("Height is required"),
  age: Yup.number().positive().required("Age is required"),
});
