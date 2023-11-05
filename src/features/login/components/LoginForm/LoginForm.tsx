import React from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { FormikValues, useFormik } from "formik";
import { validationSchema } from "@/config/validation/loginValidationSchema";
import { createToastNotification } from "@/shared/helpers/createToastNotification";
import PasswordInput from "@/shared/components/PasswordInput/PasswordInput";
import { Text, Input, Button } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";

const initialValues = { email: "", password: "" };

const handleFormSubmit = async (formik: FormikValues, router: NextRouter) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      formik.email,
      formik.password
    );
    if (user) {
      createToastNotification("You are logged in!");
      router.push("/");
    }
  } catch (error) {
    createToastNotification("Wrong email or password");
    console.log(error);
  }
};

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = () => {
    handleFormSubmit(formik.values, router);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.login__form}>
      <div className={styles.login__form__input__container}>
        <label>Email:</label>
        <input
          className={styles.login__form__input}
          name="email"
          value={formik.values.email}
          type="email"
          onChange={formik.handleChange}
        />
        <Text fontSize="large" color="red">
          {formik.errors.email}
        </Text>
      </div>
      <div className={styles.login__form__input__container}>
        <label>Password:</label>
        <PasswordInput
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Text fontSize="large" color="red">
          {formik.errors.password}
        </Text>
      </div>
      <div className={styles.login__form__button__container}>
        <button className={styles.login__form__button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
