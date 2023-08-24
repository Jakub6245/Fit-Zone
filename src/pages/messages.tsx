import ChatWindow from "@/components/ChatWindow";
import ClientList from "@/components/ClientList";
import Navigation from "@/components/Navigation";
import { useFetchUsersChatQuery } from "@/services/chats";
import { StateType } from "@/types/StateType";
import { useSelector } from "react-redux";

const Messages = () => {
  const user = useSelector((state: StateType) => state.userReducer.user);
  const clientId = useSelector((state: StateType) => state.chatReducer.client);
  const { data, isFetching } = useFetchUsersChatQuery({
    userId: user.id,
    clientId: clientId,
  });

  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

  return (
    <div>
      <Navigation />
      <ClientList />
      {clientId && <ChatWindow chatData={data} />}
    </div>
  );
};

export default Messages;
