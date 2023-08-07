import { auth, dbUsersCollection } from "@/config/firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from "@/services/firebaseUserMethods";
import CheckboxGroup from "@/components/CheckboxInputs";
import { accountsTypes } from "@/config/accountsTypes";
import { UserType } from "@/types/UserType";

const createUserWithEmailAndPasswordPromise = (
  email: string,
  password: string,
  onSuccess,
  onError
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(onSuccess)
    .catch(onError);
};

export default function Register() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isTrainer: false,
  });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCheckboxChange = (value: UserType | null) => {
    if (value === "trainer") {
      setInputs({ ...inputs, isTrainer: true });
    } else {
      setInputs({ ...inputs, isTrainer: false });
    }
  };

  const onSuccess = (cred) => {
    if (inputs.isTrainer) {
      return addUser({
        id: cred.user.uid,
        ...inputs,
        notifications: [],
        clientList: [],
      });
    }
    addUser({
      id: cred.user.uid,
      ...inputs,
      notifications: [],
      trainerId: "",
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createUserWithEmailAndPasswordPromise(
      inputs.email,
      inputs.password,
      onSuccess,
      (error) => console.log(error)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">FirstName:</label>
      <input onChange={handleInputs} name="firstName" type="text" required />
      <label htmlFor="lastName">LastName:</label>
      <input onChange={handleInputs} name="lastName" type="text" required />

      <label htmlFor="email">Email:</label>
      <input onChange={handleInputs} name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input onChange={handleInputs} name="password" type="password" required />
      <label htmlFor="password">I am</label>
      <CheckboxGroup options={accountsTypes} onChange={handleCheckboxChange} />
      <input type="submit" />
    </form>
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
