//import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../Cart';

export default function LocationScreen() {
  const navigate = useNavigate();
  const { state, dispatch: locationD } = useContext(Cart);

  const {
    userInfo,
    cart: { shipmentAddress },
  } = state;
  const [name, setName] = useState(shipmentAddress.name || '');
  const [location, setLocation] = useState(shipmentAddress.location || '');
  const [city, setCity] = useState(shipmentAddress.city || '');
  const [province, setProvincey] = useState(shipmentAddress.province || '');
  const [postalCode, setPostalCode] = useState(
    shipmentAddress.postalCode || ''
  );
  const [phonenum, setPhonenum] = useState(shipmentAddress.phonenum || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    locationD({
      type: 'SAVE_SHIPMENT',
      payload: {
        name,
        location,
        city,
        province,
        postalCode,
        phonenum,
      },
    });
    localStorage.setItem(
      'shipmentAddress',
      JSON.stringify({
        name,
        location,
        city,
        province,
        postalCode,
        phonenum,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <div className="LocationContainer">
        <h1 className="my-3">Your Shipmeng Address</h1>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Enter Your Full Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location with details(street,apt,room)</Form.Label>
            <Form.Control
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Shipping City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Control
                value={province}
                onChange={(e) => setProvincey(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phonenum">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phonenum}
              onChange={(e) => setPhonenum(e.target.value)}
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
    </div>
  );
}
