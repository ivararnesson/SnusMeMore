import React, { useState, useEffect, useContext } from 'react';
import Modal from "../components/modal";
import CheckoutSection from "../components/CheckoutSection"; 
import "../assets/CSS/checkout.css";
import { AuthContext } from '../AuthContext';

const CheckoutPage = () => {
    const { cart, getCart, addToCart, removeFromCart } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState('mastercard');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        zipCode: '',
        country: '',
    });
    const [cardInfo, setCardInfo] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [showModal, setShowModal] = useState(false);

    const shippingCosts = {
        standard: 0,
        express: 79,
        nextDay: 119,
    };

    useEffect(() => {
        getCart(); // Fetch cart on page load
    }, []);

    const handleQuantityChange = (id, change) => {
        const item = cart.find(item => item.snusId === id);
        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            if (change < 0) {
                removeFromCart(id);
            } else {
                addToCart(id);
            }
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + shippingCosts[shippingMethod];

    const handleCheckout = (e) => {
        e.preventDefault();

        const allFieldsFilled = Object.values(address).every(field => field.trim() !== '');
        const allCardFieldsFilled = Object.values(cardInfo).every(field => field.trim() !== '');

        if (!allFieldsFilled || !allCardFieldsFilled) {
            alert('Var snäll och fyll i alla fält.');
            return;
        }

        setShowModal(true);

        // Empty the cart by setting each item's quantity to 0
        cart.forEach(item => handleQuantityChange(item.snusId, -item.quantity));

        // Reset form fields
        setAddress({
            name: '',
            street: '',
            city: '',
            zipCode: '',
            country: '',
        });
        setPaymentMethod('mastercard');
        setCardInfo({
            cardholderName: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
        });
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="checkout-page-container d-flex justify-content-between">
            {/* Cart Section */}
            <div className="cart-section-container w-50">
                <h2>Kundvagn</h2>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th></th>
                            <th>Antal</th>
                            <th>Pris</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.snusId}>
                                <td>
                                    <div className="product-info d-flex align-items-center">
                                        <img src={item.imageUrl} alt={item.snusName} className="product-image" />
                                        <div>
                                            {item.snusName} <br />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.size}</td>
                                <td>
                                    <button onClick={() => handleQuantityChange(item.snusId, -1)} disabled={item.quantity <= 0}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.snusId, 1)}>+</button>
                                </td>
                                <td>{(item.price * item.quantity).toFixed(2)} kr</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="subtotal-section">
                    <p>Delsumma: {subtotal.toFixed(2)} kr</p>
                    <p>Frakt: {shippingCosts[shippingMethod].toFixed(2)} kr</p>
                    <h4>Totalt: {total.toFixed(2)} kr</h4>
                </div>
            </div>

            {/* Checkout Section */}
            <CheckoutSection
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                address={address}
                setAddress={setAddress}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                cardInfo={cardInfo}
                setCardInfo={setCardInfo}
                handleCheckout={handleCheckout}
            />

            {/* Confirmation Modal */}
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <p>Din order är bekräftad!</p>
            </Modal>
        </div>
    );
};

export default CheckoutPage;
