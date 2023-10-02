import { auth } from "@/config/firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { addUser } from "@/services/firebaseUserMethods";
import CheckBoxGroup from "@/features/register/components/CheckboxInputs";
import { accountsTypes } from "@/config/accountsTypes";
import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/registerValidationSchema";

import "react-toastify/dist/ReactToastify.css";
import { Button, Input, Text } from "@chakra-ui/react";

import { addUsersNotificationListToDB } from "@/features/notifications/services/firebaseNotificationMethods";
import { addUsersClientListToDB } from "@/features/ClientList/services/firebaseClientListMethods";
import PasswordInput from "@/features/register/components/PasswordInput";
import { createToastNotification } from "@/shared/helpers/createToastNotification";
import { UserType } from "@/shared/types/UserType";
import { addDietDayObjectToDB } from "@/features/dietDuringDay/services/firebaseDietDayMethods";

const createUserWithEmailAndPasswordPromise = (
  email: string,
  password: string,
  onSuccess: (cred: UserCredential) => void,
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
    createUserWithEmailAndPasswordPromise(
      formik.values.email,
      formik.values.password,
      onSuccess,
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

  const onSuccess = (cred: UserCredential) => {
    const notificationListId = addUsersNotificationListToDB();
    const clientListId = addUsersClientListToDB();

    if (!notificationListId || !clientListId) return;
    addUser({
      id: cred.user.uid,
      ...formik.values,
      userType,
      notificationListId,
      clientListId,
      chatList: [],
      dietObjectId: "",
      dietDayObjectId: "",
      description: "",
      phoneNumber: "",
      savedDietDaysObjectId: "",
    });
    createToastNotification("Your account has been created");
  };

  const onError = () => {
    createToastNotification("Wrong inputs data");
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "20%" }}>
      <div>
        <label htmlFor="firstName">FirstName:</label>
        <Input
          name="firstName"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.firstName}
        </Text>
      </div>
      <div>
        <label htmlFor="lastName">LastName:</label>
        <Input
          name="lastName"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.lastName}
        </Text>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <Input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <Text fontSize="md" color="red">
          {formik.errors.email}
        </Text>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <PasswordInput
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <Text fontSize="md" color="red">
          {formik.errors.password}
        </Text>
      </div>
      <div>
        <label>I am</label>
        <CheckBoxGroup
          options={accountsTypes}
          onChange={handleCheckboxChange}
        />
        <br />
      </div>
      <Button colorScheme="green" size="lg" type="submit">
        Submit
      </Button>
    </form>
  );
}
