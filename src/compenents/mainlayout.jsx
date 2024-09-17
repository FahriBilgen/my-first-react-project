import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
  };

  const menuItems = [
    {
      key: "1",
      label: <Link to="/">Ana Sayfa</Link>,
    },
    {
      key: "4",
      label: <Link to="/ForgotPass">Şifre Yenile</Link>,
    },
    {
      key: "5",
      label: <Link to="/Listeler">Listeler</Link>,
    },
    {
      key: "2",
      label: isAuthenticated ? (
        <Link to="/profile">Profil</Link>
      ) : (
        <Link to="/login">Giriş Yap</Link>
      ),
    },
    {
      key: "3",
      label: isAuthenticated ? (
        <Link to="/logout" onClick={handleLogout}>
          Çıkış Yap
        </Link>
      ) : (
        <Link to="/register">Kayıt Ol</Link>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header style={{ position: "fixed", width: "100%", zIndex: 1 }}>
        <div
          className="logo"
          style={{ color: "white", fontSize: "20px", padding: "0 10px" }}
        >
          MyApp
        </div>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Layout style={{ padding: "0 40px", marginTop: 600 }}>
        <Content
          style={{
            padding: "0 50px",
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", padding: "20px 50px" }}>
          -----------------------
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
