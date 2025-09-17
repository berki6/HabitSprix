import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account, DEMO_MODE } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (DEMO_MODE) {
      // In demo mode, simulate a logged-in user
      setUser({
        $id: "demo_user",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        name: "Demo User",
        email: "demo@example.com",
        emailVerification: true,
        status: true,
        prefs: {},
        labels: [],
        phone: "",
        phoneVerification: false,
        registration: new Date().toISOString(),
        passwordUpdate: new Date().toISOString(),
        mfa: false,
        targets: [],
        accessedAt: new Date().toISOString(),
      } as unknown as Models.User<Models.Preferences>);
      setIsLoadingUser(false);
      return;
    }

    try {
      const session = await account!.get();
      setUser(session);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (DEMO_MODE) {
      // In demo mode, simulate successful signup
      return null;
    }

    try {
      await account!.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An error occured during signup";
    }
  };
  const signIn = async (email: string, password: string) => {
    if (DEMO_MODE) {
      // In demo mode, simulate successful signin
      setUser({
        $id: "demo_user",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        name: "Demo User",
        email: email,
        emailVerification: true,
        status: true,
        prefs: {},
        labels: [],
        phone: "",
        phoneVerification: false,
        registration: new Date().toISOString(),
        passwordUpdate: new Date().toISOString(),
        mfa: false,
        targets: [],
        accessedAt: new Date().toISOString(),
      } as unknown as Models.User<Models.Preferences>);
      return null;
    }

    try {
      await account!.createEmailPasswordSession(email, password);
      const session = await account!.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An error occured during sign in";
    }
  };

  const signOut = async () => {
    if (DEMO_MODE) {
      // In demo mode, simulate signout
      setUser(null);
      return;
    }

    try {
      await account!.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }

  return context;
}
