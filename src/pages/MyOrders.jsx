import { FloatButton } from 'antd';
import { useOrder } from '../../store/order.js';
import OrderCard from '../components/OrderCard.jsx';
import { useNavigate } from 'react-router';
import { PlusOutlined } from '@ant-design/icons';

function MyOrders() {
  const navigate = useNavigate();

  const orders = useOrder((state) => state.orders);

  const handleAddClick = () => {
    navigate('/add-order');
  };

  return (
    <div>
      <div>
        {orders.map(order => <OrderCard key={order.id} order={order} />)}
      </div>

      <FloatButton type='primary' icon={<PlusOutlined />} onClick={handleAddClick} />
    </div>
  )
}

export default MyOrders
