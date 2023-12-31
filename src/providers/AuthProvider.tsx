import { createContext, useState, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  authUser: any;
  login: (userData: any) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState(null);
  const login = (userData: any) => {
    setAuthUser(userData);
  };
  const logout = () => {
    setAuthUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
