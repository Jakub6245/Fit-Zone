import React, { useState } from "react";

import { updateUser } from "@/services/firebaseUserMethods";

import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/dietFormValidationSchema";
import {
  calcCalories,
  calcFats,
  calcCarbohydrates,
} from "../../helpers/calcMacroElements";
import "react-toastify/dist/ReactToastify.css";
import { Button, Text } from "@chakra-ui/react";

import { createToastNotification } from "@/shared/helpers/createToastNotification";

import { SelectInput } from "../SelectInput/SelectInput";
import { physicalActivities } from "../../services/physicalActivitiesArray";
import { NumberInputElement } from "../NumberInput/NumberInput";
import { addDietObjectToDB } from "../../services/firebaseDietMethods";

import { sexObject } from "../../services/sexObjectArray";
import { useUser } from "@/store/store";
import {
  addDietDayObjectToDB,
  addSavedDietDaysObject,
} from "@/features/dietDuringDay/services/firebaseDietDayMethods";
import styles from "./styles.module.scss";

const initialValues = {
  weight: "",
  height: "",
  age: "",
};

export function DietForm() {
  const [physicalActivity, setPhysicalActivity] = useState<number>(1);
  const [sex, setSex] = useState("");
  const user = useUser();

  const handleSubmit = async () => {
    try {
      const calories = calcCalories(userData, sex);
      const fats = calcFats(calories);
      const protein = 2 * userData.weight;
      const carbohydrates = calcCarbohydrates(calories, protein, fats);
      console.log(calories, fats, protein, carbohydrates);
      const dietObjectId = addDietObjectToDB({
        calories,
        protein,
        fats,
        carbohydrates,
      });
      const dietDayObjectId = addDietDayObjectToDB();
      const savedDietDaysObjectId = addSavedDietDaysObject();
      console.log(dietObjectId, dietDayObjectId);
      if (!dietObjectId || !dietDayObjectId || !savedDietDaysObjectId) return;
      console.log(23423);
      await updateUser(user.id, {
        ...user,
        dietObjectId,
        dietDayObjectId,
        savedDietDaysObjectId,
      });
      createToastNotification("Your diet shedule has been created");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });
  console.log(formik.values);
  const userData = {
    weight: Number(formik.values.weight),
    height: Number(formik.values.height),
    age: Number(formik.values.age),
    physicalActivity,
  };

  const onActivitySelectInputChange = (value: string) => {
    setPhysicalActivity(Number(value));
  };

  const onSexSelectInputChange = (value: string) => {
    setSex(value);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.diet__form}>
      <h1 className={styles.diet__form__header}>
        Calculate your caloric needs and nutritional values
      </h1>
      <div>
        <div className={styles.diet__form__input__container}>
          <label>Select your sex</label>
          <br />
          <SelectInput options={sexObject} onChange={onSexSelectInputChange} />
        </div>
        <div className={styles.diet__form__input__container}>
          <label htmlFor="weight">Weight in kg:</label>
          <NumberInputElement
            name="weight"
            onChange={(v) => formik.setFieldValue("weight", v)}
          />

          <Text fontSize="3xl" color="red">
            {formik.errors.weight}
          </Text>
        </div>
      </div>
      <div className={styles.diet__form__input__container}>
        <label htmlFor="height">Height in cm:</label>
        <NumberInputElement
          name="height"
          onChange={(v) => formik.setFieldValue("height", v)}
        />

        <Text fontSize="3xl" color="red">
          {formik.errors.height}
        </Text>
      </div>
      <div className={styles.diet__form__input__container}>
        <label htmlFor="age">Age:</label>
        <NumberInputElement
          name="age"
          onChange={(v) => formik.setFieldValue("age", v)}
        />

        <Text fontSize="3xl" color="red">
          {formik.errors.age}
        </Text>
      </div>
      <div className={styles.diet__form__input__container}>
        <label>Select your activity level</label>
        <br />
        <SelectInput
          options={physicalActivities}
          onChange={onActivitySelectInputChange}
        />
      </div>
      <div className={styles.diet__form__button__container}>
        <button className={styles.diet__form__button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
