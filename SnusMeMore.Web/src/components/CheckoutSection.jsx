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
 
  const namePattern = /^[a-zA-ZÀ-ſ\s]+$/; 
  const zipCodePattern = /^[0-9]{5}$/; 
  const cardNumberPattern = /^\d{16}$/; 
  const expirationDatePattern = /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/; 
  const cvvPattern = /^\d{3}$/; 

 
  const setCustomMessage = (e, message) => {
    e.target.setCustomValidity(message);
  };

  const clearCustomMessage = (e) => {
    e.target.setCustomValidity('');
  };

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
          <input
            type="text"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="form-control"
            pattern={namePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt namn med endast bokstäver.')}
            onInput={clearCustomMessage}
          />
          <label>Adress</label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="form-control"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange en giltig adress.')}
            onInput={clearCustomMessage}
          />
          <label>Stad</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="form-control"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange en giltig stad.')}
            onInput={clearCustomMessage}
          />
          <label>Postnummer</label>
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
            className="form-control"
            pattern={zipCodePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Postnumret måste vara exakt 5 siffror.')}
            onInput={clearCustomMessage}
          />
          <label>Land</label>
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="form-control"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt land.')}
            onInput={clearCustomMessage}
          />
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
            pattern={namePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt namn med endast bokstäver.')}
            onInput={clearCustomMessage}
          />
          <label>Kortnummer</label>
          <input
            type="text"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
            placeholder="**** **** **** 2153"
            className="form-control"
            pattern={cardNumberPattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Kortnumret måste vara exakt 16 siffror.')}
            onInput={clearCustomMessage}
          />
          <label>Utgångsdatum</label>
          <input
            type="text"
            value={cardInfo.expirationDate}
            onChange={(e) => setCardInfo({ ...cardInfo, expirationDate: e.target.value })}
            placeholder="MM / YY"
            className="form-control"
            pattern={expirationDatePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Utgångsdatum måste vara i formatet MM/YY.')}
            onInput={clearCustomMessage}
          />
          <label>CVV</label>
          <input
            type="text"
            value={cardInfo.cvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
            placeholder="123"
            className="form-control"
            pattern={cvvPattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'CVV måste vara exakt 3 siffror.')}
            onInput={clearCustomMessage}
          />
        </div>

        <button className="btn btn-primary mt-4 w-100" disabled={!shippingMethod}>
          Slutför
        </button>
      </form>
    </div>
  );
};

export default CheckoutSection;
