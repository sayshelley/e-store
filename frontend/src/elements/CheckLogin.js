import React from "react";
import { Cart } from "../Cart";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export default function CheckLogin({ children }) {
  
  const { state } = useContext(Cart);
  const { Info } = state;
  return Info ? children : <Navigate to="/signin" />;
}
