import { ToastContainer } from "react-toastify";
import Navigation from "@/shared/components/navigation/Navigation";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "lightgreen",
      }}
    >
      <Navigation />

      <ToastContainer />
    </div>
  );
}
