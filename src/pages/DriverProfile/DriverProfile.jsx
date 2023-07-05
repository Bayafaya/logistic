import { useEffect, useState } from "react";
import { UserOutlined,EditFilled,CheckOutlined } from "@ant-design/icons";
import { useUserAuth } from "../../store/userAuth";
import { Avatar, Button, Input, Select, Form,Rate, message  } from "antd";
import Description from "../../ui/Description";
import { useDriver } from "../../store/driver";

function DriverProfile() {
  const { user } = useUserAuth((state) => ({ user:state.user }));
  const { driver, fetchDriver, createDriver, updateDriver } = useDriver((state) => ({
    driver: state.driver,
    fetchDriver: state.fetchDriver,
    createDriver: state.createDriver,
    updateDriver: state.updateDriver,
  }));
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(()=>{
    fetchDriver(user._id)
  }, [])

  useEffect(()=>{
    form.setFieldsValue(driver)
  }, [driver])

  const onFinish = async (values) => {
    values.truckCapacity = +values.truckCapacity;
    values.truckVolume = +values.truckVolume;

    try {
      if (driver) {
        await updateDriver(driver._id, values, user.accessToken);
      } else {
        await createDriver(values, user.accessToken);
      }
      messageApi.open({
        type: 'success',
        content: 'Profile successfully updated',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {contextHolder}

      <strong>Your email:</strong> {user.email}

      <Form
        className="flex flex-col items-center lg:flex-row gap-6 lg:items-start p-4"
        form={form}
        size="large"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 place-items-start">
          <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Entry point</Description>
            <Form.Item 
                name="currentLocation"
            >
              <Input  />
            </Form.Item>
          </div>

          <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Truck capacity</Description>
            <Form.Item
                name="truckCapacity"
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
            <Description>Truck volume</Description>
            <Form.Item 
                name="truckVolume"
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <div className="border-b lg:border-l py-6 lg:py-4 w-full px-2 lg:px-4 lg:border-b-transparent space-y-1">
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
          </div>
        </div>
      </Form>
    </div>
  );
}

export default DriverProfile;
