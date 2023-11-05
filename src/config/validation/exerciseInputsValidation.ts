import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  sets: Yup.number()
    .max(10000, "Sets is to large")
    .positive()
    .required("Sets is required"),
  repetitions: Yup.number()
    .max(10000, "Repetitions is to large")
    .positive()
    .required("Repetitions is required"),
  weight: Yup.number()
    .max(1000, "Weigth is to large")
    .positive()
    .required("Weigth is required"),
});
