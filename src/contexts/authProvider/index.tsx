import { Children, createContext, useEffect, useState } from "react";
import { Api } from "../../services/api";

interface IAuthProvider {
  children: React.ReactElement;
}

// Tipagem do usuario que sera fornecido
interface IUser {
  email?: string;
  token?: string;
}

// Tipagem do que sera fornecido pelo contexto
interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    getLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
  }

  function getLocalStorage() {
    const json = localStorage.getItem("u");

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);
    return user ?? json;
  }

  async function LoginRequest(email: string, password: string) {
    try {
      const request = await Api.post("login", { email, password });
      return request.data;
    } catch (error) {
      console.log(error);
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
