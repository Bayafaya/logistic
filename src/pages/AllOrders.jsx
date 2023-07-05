import dayjs from 'dayjs';
import { useOrder } from '../store/order.js';
import { useEffect, useState } from 'react';
import { Card, Checkbox } from 'antd';
import { useDriver } from '../store/driver.js';
import { useUserAuth } from '../store/userAuth.js';

function AllOrders() {
  const user = useUserAuth(state=>state.user)
  const { orders, fetchOrders } = useOrder((state) =>({orders:state.orders,fetchOrders:state.fetchOrders}));
  const { recomendations, getRecomendations } = useDriver((state) =>({
    recomendations: state.recomendations,
    getRecomendations: state.getRecomendations
  }));
  const [isRecomendedOrders, setIsRecomendedOrders] = useState(false);

  const getDate = (timestamp) => {
    const date = dayjs(timestamp * 1000);
    return date.format('YYYY-MM-DD HH:mm');
  }

  useEffect(()=>{
    fetchOrders()
    getRecomendations(user.accessToken)
  }, [])

  const onChange = (event) => {
    setIsRecomendedOrders(event.target.checked);
  };

  return (
    <div>
      <div className='flex justify-end mb-5'>
        <Checkbox onChange={onChange}><strong>Orders that i can take </strong></Checkbox>
      </div>

      {isRecomendedOrders ? (
        recomendations.length ? (
          recomendations.map(({ order, driver }) => (
            <Card key={order._id} className="mb-5" bordered={true}>
              <p><strong>Start location:</strong> {order.startLocation}</p>
    
              <p><strong>End location:</strong> {order.endLocation}</p>
    
              <p><strong>Start date:</strong> {getDate(order.startDate)}</p>
    
              <p><strong>End date:</strong> {getDate(order.endDate)}</p>
    
              <p><strong>Weight:</strong> {order.weight}</p>
    
              <p><strong>Volume:</strong> {order.volume}</p>

              <p><strong>Arrival duration:</strong> {driver.durationToOrder.text}</p>
            </Card>
          ))
        ) : (
          <strong>Empty list</strong>
        )
      ) : (
        orders.map(order => (
          <Card key={order._id} className="mb-5" bordered={true}>
            <p><strong>Start location:</strong> {order.startLocation}</p>
  
            <p><strong>End location:</strong> {order.endLocation}</p>
  
            <p><strong>Start date:</strong> {getDate(order.startDate)}</p>
  
            <p><strong>End date:</strong> {getDate(order.endDate)}</p>
  
            <p><strong>Weight:</strong> {order.weight}</p>
  
            <p><strong>Volume:</strong> {order.volume}</p>
          </Card>
        ))
      )}
      
    </div>
  )
}

export default AllOrders
