import { useOrder } from '../store/order.js';
import OrderCard from '../components/OrderCard.jsx';
import { useEffect } from 'react';

function AllOrders() {
  const { orders, fetchOrders } = useOrder((state) =>({orders:state.orders,fetchOrders:state.fetchOrders}));

  useEffect(()=>{
    fetchOrders()
  }, [])

  return (
    <div>
      {orders.map(order => <OrderCard key={order._id} order={order} />)}
    </div>
  )
}

export default AllOrders
