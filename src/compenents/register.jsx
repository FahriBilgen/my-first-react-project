import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setError("E-posta ve şifre gereklidir.");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter uzunluğunda olmalıdır.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // E-posta doğrulama linki gönder
      await sendEmailVerification(user);
      setSuccess(
        "Kullanıcı başarıyla kaydedildi! E-posta doğrulama linki gönderildi."
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setError("");
    } catch (e) {
      const errorMessage =
        e.code === "auth/email-already-in-use"
          ? "Bu e-posta zaten kullanılıyor."
          : e.code === "auth/invalid-email"
          ? "Geçersiz e-posta adresi."
          : e.code === "auth/weak-password"
          ? "Şifre çok zayıf. Lütfen daha güçlü bir şifre oluşturun."
          : `Hata: ${e.message}`;
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "500" }}>
        Kayıt Ol
      </h2>
      <Input
        placeholder="E-Posta"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.Password
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button onClick={handleRegister}>Kayıt Ol</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
