import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice"; // Redux aksiyonu
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem("authToken", user.accessToken);

        dispatch(
          login({
            email: user.email,
            uid: user.uid,
          })
        );

        message.success("Başarıyla giriş yaptınız!");
        navigate("/");
      })
      .catch(() => {
        message.error("Geçersiz email veya şifre!");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h2>Giriş Yap</h2>

          <Form.Item
            label="Kullanıcı Adı / E-Posta"
            name="email"
            rules={[
              {
                required: true,
                message: "Lütfen e-posta adresini giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="register-button"
              type="default"
              onClick={() => navigate("/register")}
            >
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <Button
          className="forgot-password-button"
          type="link"
          onClick={() => navigate("/ForgotPass")}
        >
          Şifremi Unuttum
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
