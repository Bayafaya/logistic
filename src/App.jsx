import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AllOrders from "./pages/AllOrders.jsx";


const PAGES = [
  {
    key: "/profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
  },
  {
    key: "/my-orders",
    icon: React.createElement(AppstoreOutlined),
    label: "My orders",
  },
  {
    key: "/all-orders",
    icon: React.createElement(AppstoreOutlined),
    label: "All orders",
  },
];

const { Content, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState("");


  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const handleMenuSelect = (event) => {
    navigate(event.key);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPage]}
          items={PAGES}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          background: colorBgContainer,
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-orders" element={<MyOrders />} /> 
            <Route path="/all-orders" element={<AllOrders />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
};

export default App;
