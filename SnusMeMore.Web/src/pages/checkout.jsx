import React, { useState } from 'react';
import "../assets/CSS/checkout.css";

// Import images
import siberiaImage from "../assets/images/siberia-80-degrees-white-dry-portion.png";
import lundgrensImage from "../assets/images/lundgrens-kvallsbris-all-white.png";
import nordicImage from "../assets/images/nordic-spirit-frosty-mint-x-strong.png";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Siberia -80 Degrees White Dry Portion", size: "10-pack", quantity: 2, price: 557.90, image: siberiaImage },
    { id: 2, name: 'Lundgrens Kvällsbris All White', size: '30-pack', quantity: 1, price: 884.90, image: lundgrensImage },
    { id: 3, name: 'Nordic Spirit Frosty Mint X-Strong', size: '1-pack', quantity: 1, price: 19.90, image: nordicImage },
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

  const shippingCosts = {
    standard: 0,
    express: 9.99,
    nextDay: 19.99,
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity + change >= 1
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCosts[shippingMethod];

  const handleCheckout = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const allFieldsFilled = Object.values(address).every(field => field.trim() !== '');
    
    if (!allFieldsFilled) {
      alert('Please fill in all address fields.');
      return;
    }

    // Proceed with checkout process (e.g., API call)
    console.log('Checkout successful:', {
      cartItems,
      paymentMethod,
      shippingMethod,
      address,
    });
  };

  return (
    <div className="checkout-page container d-flex justify-content-between">
      {/* Cart Section */}
      <div className="cart-section w-50">
        <h2>Shopping Cart</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Total Price</th>
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
              <option value="express">Express (1-2 Arbetsdagar) - 9.99 kr</option>
              <option value="nextDay">Nästa dag - 19.99 kr</option>
            </select>
          </div>

          {/* Address Section */}
          <div className="address-section mb-3">
            <h4>Leveransadress:</h4>
            <label>Namn</label>
            <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="form-control" required />
            <label>Adress Address</label>
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
            <input type="text" placeholder="John Carter" className="form-control" required />
            <label>Kortnummer</label>
            <input type="text" placeholder="**** **** **** 2153" className="form-control" required />
            <label>Utgångsdatum</label>
            <input type="text" placeholder="MM / YY" className="form-control" required />
            <label>CVV</label>
            <input type="text" placeholder="123" className="form-control" required />
          </div>

          <button className="btn btn-primary mt-4 w-100" disabled={!shippingMethod}>Check Out</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;