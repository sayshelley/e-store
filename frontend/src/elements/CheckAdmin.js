import React from 'react'
import { Cart } from "../Cart";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";

export default function CheckAdmin({children}) {
    const { state } = useContext(Cart);
    const { Info } = state;
    return Info && Info.admin ? children : <Navigate to="/signin" />;
}


