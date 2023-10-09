import { ChangeEvent, useState } from "react";
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@/store/store";
import { updateUser } from "@/services/firebaseUserMethods";
import { useUpdateUserDataMutation } from "@/services/users";
import Image from "next/image";
import defaultImage from "../../../../../images.png";
import { UserObjectType } from "@/shared/types/UserType";
import styles from "./styles.module.scss";

export const AddImageInput = ({ user }: { user: UserObjectType }) => {
  const [updateUser] = useUpdateUserDataMutation();
  const [isFileInputShown, setIsFileInputShown] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // const [profileImage, setProfileImage] = useState(user.imageUrl);

  const uploadImage = () => {
    if (uploadedImage === null) return;
    // console.log(profileImage);
    if (!user.imageUrl) return;
    const imageRef = ref(storage, `images/${user.imageId}`);
    uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setProfileImage(url);
        updateUser({ userId: user.id, userData: { ...user, imageUrl: url } });
      });
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedImage(event.target.files[0]);
    }
  };

  return (
    <div className={styles.image__input__container}>
      <div className={styles.image__input__container__image}>
        <Image
          className={styles.image__input__image}
          src={user.imageUrl ? user.imageUrl : defaultImage}
          width={550}
          height={550}
          alt="profile image"
        />
      </div>
      {isFileInputShown && <input type="file" onChange={handleChange} />}
      <button
        onClick={() => {
          uploadImage();
          setIsFileInputShown(!isFileInputShown);
        }}
      >
        Upload image
      </button>
    </div>
  );
};
