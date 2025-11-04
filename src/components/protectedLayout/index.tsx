import type { ReactElement } from "react";
import { Login } from "../../pages/login";
import { useAuth } from "../../contexts/authProvider/useAuth";

export const ProtectedLayout = ({ children }: { children: ReactElement }) => {
  const auth = useAuth();

  if (!auth.email) {
    return <Login />;
  }

  console.log(auth.email);

  return children;
};
