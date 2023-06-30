import { Card, Divider } from "antd"

function OrderCard({ order }) {

  return (
    <Card className="mb-5" bordered={true}>
      From: {order.from}
      <Divider type="vertical" />

      To: {order.to}
      <Divider type="vertical" />

      Weight: {order.weight}
    </Card>
  )
}

export default OrderCard
