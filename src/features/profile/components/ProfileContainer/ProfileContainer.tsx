import { useUser } from "@/store/store";
import { AddPhoneNumberInput } from "../AddPhoneNumberInput/AddPhoneNumberInput";
import { useState } from "react";
import { useFetchSingleUserDataQuery } from "@/services/users";
import { AddDescriptionInput } from "../AddDescriptionInput/AddDescriptionInput";
import Image from "next/image";
import defaultImage from "../../../../../images.png";
import { AddImageInput } from "../AddImageInput/AddImageInput";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import styles from "./styles.module.scss";

export const ProfileContainer = () => {
  const user = useUser();

  const { data } = useFetchSingleUserDataQuery(user.id);

  if (!data) return;

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container__info}>
        <AddImageInput user={data} />
        <h1 className={styles.profile__name}>
          {user.firstName} {user.lastName}
        </h1>
        <h2>{user.email}</h2>

        <AddPhoneNumberInput user={data} />

        <AddDescriptionInput user={data} />
      </div>
    </div>
  );
};
