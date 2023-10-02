import React from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/loginValidationSchema";
import { createToastNotification } from "@/shared/helpers/createToastNotification";
import PasswordInput from "@/features/register/components/PasswordInput";
import { Text, Input, Button } from "@chakra-ui/react";

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
      <form onSubmit={formik.handleSubmit} style={{ width: "20%" }}>
        <div>
          <label>Email:</label>
          <Input
            name="email"
            value={formik.values.email}
            type="email"
            onChange={formik.handleChange}
          />
          <Text fontSize="md" color="red">
            {formik.errors.email}
          </Text>
        </div>
        <div>
          <label>Password:</label>
          <PasswordInput
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Text fontSize="md" color="red">
            {formik.errors.password}
          </Text>
        </div>
        <Button colorScheme="green" size="lg" type="submit">
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
