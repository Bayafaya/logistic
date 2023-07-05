import { Button, ConfigProvider, DatePicker, Form, Input, message } from "antd";
import { useOrder } from "../store/order";
import { useUserAuth } from "../store/userAuth";
import dayjs from "dayjs";
import { useState } from "react";

const { RangePicker } = DatePicker;

function ShipperForm({ handleClose }) {
  const user = useUserAuth(state=>state.user)
  const postNewOrder= useOrder((state) =>state.postNewOrder);
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    values.weight = +values.weight;
    values.volume = +values.volume;
    values.startDate = dayjs(values.dates[0]).valueOf() / 1000;
    values.endDate = dayjs(values.dates[1]).valueOf() / 1000;

    setLoading(true);
    try {
      await postNewOrder(values, user.accessToken)
      messageApi.open({
        type: 'success',
        content: 'Order successfully created',
      });
      handleClose();
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="">
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
          size="large"
          onFinish={onFinish}
          autoComplete="off"
          disabled={loading}
        >
          <h1 className="text-center text-2xl mb-10 ">
            Create order
          </h1>

          <Form.Item
            name="startLocation"
            rules={[
              {
                required: true,
                message: "Start location must be exist",
              },
            ]}
          >
            <Input placeholder="Start location" />
          </Form.Item>

          <Form.Item
            name="endLocation"
            rules={[
              {
                required: true,
                message: "End location must be exist",
              },
            ]}
          >
            <Input placeholder="End location" />
          </Form.Item>

          <Form.Item
            name="dates"
            rules={[
              {
                required: true,
                message: "Dates must be exist",
              },
            ]}
          >
            <RangePicker showTime />
          </Form.Item>

          <Form.Item
            name="weight"
            rules={[
              {
                required: true,
                message: "Weight must be exist",
              },
            ]}
          >
            <Input type="number" placeholder="Weight" />
          </Form.Item>

          <Form.Item
            name="volume"
            rules={[
              {
                required: true,
                message: "Volume must be exist",
              },
            ]}
          >
            <Input type="number" placeholder="Volume" />
          </Form.Item>

          <p className="text-center mb-5" style={{ color: 'red' }}>
            {error}
          </p>

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

export default ShipperForm;
