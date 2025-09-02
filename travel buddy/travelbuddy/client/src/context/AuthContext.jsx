import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import API from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // build minimal profile object
        const token = await fbUser.getIdToken();
        const profile = {
          uid: fbUser.uid,
          name: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          accessToken: token,
        };

        // create/update user in backend (protected route will accept token)
        try {
          await API.put("/users/me", {
            uid: profile.uid,
            name: profile.name,
            email: profile.email,
          });
        } catch (e) {
          // backend may create user automatically; ignore errors
          console.warn("backend user upsert failed", e?.message);
        }

        setUser(profile);
        localStorage.setItem("tb_user", JSON.stringify(profile));
      } else {
        setUser(null);
        localStorage.removeItem("tb_user");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
