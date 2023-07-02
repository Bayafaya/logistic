import React, { useEffect, useState } from "react";
import { UserOutlined,EditFilled,CheckOutlined } from "@ant-design/icons";
import { useUserAuth } from "../../store/userAuth";
import { Avatar, Button, Input, Select, Form,Rate  } from "antd";
import Description from "../../ui/Description";

const {Option} = Select;
function ProfileTab() {
  const [disabledToEdit, setDisabledToEdit] = useState(true);
  const {user,setUser} = useUserAuth((state) => ({user:state.user,setUser:state.setUser}));
  const [form] = Form.useForm();

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
  
  useEffect(()=>{
    form.setFieldsValue(user)
    console.log(user);
  },[user])

  const onFinish = (values) => {
    setUser({...values});
  };

  const onFinishFailed = (errorInfo) => {
    setDisabledToEdit(false);
  };

  return (
    <div>
      <Form 
      className="flex flex-col items-center lg:flex-row gap-6 lg:items-start p-4"
      form={form}
      size="large"
      disabled={disabledToEdit}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
        <div className="space-y-4 flex flex-col items-center">
        <Avatar
          shape="square"
          className="flex justify-center items-center"
          size={192}
          icon={<UserOutlined />}
        />
        <Form.Item
          name="rate"
          rules={[
            {
              required: false,
            },
          ]}
        >
         <Rate allowHalf disabled />
        </Form.Item>

        <Button disabled={false} icon={disabledToEdit ? <EditFilled/> : <CheckOutlined/>}
        onClick={()=>setDisabledToEdit(!disabledToEdit)} 
        size="default" 
        className={`flex justify-center items-center ${disabledToEdit ?'bg-primary' : 'bg-teal-500 text-white'} border-none`} 
        type={disabledToEdit ? 'primary' : 'default'} 
        block
        htmlType="submit"
        >
          {disabledToEdit ? 'Edit' : 'Save'}
        </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 place-items-start">
        <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
          <Description>Full name :</Description>
          <Form.Item 
              name="nameSurname"
              rules={[
                {
                  required: true,
                  min: 3,
                  message: "Please input your First and Last name!",
                },
              ]}
          
          >
      
            <Input  />
          </Form.Item>
        </div>


         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Email:</Description>
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
            <Input value={user.email} />
          </Form.Item>
          </div>

         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Phone number:</Description>
            <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>

          </div>

         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Company name:</Description>
            <Form.Item
            name="nameOfCompany"
            rules={[
              {
                required: true,
                min: 3,
                message: "Please input company name!",
              },
            ]}
          >
            <Input placeholder="Please input company name" />
          </Form.Item>
          </div>

         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>MC/DOT number:</Description>
            <Form.Item
            name="mcDotId"
            rules={[
              {
                required: true,
                min: 3,
                message: "Please input MC/DOT personal number!",
              },
            ]}
          >
            <Input placeholder="Please input MC/DOT personal number" />
          </Form.Item>
          </div>

         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Role:</Description>
            <Form.Item
            name="role"
            rules={[
              {
                required: true,
                min: 3,
                message: "Please input MC/DOT personal number!",
              },
            ]}
          >
            <Input disabled />
            </Form.Item>
          </div>

         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Username:</Description>
            <Form.Item
            name="username"
            rules={[
              {
                required: true,
                min: 3,
                message: "Please create your username longer!",
              },
            ]}
          >
            <Input placeholder="Please create your username" />
          </Form.Item>
        
          </div>
         <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Password:</Description>
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
          </div>
        </div>
      </Form>

 
    </div>
  );
}

export default ProfileTab;
