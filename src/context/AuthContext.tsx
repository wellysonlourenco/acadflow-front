import { api } from "@/lib/api";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN'
}

interface AuthContextData {
  user: IUser | null;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
  signed: boolean;
}


export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);



  const signIn = async ({ email, password }: { email: string; password: string }) => {
      const response = await api.post("/auth/login", { email, password });

      if(response && response.data) {
        toast.success('Autenticado com Sucesso!')
        setUser(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
  
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);

      } else {
        toast.error('Credenciais inválidas.')
      }
  }



  const signOut = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logout realizado com sucesso!");
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
