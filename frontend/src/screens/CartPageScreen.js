import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "../Cart";
import Messages from '../tools/Messages';
import ListGroup from'react-bootstrap/ListGroup';
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';
import axios from "axios";


export default function CartPageScreen(){
    const { state, dispatch: contextCart } = useContext(Cart);
    const leadTo = useNavigate();
    const {
      cart: { Items },
    } = state;
    const checkout = () =>{
        //check the status of signing in, if validate, send to shipping page
        leadTo('/signin?redirect=/shipping');
    }
  
    const update = async (item, quantity) => {
         const { data } = await axios.get(`/skishop/products/${item._id}`);
        if (data.countInStock < quantity) {
          window.alert('You cannot add more');
              return;
            }
         contextCart({
              type: 'ADD_ITEMS',
              payload: { ...item, quantity },
            });
          };

    const remove = (item) =>{
         contextCart({
                type: 'REMOVE_ITEMS',
                payload: item,
              });
        }
    


    return (
        <div>
            <h1>Cart</h1>

            <Row>
                <Col md = {8}>
                {Items.length ===0?(
                    <Messages>
                    There is nothing in your cart.
                    </Messages>
                ):
                (
                 <ListGroup>
                    {Items.map((item)=>(
                        <ListGroup.Item key = {item._id}>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded img-s"></img>{' '}
                                        <Link to ={`/product/${item.tag}`}>{item.name}</Link>
                                </Col>

                                <Col md = {3}>
                                    <Button 
                                    onClick={ ()=>
                                        update(item, item.quantity - 1)
                                      } 
                                    variant="light" disabled = {item.quantity ===1}>
                                        <i className="fas fa-minus-circle"></i>
                                    </Button>{' '}
                                    
                                    <span>{item.quantity}</span>{' '}
                                    
                                    <Button  
                                    onClick={()=>
                                        update(item, item.quantity + 1)
                                      } 
                                    variant="light" disabled = {item.quantity ===item.numLeft}>
                                        <i className="fas fa-plus-circle"></i>
                                    </Button>
                                </Col>

                                <Col md = {3} >${item.price}</Col>
                                <Col md = {2}>
                                    <Button 
                                        onClick={() => remove(item)}
                                        variant="light" >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))

                    }
                 </ListGroup>
                )

                }
                </Col>
                <Col md = {4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                
                                <ListGroup.Item>
                                Total Price:    {Items.reduce((a,c)=>a+c.price*c.quantity,0)} $
                                </ListGroup.Item>

                                
                                    <Button 
                                    onClick={checkout}
                                    type="button" variant="primary" disabled = {Items.length===0}>
                                        Checkout
                                    </Button>{' '}

                                    <Link to="/" className="nav-link">
                                    <Button onClick={'/'} type="button" value="primary">
                                        Back
                                    </Button>
                                    </Link>
                                

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}