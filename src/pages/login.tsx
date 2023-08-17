import React, { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { validationSchema } from "@/config/loginValidationSchema";

// https://chakra-ui.com/
// npm i react-toastify
// react-hook-form / formik

const successfulLoginToast = () => toast("You are logged in");

const failedLoginToast = () => toast("Wrong email or password");

const initialValues = { email: "", password: "" };

export default function Login() {
  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      if (user) successfulLoginToast();
      console.log(user);
    } catch (error) {
      failedLoginToast();
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={formik.values.email}
            type="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email}
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            value={formik.values.password}
            type="password"
            onChange={formik.handleChange}
          />
          {formik.errors.password}
        </div>
        <input type="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
