import {  FloatButton, Modal } from "antd";
import { useOrder } from "../store/order.js";
import OrderCard from "../components/OrderCard.jsx";
import { useNavigate } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ShipperForm from "../components/ShipperForm.jsx";

function MyOrders() {
  const navigate = useNavigate();
  const [modalIOpen, setModalIsOpen] = useState(false);
  const {orders,fetchOrders} = useOrder((state) =>({orders:state.orders,fetchOrders:state.fetchOrders}));

  const handleAddClick = () => {
    setModalIsOpen(true);
  };
  const handleClose =()=>{
    setModalIsOpen(false)
  }
  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div>
      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <Modal
        open={modalIOpen}
        onCancel={() => setModalIsOpen(false)}
        width={400}
        footer={false}
        closable={false}
        centered
      >
        <ShipperForm handleClose={handleClose}/>
      </Modal>
      <FloatButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddClick}
      />

    </div>
  );
}

export default MyOrders;
