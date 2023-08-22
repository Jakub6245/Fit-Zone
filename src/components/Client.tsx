import { useFetchUsersChatsQuery } from "@/services/chats";
import {
  addChatObjectToDB,
  addClientToChatInDB,
  getChatObject,
} from "@/services/firebaseChatMethods";
import { StateType } from "@/types/StateType";
import { UserObjectType } from "@/types/UserType";
import { useSelector } from "react-redux";

const Client = ({ clientData }: { clientData: UserObjectType }) => {
  const user = useSelector((state: StateType) => state.userReducer.user);
  const { data } = useFetchUsersChatsQuery({
    userId: user.id,
    clientId: clientData.id,
  });
  if (!data) return;
  console.log(data);
  return (
    <div
      onClick={() => {
        addClientToChatInDB(user.id, clientData.id);
      }}
    >
      <p>
        {clientData.firstName} {clientData.lastName}
      </p>
    </div>
  );
};

export default Client;
