import React, { useState } from 'react';
import Modal from "../components/modal";
import CheckoutSection from "../components/CheckoutSection"; 
import "../assets/CSS/checkout.css";

import siberiaImage from "../assets/images/siberia-80-degrees-white-dry-portion.png";
import lundgrensImage from "../assets/images/lundgrens-kvallsbris-all-white.png";
import nordicImage from "../assets/images/nordic-spirit-frosty-mint-x-strong.png";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Siberia -80 Degrees White Dry Portion", quantity: 2, price: 557.90, image: siberiaImage },
    { id: 2, name: 'Lundgrens Kvällsbris All White', quantity: 1, price: 884.90, image: lundgrensImage },
    { id: 3, name: 'Nordic Spirit Frosty Mint X-Strong', quantity: 1, price: 19.90, image: nordicImage },
  ]);

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

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter(item => item.quantity > 0) 
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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

    setCartItems([]);
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
    <div className="checkout-page container d-flex justify-content-between">
      {/* Cart Section */}
      <div className="cart-section w-50">
        <h2>Kundvagn</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Produkt</th>
              <th></th>
              <th>Antal</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="product-info d-flex align-items-center">
                    <img src={item.image} alt={item.name} className="product-image mr-2" />
                    <div>
                      {item.name} <br />
                    </div>
                  </div>
                </td>
                <td>{item.size}</td>
                <td>
                  <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="subtotal">
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
