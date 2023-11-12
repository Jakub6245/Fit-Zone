import { DashboardContainer } from "@/features/dashboard/components/DashboardContainer/DashboardContainer";
import Navigation from "@/shared/components/navigation/Navigation";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
