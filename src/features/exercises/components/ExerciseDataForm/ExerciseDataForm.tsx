import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/exerciseInputsValidation";
import { useAddExerciseToTrainingMutation } from "@/features/trainings/services/training";
import { useUser } from "@/store/store";
import { ExerciseT } from "@/features/trainings/types/training";
import { uuid } from "uuidv4";
import style from "./style.module.scss";

const initialValues = { sets: null, repetitions: null, weight: null };

export const ExerciseDataForm = ({
  exercise,
  isFormShown,
}: {
  exercise: ExerciseT;
  isFormShown: (isShown: boolean) => void;
}) => {
  const user = useUser();
  const [addExerciseToTraining] = useAddExerciseToTrainingMutation();

  const handleSubmit = () => {
    addExerciseToTraining({
      trainingId: user.trainingId,
      exercise: {
        ...exercise,
        id: uuid(),
        sets: formik.values.sets,
        repetitons: formik.values.repetitions,
        weight: formik.values.weight,
      },
    });
    isFormShown(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form className={style.exercise__data__form} onSubmit={formik.handleSubmit}>
      <label>Sets:</label>
      <input
        className={style.exercise__data__input}
        type="number"
        name="sets"
        onChange={formik.handleChange}
      />
      <label>Repetitions:</label>
      <input
        className={style.exercise__data__input}
        type="number"
        name="repetitions"
        onChange={formik.handleChange}
      />
      <label>Weigth in kg:</label>
      <input
        className={style.exercise__data__input}
        type="number"
        name="weight"
        onChange={formik.handleChange}
      />
      <button className={style.exercise__data__button} type="submit">
        Add
      </button>
    </form>
  );
};
