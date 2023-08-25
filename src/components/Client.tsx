import { boundChatActions } from "@/hooks/useBindActionsToDispatch";
import { useFetchUsersChatQuery } from "@/services/chats";
import { useUser } from "@/store/store";

import { UserObjectType } from "@/types/UserType";

const Client = ({ clientData }: { clientData: UserObjectType }) => {
  const user = useUser();
  const { data } = useFetchUsersChatQuery({
    userId: user.id,
    chatWithUser: clientData.id,
  });
  if (!data) return;

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
