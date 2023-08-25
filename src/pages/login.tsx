import React from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { validationSchema } from "@/config/loginValidationSchema";
import { createToastNotification } from "@/helpers/createToastNotification";


const initialValues = { email: "", password: "" };

export default function Login() {
  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );
      if (user) {
        createToastNotification("You are logged in!");
      }
    } catch (error) {
      createToastNotification("Wrong email or password");
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
