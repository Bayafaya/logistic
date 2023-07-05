import {  FloatButton, Modal } from "antd";
import { useOrder } from "../store/order.js";
import OrderCard from "../components/OrderCard.jsx";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ShipperForm from "../components/ShipperForm.jsx";
import { useUserAuth } from "../store/userAuth.js";

function MyOrders() {
  const [modalIOpen, setModalIsOpen] = useState(false);
  const user = useUserAuth(state=>state.user)
  const { orders, recomendations, fetchOrders, getRecomendations } = useOrder((state) =>({
    orders: state.orders,
    recomendations: state.recomendations,
    fetchOrders: state.fetchOrders,
    getRecomendations: state.getRecomendations,
  }));

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleClose =()=>{
    setModalIsOpen(false)
  }

  useEffect(()=>{
    fetchOrders({ author: user._id });
    getRecomendations(user.accessToken);
  }, [])

  return (
    <div>
      <div>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} driver={recomendations.find((recomendation) => recomendation._id === order._id)} />
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
