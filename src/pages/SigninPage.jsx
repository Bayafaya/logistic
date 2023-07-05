import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Divider,
  message,
} from "antd";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useUserAuth }  from "../store/userAuth.js";

function SigninPage() {
    const {signIn} = useUserAuth(state=>({setUser:state.setUser,signIn:state.signIn}))
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async(values) => {
      try {
        await signIn(values);
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
              Sign in
            </Button>
          </Form.Item>
          <Divider className='my-0' plain>or</Divider>
          <Link to='/signup'>
          <Button
              type="link"
              block
            >
              Sign up
            </Button>
            </Link>
        </Form>
      </ConfigProvider>
    </div>
  )
}

export default SigninPage




