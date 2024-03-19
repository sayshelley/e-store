import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Cart } from '../Cart';

export default function CheckoutPageScreen() {
  const { state, dispatch: checkoutD } = useContext(Cart);
  //from the state can cart
  const {
    cart: { addressInfo, paymentMethod },
  } = state;
  //define options to pay:
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'staffID'
  );
  const leadTo = useNavigate();
  //if shipping address infor not exist, back to address
  useEffect(() => {
    if (!addressInfo.address) {
      leadTo('/shipping');
    }
  }, [addressInfo, leadTo]);
  const submitForm = (e) => {
    e.preventDefault();
    checkoutD({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', paymentMethodName);
    leadTo('/placeorder');
  };
  return (
    <div>
      <div className="CheckoutContainer">
        <h1 className="my-3">Checkout Options:</h1>
        <Form onSubmit={submitForm}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="staffID"
              label="staffID"
              value="staffID"
              checked={paymentMethodName === "staffID"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Debit"
              label="Debit"
              value="Debit"
              checked={paymentMethodName === "Debit"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Save&Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
