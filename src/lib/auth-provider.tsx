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
  getRefreshToken,
} from "./auth";
import type { User } from "@/types/api";
import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";
import { AuthContext } from "./auth-context";
import { AuthLoadingOverlay } from "@/components/ui/auth-loading-overlay";

type AuthAction = "idle" | "signin" | "signout" | "register";
const signInDelayMs = 2500;

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authAction, setAuthAction] = useState<AuthAction>("idle");

  const login = async (data: SignInInput) => {
    setAuthAction("signin");

    try {
      const resp = await signin(data);

      authSession.setAccessToken(resp.accessToken);

      const user = await getUser();
      setUser(user);
      await wait(signInDelayMs);

      return resp;
    } catch (err) {
      authSession?.clearAccessToken();
      setUser(null);

      throw err;
    } finally {
      setAuthAction("idle");
    }
  };

  const register = async (data: SignupInput) => {
    setAuthAction("register");

    try {
      const resp = await signup(data);

      authSession.setAccessToken(resp.accessToken);

      const user = await getUser();
      setUser(user);

      return resp;
    } catch (err) {
      authSession.clearAccessToken();
      setUser(null);

      throw err;
    } finally {
      setAuthAction("idle");
    }
  };

  const logout = async () => {
    setAuthAction("signout");

    try {
      await signout();
    } finally {
      authSession.clearAccessToken();
      setUser(null);
      setAuthAction("idle");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const resp = await getRefreshToken();
        authSession.setAccessToken(resp.accessToken);

        const user = await getUser();
        setUser(user);
      } catch {
        authSession.clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const isAuthActionLoading = authAction !== "idle";
  const authActionLabel =
    authAction === "signin"
      ? "Signing In"
      : authAction === "signout"
        ? "Signing Out"
        : authAction === "register"
          ? "Creating Account"
          : "";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthActionLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
      {isAuthActionLoading && <AuthLoadingOverlay label={authActionLabel} />}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth || auth.isLoading) {
    return null;
  }

  if (!auth?.user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
