import { boundChatActions } from "@/shared/hooks/useBindActionsToDispatch";
import styles from "./styles.module.scss";
import { useDisclosure } from "@chakra-ui/react";
import { UserObjectType } from "@/shared/types/UserType";

const Client = ({ clientData }: { clientData: UserObjectType }) => {
  // const user = useUser();
  // const { data } = useFetchUsersChatQuery(clientData.id);

  return (
    <div
      className={styles.chat__user__container}
      onClick={() => {
        boundChatActions.setChatWithUserToChat({ chatWithUser: clientData.id });
      }}
    >
      <p>
        {clientData.firstName} {clientData.lastName}
      </p>
    </div>
  );
};

export default Client;
