import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Cart } from "../Cart";
import Messages from "../tools/Messages";

let counter = 0;

export default function PayOrderScreen() {
  const leadTo = useNavigate();
  const { state, dispatch: payD } = useContext(Cart);

  const {
    Info,
    cart: { pay },
  } = state;
  const [payname, setName] = useState(pay.payname || "");

  const [cardnum, setCardnum] = useState(pay.cardnum || "");
  const [sin, setSin] = useState(pay.sin || "");

  useEffect(() => {
    if (!Info) {
      //leadTo('/signin?redirect=/shipping');
      leadTo("/login");
    }
  }, [Info, leadTo]);

  const submitForm = (e) => {
    e.preventDefault();
    payD({
      type: "SAVE_PAY",
      payload: {
        payname,
        cardnum,
        sin,
      },
    });

    localStorage.setItem(
      "pay",
      JSON.stringify({
        payname,
        cardnum,
        sin,
      })
    );


    let temp = counter;

    if (temp === 0 || temp === 1) {
      alert("ok pay! Back Dashoboard");
      temp = temp + 1;
    } else if (temp === 2) {
      alert("ok pay! Back Dashoboard");
    }



    leadTo(`/`);
  };

  return (
    <div>
      <h1 className="my-3">Card Information</h1>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Enter Your Full Name:</Form.Label>
          <Form.Control
            value={payname}
            placeholder="Name in Card"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Debit Card Number</Form.Label>
          <Form.Control
            value={cardnum}
            placeholder="xxx-xxx-xxxx-xxx"
            onChange={(e) => setCardnum(e.target.value)}
            required
          />
        </Form.Group>



        <div className="mb-3">
          <Button variant="primary" type="submit">
            Pay&Next
          </Button>
        </div>
      </Form>
    </div>
  );
}
