import React, { createContext, useState, useEffect } from "react"
import config from "../config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [cart, setCart] = useState()

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId")
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true"

        if (storedUserId && storedIsLoggedIn) {
            setUserId(storedUserId)
            setIsLoggedIn(storedIsLoggedIn)
            setUserName(localStorage.getItem("userName"))
        }
    }, [])

    useEffect(() => {
        if (userId) {
            fetch(config.umbracoURL + '/api/check-login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + userId,
                },
            })
            .then(response => {
                if (!response.ok) {
                    setUserId(null)
                    setUserName(null)
                    setIsLoggedIn(false)
                    setCart([])
                }
            })
        }
    }, [userId])

    const signup = (username, email, password, resultHandler) => {
        fetch(config.umbracoURL + '/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, email: email, password: password })
        })
        .then(response => {
            if (response.ok) {
                alert("Nytt konto skapat!\nVänligen logga in med ditt nya konto")
                resultHandler()
            } else {
                alert("Registrering mislyckades")
            }
        })
    }

    const login = (email, password, resultHandler) => {
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
                setUserName(data.email)
                setIsLoggedIn(true)
                localStorage.setItem("userId", data.userId)
                localStorage.setItem("userName", data.email)
                localStorage.setItem("isLoggedIn", "true")
                resultHandler(true)
            } else {
                resultHandler(false)
            }
        })
        .catch(error => {
            console.error("Error:", error)
            resultHandler(false)
        });
    }

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
                setUserName('')
                setIsLoggedIn(false)
                setCart([])
            }
        })
    }

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
        })
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
        })
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, signup, login, logout, getCart, addToCart }}>
            {children}
        </AuthContext.Provider>
    )
}
