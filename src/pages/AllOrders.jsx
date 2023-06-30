import { useOrder } from '../../store/order.js';
import OrderCard from '../components/OrderCard.jsx';

function AllOrders() {
  const orders = useOrder((state) => state.orders);

  return (
    <div>
      {orders.map(order => <OrderCard key={order.id} order={order} />)}
    </div>
  )
}

export default AllOrders
