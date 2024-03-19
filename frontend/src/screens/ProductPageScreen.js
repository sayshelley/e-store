import {  useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Grading from '../elements/Grading';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/esm/Button';
import { Cart } from '../Cart';
import MessageBox from '../tools/Messages';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
//To show our id slug of product

const reducer = (state, action) => {
  switch (action.type) {

    case 'REFRESH_PRODUCT':
      return {...state,product: action.payload};
    case 'CREATE_SUCCESS':
      return {...state, loadingCreateReview:false};

    case 'GET_REQUEST':
      return { ...state, loading: true }; //new state, only update vaule to show loading box in UI
    case 'GET_SUCCESS':
      return { ...state, product: action.payload, loading: false }; //load products from action's payload, update not need loading box;
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload }; //return prv-states, fail error :action
    default:
      return state; // current state
  }
};

function ProductPageScreen() {

  let reviewsR = useRef();

  const [comment ,setComment] = useState('');

  const leadTo = useNavigate();
  const params = useParams();
  const { tag } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      

      dispatch({ type: 'GET_REQUEST' }); //show the loading mesg;
      try {
        const result = await axios.get(`/skishop/products/tag/${tag}`);
        dispatch({ type: 'GET_SUCCESS', payload: result.data }); //pass the payload from backend
      } catch (err) {
        //get the error in ajax
        dispatch({ type: 'GET_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [tag]);

  const { state, dispatch: cartD } = useContext(Cart);

  const {cart,Info} = state;


  const addCart = async() => {
    
    const existItem = cart.Items.find((x) => x._id === product._id);
    const quantity =  existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/skishop/products/${product._id}`);
    if (data.numLeft < quantity) {
      window.alert('You cannot add more.');
      return;
    }
 
 

    cartD({
      type: 'ADD_ITEMS',
      payload: { ...product, quantity },
    });

    leadTo('/cart');
  };


    const submitReview = async (e) => {
      e.preventDefault();
      if (!comment){
        alert('Cannot submit blank commant');
        return;
      }

      try {
        const {data} = await axios.post(
          `/skishop/products/${product._id}/reviews`,
          // {comment, name: Info.name},
          {comment},
          

        );
        
          dispatch ({
            type: `CREATE_SUCCESS`,
          });

          product.reviews.unshift(data.review);
          product.peopleReviews = data.peopleReviews;
          dispatch({type: 'REFRESH_PRODUCT', payload: product});



      } catch (err) {
        alert(err.message);
        dispatch({type: 'CREATE_FAIL'})
      }

    }
  return (
    loading? <div>Loading</div>
    :error?<div>{error}</div>
    :
    <div>
      <Row>
        <Col md={6}><img className='picture-l' src = {product.image} alt = {product.name}></img></Col>
        <Col md={3}>
          <ListGroup variant = 'flush'>

            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
              
            <ListGroup.Item>
              <Grading grade = {product.grade} peopleReviews = {product.peopleReviews}></Grading>
            </ListGroup.Item>

            <ListGroup.Item>
              Price : ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              More Information: <p className='italic'>"{product.description}"</p>
            </ListGroup.Item>

          </ListGroup>
        </Col>
        
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant = "flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Price:
                    </Col>
                    <Col>
                    ${product.price}
                    </Col>
                  </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                  <Row>
                    <Col>
                    Available:
                    </Col>
                    <Col>
                    {product.numLeft >0?
                    <Badge badge="success">Avaliable</Badge>
                    :
                    <Badge badge="danger">Unavaliable</Badge>
                    }
                    </Col>
                  </Row>
                  </ListGroup.Item>

                  {product.numLeft >0 &&(
                    <ListGroup.Item>
                      <div className="d-grid">
                      <Button onClick={addCart} variant='primary'>
                        Add to Shop List
                      </Button>
                      </div>
                    </ListGroup.Item>
                  )
                  
                  }

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className='my-3'>
        <h3 ref={reviewsR}>Reviews</h3>
      

      <div className='mb-3'>
        {product.reviews.length === 0 &&(
          <MessageBox>Leave a review here</MessageBox>
        )}
      </div>
      <ListGroup>
        {product.reviews.map((review)=>(
          <ListGroup.Item key = {review._id}>

            <p>{review.comment}</p>
          </ListGroup.Item>
        )
        
        )}
      </ListGroup>
      <div className='my-3'>
          { Info ? (
            <form onSubmit={submitReview}>
              <h3>Leave a review</h3>
              <FloatingLabel
              controlId='floatingTextarea'
              label='Comments'
              className='mb-3'
              >


                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

              </FloatingLabel>
              <div className='mb-3'>
                <Button  disabled = {loadingCreateReview} type ='submit'>
                  Submit
                </Button>
                {loadingCreateReview}

              </div>
            </form>
            ):(
              <MessageBox>
                <Link to ={ `/signin?redirect=/product/${product.tag}`}>Sign in</Link>first
              </MessageBox>
            )

          }

      </div>

      </div>

    </div>
  );
}
export default ProductPageScreen;
