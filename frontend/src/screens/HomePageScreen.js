import { useEffect, useReducer, useState } from "react";
import axios from 'axios';
import { LinkContainer } from "react-router-bootstrap";
import {Row, Col,Container } from "react-bootstrap";
import Item from '../elements/Item';

import Nav from "react-bootstrap/Nav";
import  {Link} from "react-router-dom";



const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true }; //new state, only update vaule to show loading box in UI
    case 'GET_SUCCESS':
      return { ...state, products: action.payload, loading: false }; //load products from action's payload, update not need loading box;
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload }; //return prv-states, fail error :action
    default:
      return state; // current state
  }
};


function HomePageScreen() {

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {

    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {

      dispatch({ type: 'GET_REQUEST' }); //show the loading mesg;
      try {
        const result = await axios.get('/skishop/products');
        dispatch({ type: 'GET_SUCCESS', payload: result.data }); //pass the payload from backend
      } catch (err) {
        //get the error in ajax
        dispatch({ type: 'GET_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/skishop/products/categories`);
        setCategories(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchCategories();
  }, []);
  
    const [brands, setBrands] = useState([]);
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const { data } = await axios.get(`/skishop/products/brands`);
          setBrands(data);
        } catch (err) {
          alert(err.message);
        }
      };
      fetchBrands();
    }, []);

  return (
    <div>
      <h1>What We Have Now</h1>
      <br />
      <br />
      <div className="products">
        {loading ? (
          <div>Products Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Container>
            <Row>
              <Col md={3}>
                <Row>
                  <strong>Category</strong>
                </Row>

                <Row>
                  <Link to={"/search?category=all"}>All Categories</Link>
                  {categories.map((category) => (
                    <Link key={category} to={`/search?category=${category}`}>
                      {category}
                    </Link>
                  ))}
                </Row>
                <br />
                <Row>
                  <strong>Brand</strong>
                </Row>
                <Row>
                  <Link to={`/search?brand=all`}>All Brands</Link>
                  {brands.map((brand) => (
                    <Link key={brand} to={`/search?brand=${brand}`}>
                      {brand}
                    </Link>
                  ))}
                </Row>
              </Col>
              <Col md={9}>
                <Row>
                  {products.map((product) => (
                    <Col
                      key={product.tag}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-3"
                    >
                      <Item product={product}></Item>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
export default HomePageScreen;