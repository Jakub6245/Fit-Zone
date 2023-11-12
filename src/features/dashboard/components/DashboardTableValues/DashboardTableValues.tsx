import styles from "./styles.module.scss";

const dietTableLabels = [
  "Date",
  "Protein",
  "Carbohydrates",
  "Fats",
  "Calories",
];

export const DashboardTableValues = () => {
  return (
    <div className={styles.dashboard__table__values}>
      {dietTableLabels.map((el, i) => (
        <p className={styles.dashboard__table__values__text} key={i}>
          {el}
        </p>
      ))}
    </div>
  );
};
