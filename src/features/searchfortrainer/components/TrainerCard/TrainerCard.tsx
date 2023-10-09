import React from "react";
import Image from "next/image";
import defaultImage from "../../../../../images.png";
import { UserObjectType } from "@/shared/types/UserType";
import { uuid } from "uuidv4";
import styles from "./styles.module.scss";
import { addNotificationToListToDB } from "@/features/notifications/services/firebaseNotificationMethods";
import { useDisclosure } from "@chakra-ui/react";
import { useUser } from "@/store/store";
import { TrainerModal } from "../TrainerModal/TrainerModal";

export const TrainerCard = ({
  trainerData,
}: {
  trainerData: UserObjectType;
}) => {
  const user = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.trainer__card__container} onClick={onOpen}>
      <Image
        className={styles.trainer__card__image}
        src={trainerData.imageUrl ? trainerData.imageUrl : defaultImage}
        alt="default-image"
        width={500}
        height={500}
      />
      <div className={styles.trainer__card__info__container}>
        <h1 className={styles.trainer__card__name}>
          {trainerData.firstName} {trainerData.lastName}
        </h1>
      </div>
      <TrainerModal
        isOpen={isOpen}
        onClose={onClose}
        trainerId={trainerData.id}
      />
    </div>
  );
};
