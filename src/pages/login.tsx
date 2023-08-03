import React, { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGetUsers } from "@/services/fireBaseMethods";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(user.user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(useGetUsers());
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          value={inputs.email}
          type="email"
          onChange={handleInputs}
        />
        <label>Password:</label>
        <input
          name="password"
          value={inputs.password}
          type="password"
          onChange={handleInputs}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
