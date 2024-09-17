import { useState } from "react";
import { Button, Input, message } from "antd";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

function Home() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateNameSurname = (value) => /^[A-Za-zÇçĞğİıÖöŞşÜü]+$/.test(value);
  const validateAge = (value) =>
    /^\d{1,2}$/.test(value) && value >= 0 && value <= 120;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  const handleSave = async () => {
    if (!validateNameSurname(name)) {
      message.error("İsim yalnızca harflerden oluşmalıdır.");
      return;
    }
    if (!validateNameSurname(surname)) {
      message.error("Soyisim yalnızca harflerden oluşmalıdır.");
      return;
    }
    if (!validateAge(age)) {
      message.error("Yaş geçerli bir sayı olmalıdır (0-120 arası).");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name,
        surname,
        age,
      });
      message.success("Bilgiler başarıyla kaydedildi!");
      navigate("/listeler");
    } catch (error) {
      console.error("Error saving document: ", error);
      message.error("Bilgiler kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Hoş Geldiniz</h2>
      <Input
        placeholder="İsim"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Soyisim"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Yaş"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button type="primary" onClick={handleSave}>
        Kaydet
      </Button>
      <Button type="default" onClick={handleLogout} style={{ marginLeft: 10 }}>
        Çıkış Yap
      </Button>
    </div>
  );
}

export default Home;
