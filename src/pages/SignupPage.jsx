import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Segmented,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth }  from "../store/userAuth.js";

function SignupPage() {
  const [role, setRole] = useState("shipper");
  const {signUp} = useUserAuth(state=>({setUser:state.setUser,signUp:state.signUp}))
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async(values) => {
    try {
      await signUp({...values, role})
      navigate("/");
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      {contextHolder}

      <ConfigProvider
        theme={{
          token: {
            borderRadius: "4px",
          },
        }}
      >
        <Form
          name="basic"
          className="border rounded-lg shadow-xl absolute w-full h-full sm:h-auto sm:w-[480px] pt-10 pb-6 px-6"
          size="large"
          onFinish={onFinish}
          autoComplete="off"
        >
          <h1 className="text-center text-3xl text-primary mb-10 ">
            CargoCode
          </h1>

          <div className="mb-3">
            <Segmented
              value={role}
              onChange={(value) => setRole(value)}
              options={[{value:"shipper",label:'Shipper'}, {value:"driver",label:'Driver'}]}
              block
            />
            <p className="text-center mt-3 text-secondary text-sm">
              Choose your role
            </p>
          </div>


          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Please input your E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                message: "Please create your password longer!",
              },
            ]}
          >
            <Input.Password placeholder="Please create your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              className="bg-primary"
              htmlType="submit"
            >
              Sign up
            </Button>
          </Form.Item>

          <Divider className='my-0' plain>or</Divider>
          <Link to='/signin'>
          <Button
              type="link"
              block
            >
              Sign in
            </Button>
            </Link>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default SignupPage;
