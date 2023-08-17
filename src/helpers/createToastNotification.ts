import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createToastNotification = (message: string) => toast(message);
