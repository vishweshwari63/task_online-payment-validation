import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const validateCardNumber = (number) => {
  const clean = number.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const formatCardNumber = (value) =>
  value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();

const formatExpiry = (value) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{1,2})/, (_, m, y) => `${m}/${y}`)
    .slice(0, 5);

const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

const App = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid =
      validateCardNumber(cardNumber) &&
      expiry.length === 5 &&
      validateCVV(cvv) &&
      cardHolder.trim().length > 0;

    setValid(isValid);
    setSubmitted(true);
  };

  return (
    <div className="app">
      {/* 🔶 Live card preview */}
      <div className="card-preview">
        <div className="card-number">{cardNumber || '#### #### #### ####'}</div>
        <div className="card-name">{cardHolder || 'FULL NAME'}</div>
        <div className="card-expiry">{expiry || 'MM/YY'}</div>
      </div>

      {/* 🔷 The form */}
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment Details</h2>

        <label>Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          maxLength={19}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          required
        />

        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="Cardholder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
        />

        <label>Expiry Date (MM/YY)</label>
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          maxLength={5}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          required
        />

        <label>CVV</label>
        <input
          type="text"
          placeholder="123"
          value={cvv}
          maxLength={4}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
          required
        />

        <button type="submit">Validate</button>

        {submitted && (
          <p className={valid ? 'success' : 'error'}>
            {valid ? '✅ Payment info is valid!' : '❌ Invalid payment details.'}
          </p>
        )}
      </form>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
