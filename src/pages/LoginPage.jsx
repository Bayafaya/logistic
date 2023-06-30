import { useState } from "react";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Select,
  Segmented,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function LoginPage() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/home");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 90,
        }}
      >
        <Option value="+996">+996</Option>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  const [role, setRole] = useState("Shipper");
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

          <div className="mb-3">
            <Segmented
              value={role}
              onChange={(value) => setRole(value)}
              options={["Shipper", "Cargo Company", "Driver"]}
              block
            />
            <span className="text-secondary text-sm">
              Please input your role
            </span>
          </div>

          <Form.Item
            name="nameSurname"
            rules={[
              {
                // required: true,
                min: 3,
                message: "Please input your First and Last name!",
              },
            ]}
          >
            <Input placeholder="Please input your First and Last name" />
          </Form.Item>

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
            name="phone"
            rules={[
              {
                // required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>

          <Form.Item
            name="nameOfCompany"
            rules={[
              {
                // required: true,
                min: 3,
                message: "Please input company name!",
              },
            ]}
          >
            <Input placeholder="Please input company name" />
          </Form.Item>

          <Form.Item
            name="mcDotId"
            rules={[
              {
                // required: true,
                min: 3,
                message: "Please input MC/DOT personal number!",
              },
            ]}
          >
            <Input placeholder="Please input MC/DOT personal number" />
          </Form.Item>

          <Form.Item
            name="upload"
            rules={[
              {
                // required: true,
                message: "Please input MC/DOT personal number!",
              },
            ]}
            valuePropName="fileList"
            extra={
              <span className="text-secondary text-sm">
                Please input all necessary documents
              </span>
            }
            accept="image/png, image/gif, image/jpeg, image/svg+xml"
          >
            <Upload
              multiple
              maxCount={6}
              name="logo"
              action="/upload.do"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                // required: true,
                min: 3,
                message: "Please create your username longer!",
              },
            ]}
          >
            <Input placeholder="Please create your username" />
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              className="bg-primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default LoginPage;
