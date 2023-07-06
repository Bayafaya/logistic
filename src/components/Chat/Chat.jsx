import { Button, Divider, Form, Input } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useUserAuth } from "../../store/userAuth";
import { useOrder } from "../../store/order";

function Chat({ chatProps }) {
  const { user } = useUserAuth(state=> ({ user: state.user }))
  const { fetchOrders, sendOffer, cancelOffer, acceptOffer } = useOrder(state=> ({
    sendOffer: state.sendOffer,
    fetchOrders: state.fetchOrders,
    cancelOffer: state.cancelOffer,
    acceptOffer: state.acceptOffer,
  }))

  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);

  const offerProps = useMemo(() => {
    return chatProps.order?.drivers?.find((driver) => {
      return driver.author === chatProps.driver.author;
    });
  }, [chatProps]);

  useEffect(()=>{
    getMessages();
  }, [chatProps])

  const getMessages = async () => {
    const messagePaginator = await chatProps.conversation.getMessages();
    console.log('messagePaginator', messagePaginator);
    setMessages(messagePaginator.items);

    chatProps.conversation.on('messageAdded', onMessageAdded);
  };

  const onMessageAdded = (message) => {
    setMessages((prevValue) => {
      const isMessageExists = prevValue.find((item) => item === message);
      if (isMessageExists) {
        return [...prevValue];
      }

      return [...prevValue, message];
    });
  };

  const onFinish = async (values) => {
    if (!values.text.trim()) {
      return;
    }

    await chatProps.conversation.sendMessage(values.text);
    form.resetFields();
  };

  const handleSendOffer = async () => {
    await sendOffer({ order: chatProps.order, driver: chatProps.driver }, user.accessToken);
    if (user.role === 'shipper') {
      await fetchOrders({ author: user._id });
    } else {
      await fetchOrders();
    }
  };

  const handleCancelOffer = async () => {
    await cancelOffer({ order: chatProps.order, driver: chatProps.driver });
    if (user.role === 'shipper') {
      await fetchOrders({ author: user._id });
    } else {
      await fetchOrders();
    }
  };

  const handleAcceptOffer = async () => {
    await acceptOffer({ order: chatProps.order, driver: chatProps.driver });
    if (user.role === 'shipper') {
      await fetchOrders({ author: user._id });
    } else {
      await fetchOrders();
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl text-primary mb-10 ">
        Start a deal
      </h1>

      {!offerProps?.status && (
        <Button
          size="large"
          ghost
          type="primary"
          onClick={handleSendOffer}
        >
          Send offer
        </Button>
      )}

      {offerProps?.status === 'pending' && (
        <>
          <Button
            size="large"
            ghost
            danger
            type="primary"
            className="mr-3"
            onClick={handleCancelOffer}
          >
            Cancel offer
          </Button>

          {offerProps.initiator !== user._id && (
            <Button
              size="large"
              ghost
              type="primary"
              className="mr-3"
              onClick={handleAcceptOffer}
              >
              Accept offer
            </Button>
            )}
        </>
      )}

      {offerProps?.status === 'canceled' && (
        <Button
          size="large"
          ghost
          danger
          type="primary"
          className="mr-3"
        >
          Offer canceled
        </Button>
      )}

      {offerProps?.status === 'accepted' && (
        <Button
          size="large"
          ghost
          type="primary"
          className="mr-3"
        >
          Offer accepted
        </Button>
      )}

      <Divider />

      <div className="mb-5 flex justify-end" style={{ height: '500px', overflow: 'auto', flexDirection: 'column' }}>
        {messages.map((message) => (
          <div className={[user._id === message.author ? 'text-right' : 'text-left', 'mb-2'].join(' ')} key={message.sid}>
            <Button ghost type="primary">{message.body}</Button>
          </div>
        ))}
      </div>

      <Form form={form} onFinish={onFinish} size="large">
        <Form.Item name="text">
          <Input placeholder="Type a message" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Chat;
