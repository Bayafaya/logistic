import { Card } from "antd"
import dayjs from "dayjs";

function OrderCard({ order, driver }) {

  const getDate = (timestamp) => {
    const date = dayjs(timestamp * 1000);
    return date.format('YYYY-MM-DD HH:mm');
  }

  return (
    <Card className="mb-5" bordered={true}>
      <div className="flex justify-between">
        <div>
          <p><strong>Start location:</strong> {order.startLocation}</p>

          <p><strong>End location:</strong>  {order.endLocation}</p>

          <p><strong>Start date:</strong>  {getDate(order.startDate)}</p>

          <p><strong>End date:</strong>  {getDate(order.endDate)}</p>

          <p><strong>Weight:</strong> {order.weight}</p>

          <p><strong>Volume:</strong> {order.volume}</p>
        </div>

        {driver ? (
          <div>
            <p className="text-center"><strong>This driver can take your order</strong></p>
            <p><strong>Current location:</strong> {driver.driver.currentLocation}</p>
            <p><strong>Truck capacity:</strong> {driver.driver.truckCapacity}</p>
            <p><strong>Truck volume:</strong> {driver.driver.truckVolume}</p>
          </div>
        ) : (
          <strong>No suitable drivers</strong>
        )}
      </div>

    </Card>
  )
}

export default OrderCard
