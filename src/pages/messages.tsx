import ChatWindow from "@/components/ChatWindow";
import ClientList from "@/components/ClientList";
import Navigation from "@/components/Navigation";
import { useFetchUsersChatQuery } from "@/services/chats";
import { useChatWithUser, useUser } from "@/store/store";

const Messages = () => {
  const user = useUser();
  const chatWithUserId = useChatWithUser();

  const getChatObject = () => {
    if (user.userType === "trainer") {
      return {
        userId: user.id,
        chatWithUser: chatWithUserId,
      };
    }

    return {
      userId: chatWithUserId,
      chatWithUser: user.id,
    };
  };
  console.log(getChatObject());

  const { data, isFetching } = useFetchUsersChatQuery(getChatObject());
  console.log(data);
  if (isFetching) {
    return <div>...Loading</div>;
  }

  if (!data) return;

  return (
    <div>
      <Navigation />
      <ClientList />
      {chatWithUserId && <ChatWindow chatData={data} />}
    </div>
  );
};

export default Messages;
