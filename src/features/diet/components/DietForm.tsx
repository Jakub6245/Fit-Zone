import React, { useState } from "react";

import { updateUser } from "@/services/firebaseUserMethods";

import { useFormik } from "formik";
import { validationSchema } from "@/config/dietFormValidationSchema";
import {
  calcCalories,
  calcFats,
  calcCarbohydrates,
} from "../helpers/calcMacroElements";
import "react-toastify/dist/ReactToastify.css";
import { Button, Text } from "@chakra-ui/react";

import { createToastNotification } from "@/shared/helpers/createToastNotification";

import { SelectInput } from "./SelectInput";
import { physicalActivities } from "../services/physicalActivitiesArray";
import { NumberInputElement } from "./NumberInput";
import { addDietObjectToDB } from "../services/firebaseDietMethods";

import { sexObject } from "../services/sexObjectArray";
import { useUser } from "@/store/store";
import { addDietDayObjectToDB } from "@/features/dietDuringDay/services/firebaseDietDayMethods";

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
    const calories = calcCalories(userData, sex);
    const fats = calcFats(calories);
    const protein = 2 * userData.weight;
    const carbohydrates = calcCarbohydrates(calories, protein, fats);
    console.log(calories, fats, protein, carbohydrates);
    const dietObjectId = addDietObjectToDB({
      calories,
      protein,
      carbohydrates,
      fats,
    });
    const dietDayObjectId = addDietDayObjectToDB();
    console.log(user.id);
    if (!dietObjectId || !dietDayObjectId) return;

    await updateUser(user.id, { ...user, dietObjectId, dietDayObjectId });
    createToastNotification("Your diet shedule has been created");
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
    <form onSubmit={formik.handleSubmit} style={{ width: "20%" }}>
      <div>
        <div>
          <label>Select your sex</label>
          <SelectInput options={sexObject} onChange={onSexSelectInputChange} />
        </div>
        <label htmlFor="weight">Weight in kg:</label>
        <NumberInputElement
          name="weight"
          onChange={(v) => formik.setFieldValue("weight", v)}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.weight}
        </Text>
      </div>
      <div>
        <label htmlFor="height">Height in cm:</label>
        <NumberInputElement
          name="height"
          onChange={(v) => formik.setFieldValue("height", v)}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.height}
        </Text>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <NumberInputElement
          name="age"
          onChange={(v) => formik.setFieldValue("age", v)}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.age}
        </Text>
      </div>
      <div>
        <label>Select your activity level</label>
        <SelectInput
          options={physicalActivities}
          onChange={onActivitySelectInputChange}
        />
      </div>
      <Button colorScheme="green" size="lg" type="submit">
        Submit
      </Button>
    </form>
  );
}
