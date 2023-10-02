import { useFetchUsersClientListQuery } from "@/features/ClientList/services/clientLists";
import Client from "../chatUser/ChatUser";
import { useFetchUsersDataQuery } from "@/services/users";
import { searchForUsersById } from "@/shared/helpers/searchForUsers";
import { useUser, useChatWithUser } from "@/store/store";
import ChatWindow from "../../../chat/components/ChatWindow/ChatWindow";
import { Collapse, useDisclosure } from "@chakra-ui/react";

import styles from "./styles.module.scss";
import { useEffect } from "react";
import { boundChatActions } from "@/shared/hooks/useBindActionsToDispatch";

const ClientList = () => {
  const user = useUser();
  const chatWithUserId = useChatWithUser();
  const clientsId = useFetchUsersClientListQuery(user.clientListId);
  const users = useFetchUsersDataQuery();

  if (!users.data || !clientsId.data) return;

  const clients = searchForUsersById(users.data, clientsId.data.clientList);
  return (
    <div>
      <div className={styles.chat__users__list__container}>
        {clients.map((el, i) => {
          return (
            <div
              className={styles.chat__users__list__client__container}
              key={i}
            >
              <Client clientData={el} />
            </div>
          );
        })}
        {clients.length === 0 && (
          <p className={styles.chat__users__list__message}>
            You do not have any clients
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientList;
