import { useState } from "react";
import { Input, Button, message } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      message.error("Lütfen e-posta adresinizi giriniz.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      message.success(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Şifrenizi mi Unuttunuz?</h2>
      <Input
        placeholder="E-Posta"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button type="primary" onClick={handleResetPassword} loading={loading}>
        Şifre Sıfırlama Bağlantısı Gönder
      </Button>
    </div>
  );
};

export default ForgotPassword;
