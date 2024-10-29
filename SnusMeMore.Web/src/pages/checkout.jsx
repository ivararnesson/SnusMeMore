import React, { useState } from 'react';
import "../assets/CSS/checkout.css";

// Import images
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
        .filter(item => item.quantity > 0) // Remove items with a quantity of zero
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

    // Display confirmation
    alert('Din order är bekräftad!');

    // Clear cart items, address, and payment info
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
                      {item.name} <br /> {item.type}
                    </div>
                  </div>
                </td>
                <td>{item.size}</td>
                <td>
                  <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= -1}>-</button>
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
      <div className="checkout-section w-25 p-3">
        <h3>Betalning</h3>

        <form onSubmit={handleCheckout}>
          {/* Shipping Method */}
          <div className="shipping-method mb-3">
            <label>Välj fraktmetod:</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="form-control mt-2"
            >
              <option value="standard">Standard (2-5 Arbetsdagar) - Gratis</option>
              <option value="express">Express (1-2 Arbetsdagar) - 79 kr</option>
              <option value="nextDay">Nästa dag - 119 kr</option>
            </select>
          </div>

          {/* Address Section */}
          <div className="address-section mb-3">
            <h4>Leveransadress:</h4>
            <label>Namn</label>
            <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="form-control" required />
            <label>Adress</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="form-control" required />
            <label>Stad</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="form-control" required />
            <label>Postnummer</label>
            <input type="text" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} className="form-control" required />
            <label>Land</label>
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="form-control" required />
          </div>

          {/* Payment Method */}
          <div className="payment-method mb-3">
            <h4>Betalningsmetod:</h4>
            <div>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === 'mastercard'}
                  onChange={() => setPaymentMethod('mastercard')}
                  required
                />
                Mastercard
              </label>
              <label className="ml-3">
                <input
                  type="radio"
                  checked={paymentMethod === 'visa'}
                  onChange={() => setPaymentMethod('visa')}
                  required
                />
                Visa
              </label>
            </div>
          </div>

          {/* Card Details */}
          <div className="card-details mt-3">
            <label>Namn på kortinnehavare</label>
            <input
              type="text"
              value={cardInfo.cardholderName}
              onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
              placeholder="John Carter"
              className="form-control"
              required
            />
            <label>Kortnummer</label>
            <input
              type="text"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
              placeholder="**** **** **** 2153"
              className="form-control"
              required
            />
            <label>Utgångsdatum</label>
            <input
              type="text"
              value={cardInfo.expirationDate}
              onChange={(e) => setCardInfo({ ...cardInfo, expirationDate: e.target.value })}
              placeholder="MM / YY"
              className="form-control"
              required
            />
            <label>CVV</label>
            <input
              type="text"
              value={cardInfo.cvv}
              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
              placeholder="123"
              className="form-control"
              required
            />
          </div>

          <button className="btn btn-primary mt-4 w-100" disabled={!shippingMethod}>Slutför</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;