import Card from "react-bootstrap/Card";

function UsageCard(props) {
  const { usage } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          IP Address: {usage.IPAddress}
          <br />
        </Card.Title>
        <Card.Text>
          Event Type: {usage.eventType}
          <br />
          Visit Date: {usage.visitDate}
          <br />
          Product Tag:{usage.productTag}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default UsageCard;
