import React, { useState, useEffect, useContext } from 'react';
import Modal from "../components/modal";
import CheckoutSection from "../components/CheckoutSection"; 
import "../assets/CSS/checkout.css";
import { AuthContext } from '../AuthContext';
import Footer from '../components/Footer';

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
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const shippingCosts = {
        standard: 0,
        express: 79,
        nextDay: 119,
    };

    useEffect(() => {
        const fetchData = async () => {
            await getCart();
            setLoading(false);
        };

        fetchData();
    }, [getCart]);

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

    const handleCheckout = () => {
        const allFieldsFilled = Object.values(address).every(field => field.trim() !== '');
        const allCardFieldsFilled = Object.values(cardInfo).every(field => field.trim() !== '');

        if (!allFieldsFilled || !allCardFieldsFilled) {
            alert('Var snäll och fyll i alla fält.');
            return;
        }

        setShowModal(true);
        console.log("Proceeding with checkout...");

        cart.forEach(item => removeFromCart(item.snusId));

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
            expirationMonth: '',
            expirationYear: '',
            cvv: '',
        });
    };

    const handleCloseModal = () => setShowModal(false);

    if (loading) {
        return <p>Laddar din kundvagn...</p>; 
    }

    return (
        <div className="page-container">
            <div className="unique-checkout-page-container">
                {/* Check if the cart is empty */}
                {cart.length === 0 ? (
                    <p>Din kundvagn är tom. Vänligen lägg till produkter innan du fortsätter till kassan.</p>
                ) : (
                    <>
                        {/* Cart Section */}
                        <div className="unique-cart-section-container">
                            <h2>Kundvagn</h2>
                            <table className="unique-cart-table">
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
                                                <div className="unique-product-info d-flex align-items-center">
                                                    <img src={item.imageUrl} alt={item.snusName} className="unique-product-image" />
                                                    <div>
                                                        {item.snusName} <br />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.size}</td>
                                            <td>
                                                <div className="unique-quantity-controls">
                                                    <button onClick={() => handleQuantityChange(item.snusId, -1)} disabled={item.quantity <= 0}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item.snusId, 1)}>+</button>
                                                </div>
                                            </td>
                                            <td>{(item.price * item.quantity).toFixed(2)} kr</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="unique-subtotal-section">
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
                    </>
                )}

                {/* Confirmation Modal */}
                <Modal isOpen={showModal} onClose={handleCloseModal}>
                    <p>Din order är bekräftad!</p>
                </Modal>
            </div>

            <div className="unique-footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default CheckoutPage;
