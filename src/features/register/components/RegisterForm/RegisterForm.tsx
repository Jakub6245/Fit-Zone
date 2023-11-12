import { auth } from "@/config/firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { addUser } from "@/shared/services/firebaseUserMethods";
import { CheckBoxGroup } from "@/features/register/components/CheckboxInputs/CheckboxInputs";
import { accountsTypes } from "@/config/accountsTypes";
import { FormikValues, useFormik } from "formik";
import { validationSchema } from "@/config/validation/registerValidationSchema";

import "react-toastify/dist/ReactToastify.css";
import { Text } from "@chakra-ui/react";

import { addUsersNotificationListToDB } from "@/features/notifications/services/firebaseNotificationMethods";
import { addChatUsersListToDB } from "@/features/chatUsers/services/chatUsersMethods";
import PasswordInput from "@/shared/components/PasswordInput/PasswordInput";
import { createToastNotification } from "@/shared/helpers/createToastNotification";
import { UserType } from "@/shared/types/UserType";
import { uuid } from "uuidv4";
import {
  addSavedTrainingsObject,
  addTrainingObjectToDB,
} from "@/features/trainings/services/trainingMethods";
import styles from "./styles.module.scss";
import { NextRouter, useRouter } from "next/router";
import { getDate } from "@/features/dietDuringDay/helpers/getYesterdayDate";

const createUserWithEmailAndPasswordPromise = (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(onSuccess)
    .catch(onError);
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const onSuccess = (
  formik: FormikValues,
  userType: string,
  router: NextRouter
) => {
  const notificationListId = addUsersNotificationListToDB();
  const chatUsersListId = addChatUsersListToDB();
  const trainingId = addTrainingObjectToDB();
  const savedTrainingsId = addSavedTrainingsObject();

  router.push("/");

  if (
    !notificationListId ||
    !chatUsersListId ||
    !trainingId ||
    !savedTrainingsId ||
    !auth.currentUser
  )
    return;
  addUser({
    id: auth.currentUser.uid,
    ...formik.values,
    userType,
    notificationListId,
    chatUsersListId,
    chatList: [],
    dietObjectId: "",
    dietDayObjectId: "",
    currentDate: getDate(),
    description: "",
    phoneNumber: "",
    savedDietDaysObjectId: "",
    imageId: uuid(),
    imageUrl: "",
    trainingId,
    savedTrainingsId,
  });
  createToastNotification("Your account has been created");
};

const onError = () => {
  createToastNotification("Wrong inputs data");
};
export const RegisterForm = () => {
  const [userType, setUserType] = useState("client");
  const router = useRouter();

  const handleSubmit = () => {
    createUserWithEmailAndPasswordPromise(
      formik.values.email,
      formik.values.password,
      () => onSuccess(formik, userType, router),
      onError
    );
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleCheckboxChange = (value: UserType | null) => {
    if (value === "trainer") {
      setUserType("trainer");
    } else {
      setUserType("client");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.register__form}>
      <div className={styles.register__form__input__container}>
        <label htmlFor="firstName">FirstName:</label>
        <br />
        <input
          className={styles.register__form__input}
          name="firstName"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="large" color="red">
          {formik.errors.firstName}
        </Text>
      </div>
      <div className={styles.register__form__input__container}>
        <label htmlFor="lastName">LastName:</label>
        <br />
        <input
          className={styles.register__form__input}
          name="lastName"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="large" color="red">
          {formik.errors.lastName}
        </Text>
      </div>
      <div className={styles.register__form__input__container}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          className={styles.register__form__input}
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="large" color="red">
          {formik.errors.email}
        </Text>
      </div>
      <div className={styles.register__form__input__container}>
        <label htmlFor="password">Password:</label>
        <PasswordInput
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <Text fontSize="large" color="red">
          {formik.errors.password}
        </Text>
      </div>
      <div className={styles.register__form__input__container}>
        <label>I am</label>
        <CheckBoxGroup
          options={accountsTypes}
          onChange={handleCheckboxChange}
        />
        <br />
        <div className={styles.register__form__button__container}>
          <button className={styles.register__form__button} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
