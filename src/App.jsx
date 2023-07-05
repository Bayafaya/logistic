import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import SignupPage from "./pages/SignupPage.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import SigninPage from "./pages/SignInPage.jsx";
import { useUserAuth } from "./store/userAuth.js";
import DriverProfile from "./pages/DriverProfile/DriverProfile.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


const SHIPPER_PAGES = [
  {
    key: "/shipper-profile",
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
  {
    key: "logOut",
    icon: React.createElement(AppstoreOutlined),
    label: "Log out",
  },
];
const DRIVER_PAGES = [
  {
    key: "/driver-profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
  },
  {
    key: "/all-orders",
    icon: React.createElement(AppstoreOutlined),
    label: "All orders",
  },
  {
    key: "logOut",
    icon: React.createElement(AppstoreOutlined),
    label: "Log out",
  },
];

const { Content, Sider } = Layout;
const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user,logout} = useUserAuth(state=>({user:state.user,logout:state.logout}))
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage, setCurrentPage] = useState("");

  const pages = useMemo(() => user.role === 'driver' ? DRIVER_PAGES : SHIPPER_PAGES, [user]);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(()=>{
    if(user.accessToken){
      if (user.role === 'driver') {
        navigate('/driver-profile')
      } else {
        navigate('/shipper-profile')
      }
    }else{
      navigate('/signin')
    }
  },[])

  const handleMenuSelect = (event) => {
    navigate(event.key);
    if(event.key === 'logOut'){
      logout();
      navigate('/signin');
    }
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
          items={pages}
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
            <Route path="/shipper-profile" element={<ProfilePage />} />
            <Route path="/driver-profile" element={<DriverProfile />} />
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
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
};

export default App;
