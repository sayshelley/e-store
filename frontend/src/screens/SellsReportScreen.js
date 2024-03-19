import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import OrderCard from "../elements/OrderCard";
import { Link, useLocation } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true }; 
    case "GET_SUCCESS":
      return { ...state, orders: action.payload, loading: false }; 
    case "GET_FAIL":
      return { ...state, loading: false, error: action.payload }; 
    default:
      return state; // current state
  }
};

function SellsReportScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const monthUrl = sp.get("month") || "all";
  const yearUrl = sp.get("year") || "all";

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const result = await axios.get(
          `/skishop/orders/sellsreport?month=${monthUrl}&year=${yearUrl}`
        );
        dispatch({ type: "GET_SUCCESS", payload: result.data });
      } catch (err) {
        //get the error in ajax
        dispatch({ type: "GET_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [monthUrl, error, yearUrl]);

  const [years, setYears] = useState([]);
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const { data } = await axios.get(`/skishop/orders/allyears`);
        setYears(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchYears();
  }, []);

  const [months, setMonths] = useState([]);
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const { data } = await axios.get(`/skishop/orders/allmonths?`);
        setMonths(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchMonths();
  }, []);

  return (
    <div>
      <h1>Sells Report</h1>
      <br />
      <br />
      <div>
        {loading ? (
          <div>Report Loading...</div>
        ) : (
          <Container>
            <Row>
              <Col md={3}>
                <Row>
                  <strong>Year</strong>
                </Row>

                <Row>
                  <Link to={`/admin/sellsreport?year=all&month=${monthUrl}`}>
                    All Years
                  </Link>
                  {years.map((y) => (
                    <Link
                      key={y}
                      to={`/admin/sellsreport?year=${y}&month=${monthUrl}`}
                    >
                      {y}
                    </Link>
                  ))}
                </Row>
                <br />
                <Row>
                  <strong>Month</strong>
                </Row>
                <Row>
                  <Link to={`/admin/sellsreport?year=${yearUrl}&month=all`}>
                    All Months
                  </Link>

                  {months.map((m) => (
                    <Link
                      key={m}
                      to={`/admin/sellsreport?year=${yearUrl}&month=${m}`}
                    >
                      {m}
                    </Link>
                  ))}
                </Row>
              </Col>
              <Col md={9}>
                {error ? (
                  <div>
                    We didn't sell anything during this time:(
                    <br />
                  </div>
                ) : (
                  <Row>
                    {orders.map((odr) => (
                      <Col key={odr.orderId} md={9}>
                        <OrderCard order={odr}></OrderCard>
                      </Col>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default SellsReportScreen;
