import { DietForm } from "@/features/diet/components/DietForm";
import { DietShedule } from "@/features/diet/components/DietShedule/DietSchedule";
import { useFetchUsersDietObjectQuery } from "@/features/diet/services/diets";
import { DietObjectT } from "@/features/diet/types/dietObject";
import { DietDayShedule } from "@/features/dietDuringDay/components/DietDayShedule";
import { ProductInput } from "@/features/product/components/ProductInput";
import { addProductToListToDB } from "@/features/product/services/firebaseProductsMethods";
import Navigation from "@/shared/components/Navigation";
import { useUser } from "@/store/store";
import { test } from "node:test";
import { useEffect } from "react";

const Diets = () => {
  const user = useUser();
  const isUserDietIsCreated = user.dietObjectId !== "";
  return (
    <div>
      <Navigation />

      {!isUserDietIsCreated && <DietForm />}
      {isUserDietIsCreated && <DietShedule />}
      {isUserDietIsCreated && <DietDayShedule />}
      {isUserDietIsCreated && <ProductInput />}
    </div>
  );
};

export default Diets;
