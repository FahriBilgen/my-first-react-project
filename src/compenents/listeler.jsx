import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { List, Button, Modal, Input, message } from "antd";

function Listeler() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newAge, setNewAge] = useState("");

  useEffect(() => {
    // Fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü]+$/.test(newName)) {
      message.error("İsim yalnızca harflerden oluşmalıdır.");
      return;
    }
    if (!/^[A-Za-zÇçĞğİıÖöŞşÜü]+$/.test(newSurname)) {
      message.error("Soyisim yalnızca harflerden oluşmalıdır.");
      return;
    }
    if (!/^\d{1,2}$/.test(newAge) || newAge < 0 || newAge > 120) {
      message.error("Yaş geçerli bir sayı olmalıdır (0-120 arası).");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: newName,
        surname: newSurname,
        age: newAge,
      });
      message.success("Yeni kullanıcı başarıyla eklendi!");
      setIsModalOpen(false);
      setNewName("");
      setNewSurname("");
      setNewAge("");
      // Refresh the list
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error adding document: ", error);
      message.error("Kullanıcı eklenirken bir hata oluştu.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      message.success("Kullanıcı başarıyla silindi!");
      // Refresh the list
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error deleting document: ", error);
      message.error("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Kayıtlı Kullanıcılar</h2>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 20 }}
      >
        Yeni Kullanıcı Ekle
      </Button>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              // eslint-disable-next-line react/jsx-key
              <Button danger onClick={() => handleDeleteUser(user.id)}>
                Sil
              </Button>,
            ]}
          >
            {user.name} {user.surname} - Yaş: {user.age}
          </List.Item>
        )}
      />
      <Modal
        title="Yeni Kullanıcı Ekle"
        open={isModalOpen} // Güncellenmiş prop
        onOk={handleAddUser}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="İsim"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Soyisim"
          value={newSurname}
          onChange={(e) => setNewSurname(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Yaş"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          style={{ marginBottom: 10 }}
        />
      </Modal>
    </div>
  );
}

export default Listeler;
