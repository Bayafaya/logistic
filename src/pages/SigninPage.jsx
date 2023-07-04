import React from 'react'
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Divider,
} from "antd";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useUserAuth }  from "../store/userAuth.js";



function SigninPage() {
    const [role, setRole] = useState("Shipper");
    const {setUser,signIn} = useUserAuth(state=>({setUser:state.setUser,signIn:state.signIn}))
    const navigate = useNavigate();

    const onFinish = async (values) => {
      await signIn(values);
      navigate("/");
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

  return (
    <div className="h-screen w-screen grid place-items-center">
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
          initialValues={{
            // remember: true,
            prefix: "+996",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 className="text-center text-3xl text-primary mb-10 ">
            &lt; Logo Here &frasl; &gt;{" "}
          </h1>

        

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                // required: true,
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
                // required: true,
                min: 3,
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
              Sign In
            </Button>
          </Form.Item>
          <Divider className='my-0' plain>or</Divider>
          <Link to='/signup'>
          <Button
              type="link"
              block
            >
              Sign Up
            </Button>
            </Link>
        </Form>
      </ConfigProvider>
    </div>
  )
}

export default SigninPage




