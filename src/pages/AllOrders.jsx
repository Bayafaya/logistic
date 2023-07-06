import dayjs from 'dayjs';
import { useOrder } from '../store/order.js';
import { useEffect, useState } from 'react';
import { Card, Checkbox, Modal } from 'antd';
import { useDriver } from '../store/driver.js';
import { useUserAuth } from '../store/userAuth.js';
import Chat from '../components/Chat/Chat.jsx';
import { Client as ConversationsClient } from "@twilio/conversations";
import { useChat } from '../store/chat.js';

function AllOrders() {
  const user = useUserAuth(state=>state.user)
  const { orders, fetchOrders } = useOrder((state) =>({orders:state.orders,fetchOrders:state.fetchOrders}));
  const { recomendations, getRecomendations } = useDriver((state) =>({
    recomendations: state.recomendations,
    getRecomendations: state.getRecomendations
  }));
  const [isRecomendedOrders, setIsRecomendedOrders] = useState(false);
  const [chatProps, setChatProps] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversationsClient, setConversationsClient] = useState({});
  const { getToken, addUsers } = useChat(state=> ({
    getToken: state.getToken,
    addUsers: state.addUsers,
  }))

  const getDate = (timestamp) => {
    const date = dayjs(timestamp * 1000);
    return date.format('YYYY-MM-DD HH:mm');
  }

  useEffect(()=>{
    fetchOrders()
    getRecomendations(user.accessToken)
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

  const onChange = (event) => {
    setIsRecomendedOrders(event.target.checked);
  };

  const handleOpenChat = async ({ order })=>{
    const uniqueName = `${order.author}-${user._id}`;
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
        driverAuthor: user._id,
      });

      console.log('result', result);
    }

    setChatProps({ conversation, order, driver: { author: user._id } });
    setIsChatOpen(true);
  }

  return (
    <div>
      <div className='flex justify-end mb-5'>
        <Checkbox onChange={onChange}><strong>Orders that i can take </strong></Checkbox>
      </div>

      {isRecomendedOrders ? (
        recomendations.length ? (
          recomendations.map(({ order, driver }) => (
            <Card key={order._id} className="mb-5" bordered={true}>
              <div className="flex justify-between">
                <div>
                  <p><strong>Start location:</strong> {order.startLocation}</p>
        
                  <p><strong>End location:</strong> {order.endLocation}</p>
        
                  <p><strong>Start date:</strong> {getDate(order.startDate)}</p>
        
                  <p><strong>End date:</strong> {getDate(order.endDate)}</p>
        
                  <p><strong>Weight:</strong> {order.weight}</p>
        
                  <p><strong>Volume:</strong> {order.volume}</p>

                  <p><strong>Arrival duration:</strong> {driver.durationToOrder.text}</p>
                </div>

                <span
                  className="text-primary"
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => handleOpenChat({ order })}
                  >
                  Contact shipper
                </span>
              </div>
            </Card>
          ))
        ) : (
          <strong>Empty list</strong>
        )
      ) : (
        orders.map(order => (
          <Card key={order._id} className="mb-5" bordered={true}>
            <div className="flex justify-between">
              <div>
                <p><strong>Start location:</strong> {order.startLocation}</p>
      
                <p><strong>End location:</strong> {order.endLocation}</p>
      
                <p><strong>Start date:</strong> {getDate(order.startDate)}</p>
      
                <p><strong>End date:</strong> {getDate(order.endDate)}</p>
      
                <p><strong>Weight:</strong> {order.weight}</p>
      
                <p><strong>Volume:</strong> {order.volume}</p>
              </div>

              <span
                className="text-primary"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => handleOpenChat({ order })}
                >
                Contact shipper
              </span>
            </div>
          </Card>
        ))
      )}
      
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
  )
}

export default AllOrders
