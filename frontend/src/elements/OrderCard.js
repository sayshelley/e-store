import Card from "react-bootstrap/Card";

function OrderCard(props) {
  const { order } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          User: {order.addressInfo.fullName}
          <br />
        </Card.Title>
        <Card.Text>
          Price: ${order.itemsPrice}
          <br />
          Shipping Price: ${order.shippingPrice}
          <br />
          Tax Price: ${order.taxPrice}
          <br />
          Total Price: ${order.totalPrice}
        
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default OrderCard;
