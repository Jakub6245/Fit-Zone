import { useFetchUsersClientListQuery } from "@/services/clientLists";
import Client from "./Client";
import { useFetchUsersDataQuery } from "@/services/users";
import { searchForUsersById } from "@/helpers/searchForUsers";
import { useUser, useChatWithUser } from "@/store/store";
import ChatWindow from "./ChatWindow";

const ClientList = () => {
  const user = useUser();
  const chatWithUserId = useChatWithUser();
  const clientsId = useFetchUsersClientListQuery(user.clientListId);
  const users = useFetchUsersDataQuery();

  if (users.isFetching || clientsId.isFetching) {
    return <div>...Loading</div>;
  }

  if (!users.data || !clientsId.data) return;

  const clients = searchForUsersById(users.data, clientsId.data.clientList);
  return (
    <div>
      {clients.map((el, i) => {
        return <Client key={i} clientData={el} />;
      })}
      {clients.length === 0 && <div>You do not have any clients</div>}

      {chatWithUserId && <ChatWindow />}
    </div>
  );
};

export default ClientList;
