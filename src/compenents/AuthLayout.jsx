import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Row gutter={16} style={{ height: "100%" }}>
        <Col className="gutter-row" span={18}>
          <div className="auth-container-left">
            <Outlet />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          sol
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
