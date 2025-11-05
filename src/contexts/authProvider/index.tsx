import { createContext, useEffect, useState } from "react";
import { AuthApi } from "../../services/api";

interface IAuthProvider {
  children: React.ReactElement;
}

// Tipagem do usuario que sera fornecido
interface IUser {
  email?: string;
  token?: string;
}

// Tipagem do que sera fornecido pelo contexto
export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  function getLocalStorage() {
    const json = localStorage.getItem("u");

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);
    return user;
  }

  useEffect(() => {
    const user = getLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
  }

  async function LoginRequest(email: string, password: string) {
    try {
      const request = await AuthApi.post("login", { email, password });
      return request.data;
    } catch (error) {
      alert("Usuário ou senha incorretos");
      return null;
    }
  }

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
