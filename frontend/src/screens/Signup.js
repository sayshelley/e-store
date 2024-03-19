import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Cart } from '../Cart';

export default function Signup() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPsw] = useState('');
  const [confirmPassword, confirmPsw] = useState('');

  const { state, dispatch: signD } = useContext(Cart);
  const { Info } = state;
  const leadTo = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Please Double Check Your Password');
      return;
    }

    try {
      const { data } = await Axios.post('/skishop/user/signup', {
        name,
        email,
        password,
      });

      signD({ type: 'SIGN_IN', payload: data });

      localStorage.setItem('Info', JSON.stringify(data));
      leadTo(redirect || '/');
    } catch (err) {
      alert('Wrong email or password');
    }
  };

  useEffect(() => {
    if (Info) {
      leadTo(redirect);
    }
  }, [leadTo, redirect, Info]);

  return (
    <Container>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="John Bill"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="psw">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPsw(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Confirm your password"
            onChange={(e) => confirmPsw(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>

        <div className="mb-3">
          <p> Or </p>
          <Link to={`/signin`}>Back to Sign in</Link>{" "}
        </div>
      </Form>
    </Container>
  );
}
