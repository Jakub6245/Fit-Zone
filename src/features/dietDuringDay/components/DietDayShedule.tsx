import { useUser } from "@/store/store";
import { useFetchUsersDietDayQuery } from "../services/dietDay";
import { DietDayProdcut } from "./DietDuringDayProduct/DietDayProduct";

export const DietDayShedule = () => {
  const user = useUser();
  const { data, isFetching } = useFetchUsersDietDayQuery(user.dietDayObjectId);
  if (isFetching) return <div>...Loading</div>;
  if (!data) return;
  console.log(data.dietDay);
  return (
    <div>
      {data.dietDay.map((el, i) => (
        <DietDayProdcut productData={el} key={i} />
      ))}
    </div>
  );
};
