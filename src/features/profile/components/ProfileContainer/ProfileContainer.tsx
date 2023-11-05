import { useUser } from "@/store/store";
import { AddPhoneNumberInput } from "../AddPhoneNumberInput/AddPhoneNumberInput";
import { useFetchSingleUserDataQuery } from "@/shared/services/users";
import { AddDescriptionInput } from "../AddDescriptionInput/AddDescriptionInput";
import { AddImageInput } from "../AddImageInput/AddImageInput";
import styles from "./styles.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

import { useRouter } from "next/router";

export const ProfileContainer = () => {
  const user = useUser();
  const router = useRouter();

  const { data } = useFetchSingleUserDataQuery(user.id);

  if (!data) return;

  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

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

        <button className={styles.profile__button} onClick={handleSignout}>
          Sign out
        </button>
      </div>
    </div>
  );
};
