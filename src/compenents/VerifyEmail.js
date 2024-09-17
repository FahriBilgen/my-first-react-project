import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          // Kullanıcı e-posta doğrulaması yapmış
          navigate("/home");
        } else {
          // Kullanıcı e-posta doğrulamasını yapmamış
          navigate("/verify-email");
        }
      } else {
        // Kullanıcı giriş yapmamış
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null;
};

export default VerifyEmail;
