import { LoginForm } from "@/features/login/components/LoginForm/LoginForm";
import { useUser } from "@/store/store";

const Login = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
