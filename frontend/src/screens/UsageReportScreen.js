import React from 'react'
import axios from "axios";
import { useEffect, useReducer } from "react";
import UsageCard from "../elements/UsageCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };

    case "GET_REQUEST":
      return { ...state, loading: true }; 
    case "GET_SUCCESS":
      return { ...state, usage: action.payload, loading: false }; 
    case "GET_FAIL":
      return { ...state, loading: false, error: action.payload }; 
    default:
      return state; 
  }
};

function UsageReportScreen() {
  const [{ loading, error, usage }, dispatch] = useReducer(reducer, {
    usage: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const result = await axios.get(`/skishop/orders/usagereport`);
        dispatch({ type: "GET_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "GET_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Usage Report</h1>
      <br />
      <br />
      {usage.map((u) => (
        <UsageCard tag={u._id} usage={u}></UsageCard>
      ))}
    </div>
  );
} 
export default UsageReportScreen;

