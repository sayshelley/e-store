import React, { useContext, useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../Cart';

export default function ShippingPageScreen() {

  const leadTo = useNavigate();
  const { state, dispatch: shipD } = useContext(Cart);

  const {
    Info,
    cart: { addressInfo },
  } = state;
  useEffect(() => {
    if (!Info) {
      leadTo('/signin?redirect=/shipping');
    }
  }, [Info, leadTo]);



  const [fullName, setName] = useState(addressInfo.fullName || '');
  const [address, setAddress] = useState(addressInfo.address || '');
  const [province, setProvince] = useState(addressInfo.province || '');
  const [postalCode, setCode] = useState(addressInfo.postalCode || '');
  const [phoneNumber, setPhone] = useState(addressInfo.phoneNumber || '');





  const submitForm = (e) => {
    e.preventDefault();

    shipD({
      type: 'UPLOAD_ADDRESS',
      payload: {
        fullName,
        address,
        province,
        postalCode,
        phoneNumber,
      },
    });

    localStorage.setItem(
      'addressInfo',
      JSON.stringify({
        fullName,
        address,
        province,
        phoneNumber,
      })
    );

    leadTo('/payment');
  };

  return (
    <div>
      <h1 className="my-3">Shipping Information</h1>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Enter Your Full Name:</Form.Label>
          <Form.Control
            value={fullName}
            placeholder="First Name and Last Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Local Address:</Form.Label>
          <Form.Control
            value={address}
            placeholder="(street,apt.,floor,room)"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="province">
          <Form.Label>Province </Form.Label>
          <Form.Control
            value={province}
            placeholder="Ontario"
            onChange={(e) => setProvince(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code </Form.Label>
          <Form.Control
            value={postalCode}
            placeholder="xxx xxx"
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number </Form.Label>
          <Form.Control
            value={phoneNumber}
            placeholder="1231231234"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button variant="primary" type="submit">
            Save&Next
          </Button>
        </div>
      </Form>
    </div>
  );
}
