import {  FloatButton, Modal } from "antd";
import { useOrder } from "../store/order.js";
import OrderCard from "../components/OrderCard.jsx";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ShipperForm from "../components/ShipperForm.jsx";
import { useUserAuth } from "../store/userAuth.js";
import Chat from "../components/Chat/Chat.jsx";
import { useChat } from "../store/chat.js";
import { Client as ConversationsClient } from "@twilio/conversations";

function MyOrders() {
  const [modalIOpen, setModalIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatProps, setChatProps] = useState({});
  const [conversations, setConversations] = useState([]);
  const [conversationsClient, setConversationsClient] = useState({});

  const { getToken, addUsers } = useChat(state=> ({
    getToken: state.getToken,
    addUsers: state.addUsers,
  }))

  const user = useUserAuth(state=>state.user)
  const { orders, recomendations, fetchOrders, getRecomendations } = useOrder((state) =>({
    orders: state.orders,
    recomendations: state.recomendations,
    fetchOrders: state.fetchOrders,
    getRecomendations: state.getRecomendations,
  }));

  useEffect(()=>{
    fetchOrders({ author: user._id });
    getRecomendations(user.accessToken);
    initChat();
  }, [])

  useEffect(()=>{
    if (!chatProps.order) {
      return;
    }
    const selectedOrder = orders.find((order) => order._id === chatProps.order._id);
    setChatProps({ ...chatProps, order: selectedOrder });
  }, [orders]);

  const initChat = async () => {
    console.log('start initChat');
    const token = await getToken(user.accessToken);

    const conversationsClient = await getConversationsClient(token);
    setConversationsClient(conversationsClient);

    const conversationPaginator =
      await conversationsClient.getSubscribedConversations();

    console.log('conversationPaginator', conversationPaginator);

    // await getConversations(conversationPaginator);

    conversationsClient.on("conversationJoined", (conversation) => {
      console.log('conversationJoined', conversation);
    });
    conversationsClient.on("conversationLeft", (thisConversation) => {
      console.log('conversationLeft', thisConversation);
    });
  };
  
  const getConversationsClient = async (token) => {
    console.log('start getConversationsClient');

    return await new Promise((resolve) => {
      const response = new ConversationsClient(token);
      response.on("stateChanged", (state) => {
        if (state === "initialized") {
          resolve(response);
        }
      });
    });

  };

  // const getConversations = async (conversationPaginator) => {
  //   setConversations((prevValue) => {
  //     conversationPaginator.items.forEach((conversation) => {
  //       const isConversationExists = prevValue.find(
  //         (item) => item.sid === conversation.sid
  //       );
  //       if (!isConversationExists) {
  //         prevValue.push(conversation);
  //       }
  //     });

  //     return [...prevValue];
  //   });

  //   if (conversationPaginator.hasNextPage) {
  //     const newConversationPaginator = await conversationPaginator.nextPage();
  //     getConversations(newConversationPaginator);
  //   }
  // };

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleClose =()=>{
    setModalIsOpen(false)
  }

  // const handleOpenChat = async ({ order, driver })=>{
  //   const conversation = await conversationsClient.getConversationByUniqueName(`${order.author}-${driver.author}`);
  //   await conversation.delete();
  //   // conversation.add(order.author);
  //   // conversation.add(driver.author);

  //   console.log('conversation', conversation);
  // }

  const handleOpenChat = async ({ order, driver })=>{
    const uniqueName = `${order.author}-${driver.author}`;
    let conversation = null;
    try {
      conversation = await conversationsClient.getConversationByUniqueName(uniqueName);
    } catch {
      console.log('conversation not found');
    }

    if (!conversation) {
      conversation = await conversationsClient.createConversation({
        friendlyName: uniqueName,
        uniqueName,
      });
      console.log('conversation created');

      const result = await addUsers({
        conversationSid: conversation.sid,
        orderAuthor: order.author,
        driverAuthor: driver.author,
      });

      console.log('result', result);
    }

    setChatProps({ conversation, order, driver });
    setIsChatOpen(true);
  }

  return (
    <div>
      <div>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            driver={recomendations.find((recomendation) => recomendation._id === order._id)}
            onOpenChat={handleOpenChat}
          />
        ))}
      </div>
      <Modal
        open={modalIOpen}
        onCancel={() => setModalIsOpen(false)}
        width={800}
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

      <Modal
        open={isChatOpen}
        onCancel={() => setIsChatOpen(false)}
        width={800}
        footer={false}
        closable={false}
        centered
      >
        <Chat chatProps={chatProps} />
      </Modal>
    </div>
  );
}

export default MyOrders;
