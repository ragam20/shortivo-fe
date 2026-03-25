import type React from "react";
import { useContext, useEffect, useState } from "react";
import { authSession } from "./auth-session-manager";
import {
  signup,
  signout,
  getUser,
  signin,
  type SignInInput,
  type SignupInput,
} from "./auth";
import type { User } from "@/types/api";
import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: SignInInput) => {
    const resp = await signin(data);

    authSession.setAccessToken(resp.accessToken);

    const user = await getUser();
    setUser(user);

    return resp;
  };

  const register = async (data: SignupInput) => {
    const resp = await signup(data);

    authSession.setAccessToken(resp.accessToken);

    return resp;
  };

  const logout = async () => {
    await signout();
    setUser(null);
    authSession.clearAccessToken();
  };

  useEffect(() => {
    const initUser = async () => {
      const token = authSession.getAccessToken();
      if (!token) {
        return;
      }

      const user = await getUser();
      setUser(user);
    };

    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
