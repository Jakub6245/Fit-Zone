import { auth, dbUsersCollection } from "@/config/firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { addUser } from "@/services/firebaseUserMethods";
import CheckboxGroup from "@/components/CheckboxInputs";
import { accountsTypes } from "@/config/accountsTypes";
import { UserType } from "@/types/UserType";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import { validationSchema } from "@/config/registerValidationSchema";
import { InputsType } from "@/types/InputsType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successfulRegisterToast = () => toast("Your account has been created");

const createUserWithEmailAndPasswordPromise = (
  email: string,
  password: string,
  onSuccess: (cred: UserCredential) => Promise<void> | undefined,
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

export default function Register() {
  const [userType, setUserType] = useState("client");

  const handleSubmit = () => {
    successfulRegisterToast();
    createUserWithEmailAndPasswordPromise(
      formik.values.email,
      formik.values.password,
      onSuccess,
      (error) => console.log(error)
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
  console.log(formik.values);
  const onSuccess = (cred: UserCredential) => {
    if (userType === "trainer") {
      return addUser({
        id: cred.user.uid,
        ...formik.values,
        notifications: [],
        clientList: [],
        userType,
      });
    }
    addUser({
      id: cred.user.uid,
      ...formik.values,
      notifications: [],
      trainerId: "",
      userType,
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">FirstName:</label>
          <input
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName}
        </div>
        <div>
          <label htmlFor="lastName">LastName:</label>
          <input
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password}
        </div>
        <div>
          <label>I am</label>
          <CheckboxGroup
            options={accountsTypes}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

// const res = {
//   error: true,
//   response: {
//     validation: {
//       email: {
//         message: "bad email",
//       },
//     },
//   },
// };

// const Input = ({ name }) => {
//   return (
//     <>
//       {res.error && (
//         <p style={{ color: "red" }}>{res.response.validation[name].message}</p>
//       )}
//       <label htmlFor="email">Email:</label>
//       <input onChange={handleInputs} name={name} type="email" required />
//     </>
//   );
// };
