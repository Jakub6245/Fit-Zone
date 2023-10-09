import { useFetchSingleUserDataQuery } from "@/services/users";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { uuid } from "uuidv4";
import Image from "next/image";
import defaultImage from "../../../../../images.png";
import styles from "./styles.module.scss";
import { useAddNotificationToListMutation } from "@/features/notifications/services/notifications";
import { useUser } from "@/store/store";

export const TrainerModal = ({
  isOpen,
  onClose,
  trainerId,
}: {
  isOpen: boolean;
  onClose: () => void;
  trainerId: string;
}) => {
  const user = useUser();
  const { data } = useFetchSingleUserDataQuery(trainerId);
  const [addNotificationToList] = useAddNotificationToListMutation();

  const notificationObject = {
    id: uuid(),
    from: user.id,
    message: `the user ${user.firstName} ${user.lastName} wants to work with you`,
  };

  if (!data) return;
  const handleClick = () => {
    addNotificationToList({
      userId: data.notificationListId,
      newNotification: notificationObject,
    });
  };

  return (
    <div className={styles.trainer__modal__container}>
      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={styles.trainer__modal__content}>
          <Image
            className={styles.trainer__modal__image}
            src={data.imageUrl ? data.imageUrl : defaultImage}
            alt="default-image"
            width={500}
            height={500}
          />

          <ModalCloseButton />
          <ModalBody>
            <h1 className={styles.trainer__modal__name}>
              {data.firstName} {data.lastName}
            </h1>
            <p> {data.email}</p>
            <p> {data.phoneNumber}</p>
            <p>{data.description}</p>
          </ModalBody>

          <ModalFooter>
            <button
              className={
                styles.trainer__modal__button__close +
                " " +
                styles.trainer__modal__button
              }
              onClick={onClose}
            >
              Close
            </button>
            <button
              onClick={handleClick}
              className={
                styles.trainer__modal__button__add +
                " " +
                styles.trainer__modal__button
              }
            >
              Start cooperation
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
