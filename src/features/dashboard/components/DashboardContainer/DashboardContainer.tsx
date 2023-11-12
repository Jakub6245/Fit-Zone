import { DashboardTable } from "../DashboardTable/DashboardTable";
import { MonthlyTrainings } from "../MonthlyTrainings/MonthlyTrainings";
import styles from "./styles.module.scss";

export const DashboardContainer = () => {
  return (
    <div className={styles.dashboard__container}>
      <MonthlyTrainings />
      <DashboardTable />
    </div>
  );
};
