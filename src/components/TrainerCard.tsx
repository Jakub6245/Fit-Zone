import React from "react";
import Image from "next/image";
import defaultImage from "../../images.png";
import { UserObjectType } from "@/types/UserType";
import { uuid } from "uuidv4";
import { auth } from "@/config/firebaseConfig";
import { addNotificationToListToDB } from "@/services/firebaseNotificationMethods";

import { useUser } from "@/store/store";

export const TrainerCard = ({
  trainerData,
}: {
  trainerData: UserObjectType;
}) => {
  const user = useUser();
  const handleClick = async () => {
    if (user) {
      const notificationObject = {
        id: uuid(),
        from: user.id,
        message: `the user ${user.firstName} ${user.lastName} wants to work with you`,
      };

      addNotificationToListToDB(
        trainerData.notificationListId,
        notificationObject
      );
    }
  };

  return (
    <div>
      <Image src={defaultImage} alt="default-image" />
      <h1>
        {trainerData.firstName} {trainerData.lastName}
      </h1>
      <p>Contact me: {trainerData.email}</p>
      <button onClick={handleClick}>Establish cooperation</button>
    </div>
  );
};
