import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

const ShoppingCart = () => {
    const { cart, getCart, addToCart, removeFromCart, isLoggedIn } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        getCart()
    }, [isLoggedIn])
    
    useEffect(() => {
        if (cart.length === 0) {
            setCartItems([])
            return
        }
    
        const items = cart.map(item => ({
            id: item.snusId,
            name: item.snusName,
            price: item.price,
            quantity: item.quantity,
        }))
        
        setCartItems(items)
    }, [cart])

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    return (
        <div className="shopping-cart-dropdown">
            <h3>Kundkorg</h3>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <span>{item.name}</span>
                        <div className="quantity-controls">
                            <button onClick={() => removeFromCart(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item.id)}>+</button>
                        </div>
                        <span>{item.price * item.quantity} sek</span>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <span>Totalsumma: {calculateTotal()} sek</span>
            </div>
            <Link to="/checkout" className="checkout-button">
                Kassa
            </Link>
        </div>
    )
}

export default ShoppingCart;
