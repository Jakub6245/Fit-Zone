import ChatWindow from "@/components/ChatWindow";
import ClientList from "@/components/ClientList";
import Navigation from "@/components/Navigation";
import { useFetchUsersChatQuery } from "@/services/chats";
import { useChatWithUser, useUser } from "@/store/store";

const Messages = () => {
  const user = useUser();
  const chatWithUserId = useChatWithUser();

  // const getChatObject = () => {
  //   if (user.userType === "trainer") {
  //     return {
  //       userId: user.id,
  //       chatWithUser: chatWithUserId,
  //     };
  //   }

  //   return {
  //     userId: chatWithUserId,
  //     chatWithUser: user.id,
  //   };
  // };
  // console.log(getChatObject());

  return (
    <div>
      <Navigation />
      <ClientList />
      {chatWithUserId && <ChatWindow />}
    </div>
  );
};

export default Messages;
