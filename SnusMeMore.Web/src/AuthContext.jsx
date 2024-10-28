import React, { createContext, useState, useEffect } from "react"
import config from "../config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState()
    const [cart, setCart] = useState()

    useEffect(() => {
        login('grupp5umbraco@gmail.com', 'turegillarintegrupp6')
    }, [])

    useEffect(() => {
        getCart()
        //logout()
    }, [userId])

    const login = (email, password) => {
        fetch(config.umbracoURL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.userId) {
                setUserId(data.userId)
                setIsLoggedIn(true)
            }
        })
    };

    const logout = () => {
        if (!isLoggedIn) {
            console.log("Not logged in")
            return
        }
        
        fetch(config.umbracoURL + '/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + userId,
            },
            body: {}
        })
        .then(response => {
            if (response.ok) {
                setUserId(null)
                setIsLoggedIn(false)
            }
        });
    };

    const getCart = () => {
        if (!isLoggedIn) {
            console.log("Not logged in")
            return
        }

        fetch(config.umbracoURL + '/api/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + userId,
            },
        })
        .then(response => response.json())
        .then(cartData => {
            setCart(cartData)
            console.log(cartData)
        });
    }

    const addToCart = (snusId) => {
        if (!isLoggedIn) {
            console.log("Not logged in")
            return
        }

        fetch(config.umbracoURL + '/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token " + userId,
            },
            body: JSON.stringify({ itemId: snusId })
        })
        .then(response => response.json())
        .then(cartData => {
            console.log("resposne from post " + cartData)
        });
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, getCart, addToCart }}>
            {children}
        </AuthContext.Provider>
    )
}
