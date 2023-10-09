import { ProfileContainer } from "@/features/profile/components/ProfileContainer/ProfileContainer";
import Navigation from "@/shared/components/navigation/Navigation";

const Profile = () => {
  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />
      <ProfileContainer />
    </div>
  );
};

export default Profile;
