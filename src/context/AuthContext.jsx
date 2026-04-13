import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase/config";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync Profile Data
        const userRef = ref(db, `users/${currentUser.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserData(data);
          } else {
            // Initial profile setup
            const initialData = {
              name: currentUser.displayName,
              email: currentUser.email,
              phone: "",
              address: "",
              pin: ""
            };
            set(userRef, initialData);
            setUserData(initialData);
          }
        });
        // Check Admin Session
        const adminAuth = localStorage.getItem("adminAuth");
        if (adminAuth === "true") setIsAdmin(true);
      } else {
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => {
    localStorage.removeItem("adminAuth");
    return signOut(auth);
  };

  const adminLogin = (password) => {
    if (password === "722140") {
      localStorage.setItem("adminAuth", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin, loginWithGoogle, logout, adminLogin, setIsAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
