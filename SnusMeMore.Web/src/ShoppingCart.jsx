import { AuthContext } from "./authContext";
import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

const ShoppingCart = () => {
    const { user } = useContext(AuthContext)

    return (

    )
}

export default ShoppingCart