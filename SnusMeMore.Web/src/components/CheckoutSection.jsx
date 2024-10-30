import React from 'react';

const CheckoutSection = ({
  shippingMethod,
  setShippingMethod,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  cardInfo,
  setCardInfo,
  handleCheckout,
}) => {
  return (
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
  );
};

export default CheckoutSection;
