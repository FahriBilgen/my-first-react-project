import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./compenents/Login";
import Register from "./compenents/register";
import Home from "./compenents/home";
import ProtectedRoute from "./compenents/ProtectedRoute";
import Listeler from "./compenents/listeler";
import AuthLayout from "./compenents/AuthLayout";
import MainLayout from "./compenents/mainlayout";
import ForgotPassword from "./compenents/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/ForgotPass" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/listeler"
            element={
              <ProtectedRoute>
                <Listeler />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
