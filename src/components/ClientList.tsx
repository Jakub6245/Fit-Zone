import { useSelector } from "react-redux";

import { StateType } from "@/types/StateType";
import { useFetchUsersClientListQuery } from "@/services/clientLists";
import Client from "./Client";
import { useFetchUsersDataQuery } from "@/services/users";
import { searchForUsersById } from "@/helpers/searchForUsers";

const ClientList = () => {
  const user = useSelector((state: StateType) => state.userReducer.user);

  const clientsId = useFetchUsersClientListQuery(user.id);
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
    </div>
  );
};

export default ClientList;
