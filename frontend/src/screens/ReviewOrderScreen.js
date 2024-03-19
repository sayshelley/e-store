import Axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Cart } from "../Cart";

// define the reduer
const reducer = (state, action) => {
  switch (action.type) {
    case "PUT_REQUEST":
      return { ...state, loading: true };
    case "PUT_SUCCESS":
      return { ...state, loading: false };
    case "PUT_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function ReviewOrderScreen() {
  const leadTo = useNavigate();
  const { state, dispatch: ReviewOrderD } = useContext(Cart);
  const { cart, Info } = state;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.Items.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  cart.taxPrice = round2(0.13 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderButton = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      //ajax request
      const { data } = await Axios.post(
        "/skishop/orders",
        {
          //data send to backend
          // Items: cart.Items,
          addressInfo: cart.addressInfo,
          paymentMethod: cart.paymentMethod,
          //order calculation
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }

      );
      ReviewOrderD({ type: "CART_CLEAR" }); //dispatch CART_CLEAR action to Cart.js

      dispatch({ type: "PUT_SUCCESS" });
      localStorage.removeItem("cartItems");
      // To order details page
      leadTo(`/order/${data.order._id}`); //Backen order route
    } catch (err) {
      dispatch({ type: "PUT_FAIL" });
      alert(err.message);
    }
  };
  //
  useEffect(() => {
    if (!cart.paymentMethod) {
      leadTo("/payment"); //if payment not exist
    }
  }, [cart, leadTo]);

  return (
    <div>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Your Shipping Address</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.addressInfo.fullName} <br />
                <strong>Address: </strong> {cart.addressInfo.address},
                {cart.addressInfo.province}, {cart.addressInfo.postalCode}
                <br />
                <strong>Phone Number: </strong>
                {cart.addressInfo.phoneNumber}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.Items.map((tempItem) => (
                  <ListGroup.Item key={tempItem._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={tempItem.image}
                          alt={tempItem.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${tempItem.tag}`}>
                          {tempItem.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{tempItem.quantity}</span>
                      </Col>
                      <Col md={3}>${tempItem.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Below is checking place*/}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderButton}
                      disabled={cart.Items.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
