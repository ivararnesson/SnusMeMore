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
  const cvvPattern = /^\d{3}$/; 

  const setCustomMessage = (e, message) => {
    e.target.setCustomValidity(message);
  };

  const clearCustomMessage = (e) => {
    e.target.setCustomValidity('');
  };

  const months = Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={String(i + 1).padStart(2, '0')}>
      {String(i + 1).padStart(2, '0')}
    </option>
  ));
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={currentYear + i}>
      {currentYear + i}
    </option>
  ));

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    if (e.target.checkValidity()) {
      handleCheckout(); 
    } else {
      alert('Var snäll och fyll i alla fält korrekt.');
    }
  };

  return (
    <div className="unique-checkout-section w-25 p-3" role="form" aria-labelledby="checkout-section-header">
      <h3 id="checkout-section-header">Betalning</h3>
      <form onSubmit={handleFormSubmit} aria-describedby="checkout-section-description">
        <span id="checkout-section-description" className="sr-only"></span>

        {/* Shipping Method */}
        <div className="unique-shipping-method mb-3" role="group" aria-labelledby="shipping-method-label">
          <label id="shipping-method-label" htmlFor="shipping-method">Välj fraktmetod:</label>
          <select
            id="shipping-method"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="form-control mt-2 unique-shipping-select"
            required
          >
            <option value="standard">Standard (2-5 Arbetsdagar) - Gratis</option>
            <option value="express">Express (1-2 Arbetsdagar) - 79 kr</option>
            <option value="nextDay">Nästa dag - 119 kr</option>
          </select>
        </div>

        {/* Address Section */}
        <div className="unique-address-section mb-3" role="group" aria-labelledby="address-section-header">
          <h4 id="address-section-header">Leveransadress:</h4>
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            id="name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            placeholder="Namn"
            className="form-control unique-address-input"
            pattern={namePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt namn med endast bokstäver.')}
            onInput={clearCustomMessage}
            aria-describedby="name-error"
          />
          <span id="name-error" className="sr-only"></span>

          <label htmlFor="street">Adress</label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            placeholder="Adress"
            className="form-control unique-address-input"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange en giltig adress.')}
            onInput={clearCustomMessage}
          />

          <label htmlFor="city">Stad</label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            placeholder="Stad"
            className="form-control unique-address-input"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange en giltig stad.')}
            onInput={clearCustomMessage}
          />

          <label htmlFor="zipCode">Postnummer</label>
          <input
            type="text"
            id="zipCode"
            value={address.zipCode}
            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
            placeholder="Postnummer"
            className="form-control unique-address-input"
            pattern={zipCodePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Postnumret måste vara exakt 5 siffror.')}
            onInput={clearCustomMessage}
          />

          <label htmlFor="country">Land</label>
          <input
            type="text"
            id="country"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            placeholder="Land"
            className="form-control unique-address-input"
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt land.')}
            onInput={clearCustomMessage}
          />
        </div>

        {/* Payment Method */}
        <div className="unique-payment-method mb-3" role="radiogroup" aria-labelledby="payment-method-header">
          <h4 id="payment-method-header">Betalningsmetod:</h4>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'mastercard'}
              onChange={() => setPaymentMethod('mastercard')}
              required
              aria-labelledby="mastercard-label"
            />
            <span id="mastercard-label">Mastercard</span>
          </label>
          <label className="ml-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === 'visa'}
              onChange={() => setPaymentMethod('visa')}
              required
              aria-labelledby="visa-label"
            />
            <span id="visa-label">Visa</span>
          </label>
        </div>

        {/* Card Details */}
        <div className="unique-card-details mt-3" role="group" aria-labelledby="card-details-header">
          <h4 id="card-details-header">Kortinformation:</h4>
          <label htmlFor="cardholderName">Namn på kortinnehavare</label>
          <input
            type="text"
            id="cardholderName"
            value={cardInfo.cardholderName}
            onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
            placeholder="John Carter"
            className="form-control unique-card-input"
            pattern={namePattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Ange ett giltigt namn med endast bokstäver.')}
            onInput={clearCustomMessage}
          />

          <label htmlFor="cardNumber">Kortnummer</label>
          <input
            type="text"
            id="cardNumber"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
            placeholder="**** **** **** 2153"
            className="form-control unique-card-input"
            pattern={cardNumberPattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'Kortnumret måste vara exakt 16 siffror.')}
            onInput={clearCustomMessage}
          />

          <label htmlFor="expirationMonth">Utgångsdatum</label>
          <div className="unique-expiration-date-container">
            <select
              id="expirationMonth"
              value={cardInfo.expirationMonth}
              onChange={(e) => setCardInfo({ ...cardInfo, expirationMonth: e.target.value })}
              className="form-control unique-expiration-select"
              required
              aria-label="Utgångsmånad"
            >
              <option value="">Månad</option>
              {months}
            </select>
            <span className="unique-expiration-divider">/</span>
            <select
              id="expirationYear"
              value={cardInfo.expirationYear}
              onChange={(e) => setCardInfo({ ...cardInfo, expirationYear: e.target.value })}
              className="form-control unique-expiration-select"
              required
              aria-label="Utgångsår"
            >
              <option value="">År</option>
              {years}
            </select>
          </div>

          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cardInfo.cvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
            placeholder="123"
            className="form-control unique-card-input"
            pattern={cvvPattern.source}
            required
            onInvalid={(e) => setCustomMessage(e, 'CVV måste vara exakt 3 siffror.')}
            onInput={clearCustomMessage}
          />
        </div>

        <button
          className="btn btn-primary mt-4 w-100 unique-checkout-button"
          disabled={!shippingMethod || !paymentMethod}
          aria-label="Slutför beställning"
        >
          Slutför
        </button>
      </form>
    </div>
  );
};

export default CheckoutSection;
