import React, { createContext, useState, useEffect } from "react"
import config from "../config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        // setUserId(localStorage.getItem('userId'));
        login()
        logout()
    }, [])

    const login = (email, password) => {
        fetch(config.umbracoURL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'grupp5umbraco@gmail.com', password: 'turegillarintegrupp6' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.userId) {
                localStorage.setItem('authToken', data.userId);
                setUserId(data.userId)
                setIsLoggedIn(true)
                console.log(data)
                getCart()
            }
        });
    };

    const getCart = () => {
        fetch(config.umbracoURL + '/api/cart/ded039d3-8664-435d-815a-a8fb7b020766'/* + userId*/)
        .then(response => response.json())
        .then(cartData => {
            console.log(cartData)
        });
    }

    const logout = () => {
        fetch(config.umbracoURL + '/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {}
        })
        .then(response => {
            if (response.ok) {
                setIsLoggedIn(false)
                localStorage.clear()
            }
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
