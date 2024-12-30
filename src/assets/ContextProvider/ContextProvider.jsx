import { useEffect, useState } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { Auth } from "../../Firebase/firebas.init";
import axios from "axios";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(Auth, email, pass);
  };

  const signInUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(Auth, email, pass);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(Auth, googleProvider);
  };

  const updateUserProfile = async (updatedData) => {
    setLoading(true);
    try {
      await updateProfile(Auth.currentUser, updatedData);
      await Auth.currentUser.reload();
      setUser({ ...Auth.currentUser });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(Auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const user = { email: currentUser.email };
        axios
          .post(`http://localhost:3000/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
          });
      } else {
        axios
          .post(
            `http://localhost:3000/logout`,
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            if (process.env.NODE_ENV === "development") {
              console.log(err);
            }
          });
      }
      if (process.env.NODE_ENV === "development") {
        console.log(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    updateUserProfile,
    logOutUser,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
