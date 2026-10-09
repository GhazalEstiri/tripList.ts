import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";

interface User {
  name: string;
  email: string;
  remmember: boolean;
}
interface State {
  user?: User | null;
  login: (name: string, email: string, remmember: boolean) => void;
  logout: () => void;
}
const initialState: State = {
  user: null,
  login: () => {},
  logout: () => {},
};
const loginContext = createContext(initialState);
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (name:string, email:string, remmember:boolean) => {
    const userData = { name, email, remmember };
    if (remmember) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      setUser(userData);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <div>
      <loginContext.Provider value={{ user, logout, login }}>
        {children}
      </loginContext.Provider>
    </div>
  );
}
export { loginContext };
export default AuthProvider;
