import { boundChatActions } from "@/hooks/useBindActionsToDispatch";
// import { useFetchUsersChatQuery } from "@/services/chats";
import { getChatObject } from "@/services/firebaseChatMethods";
import { useUser } from "@/store/store";

import { UserObjectType } from "@/types/UserType";

const Client = ({ clientData }: { clientData: UserObjectType }) => {
  // const user = useUser();
  // const { data } = useFetchUsersChatQuery(clientData.id);

  return (
    <div
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
