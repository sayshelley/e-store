import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {Cart} from '../Cart' ;


export default function Signin() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email,setEmail] = useState('');
  const [password, setPsw] = useState('');
  const {state, dispatch: signD} = useContext(Cart);
  const {Info}  = state;
  const leadTo = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await Axios.post ('/skishop/user/signin',{
        email,
        password,
      });

      signD({type: 'SIGN_IN', payload: data})

      localStorage.setItem('Info', JSON.stringify(data));
      leadTo(redirect || '/');
    } catch (err) {
      alert('Wrong email or password');
    }
  }

  useEffect(() => {
    if (Info){
      leadTo (redirect);
    }
  },[leadTo, redirect, Info] );

  return (
    <Container className="small-container">

      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" required  onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>


        <Form.Group className="mb-3" controlId="psw"  >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required  placeholder="Enter your password"  onChange={(e) => setPsw(e.target.value)}/>
        </Form.Group>


        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>


        <div className="mb-3">
         <p> Or </p> 
          <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link>{" "} Here

        </div>
      </Form>
    </Container>
  );
}