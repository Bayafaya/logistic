import { Button, ConfigProvider, Form, Input } from "antd";
import { useOrder } from "../../store/order";


function ShipperForm({ handleClose }) {
  const setAdd = useOrder((state) => state.setAdd);

  const onFinish = (values) => {
    setAdd(values);
    handleClose();
  };

  return (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            borderRadius: "4px",
          },
        }}
      >
        <Form name="basic" size="large" onFinish={onFinish} autoComplete="off">
          <h1 className="text-center text-3xl text-primary mb-10 ">
            &lt; Logo Here &frasl; &gt;{" "}
          </h1>

          <Form.Item
            name="from"
            rules={[
              {
                required: true,
                message: "From must be exist",
              },
            ]}
          >
            <Input placeholder="From" />
          </Form.Item>

          <Form.Item
            name="to"
            rules={[
              {
                required: true,
                message: "To must be exist",
              },
            ]}
          >
            <Input placeholder="To" />
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
            <Input placeholder="Weight" />
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

export default ShipperForm;
