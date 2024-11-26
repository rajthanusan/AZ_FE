
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ConfirmPayment = ({ service, onClose }) => {
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState(1);
  const [totalAmount, setTotalAmount] = useState(service ? service.serviceAmountPerHour : 0);
  const [setPaymentStatus] = useState({ success: null, message: '' });
  const [username] = useState(localStorage.getItem('username') || '');
  const [email] = useState(localStorage.getItem('email') || '');
  const [showPayPal, setShowPayPal] = useState(false);
  const [ setError] = useState('');

  useEffect(() => {
    setTotalAmount(hours * service.serviceAmountPerHour);
  }, [hours, service.serviceAmountPerHour]);

  const handleFormSubmit = async (paymentId) => {
    const bookingData = {
      planName: service.serviceName,
      serviceLocation: address,
      hours,
      totalAmount: totalAmount.toFixed(2),
      user: username,
      email,
      paymentId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookingservice', bookingData);
      setPaymentStatus({ success: true, message: response.data.message });
      toast.success(response.data.message);
      resetForm();
      setTimeout(() => {
        onClose();
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setPaymentStatus({ success: false, message: 'Error processing payment. Please try again.' });
      toast.error('Error processing payment. Please try again.');
    }
  };

  const resetForm = () => {
    setAddress('');
    setHours(1);
    setShowPayPal(false);
    setPaymentStatus({ success: null, message: '' });
  };

  const handleProceedClick = () => {
    if (!address.trim()) {
      setError('Please enter a valid address.');
      setShowPayPal(false);
      toast.error('Please enter a valid address.');
    } else {
      setError('');
      setShowPayPal(true);
    }
  };

  return (
    <Container>
      

      <p><strong>Service:</strong> {service.serviceName}</p>
      <p><strong>Amount per Hour:</strong> ${service.serviceAmountPerHour.toFixed(2)}</p>
      <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label>Service Location</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter service location"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Hours</Form.Label>
          <Form.Control
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min={1}
            required
          />
        </Form.Group>

        {!showPayPal && (
          <Button variant="primary" className="mt-3 custom-button " onClick={handleProceedClick}>
            Proceed to Payment
          </Button>
        )}

        {showPayPal && (
          <PayPalScriptProvider options={{ "client-id": "AT4si2YLorhpc5Nk-YiaE8za2qLz2Jo9cSp3AgoJnFZAXpum0idHZOu35dqP5bj0S9nB6qHP0h7Lk9k_" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: { value: totalAmount.toFixed(2) },
                  }],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                handleFormSubmit(order.id);
              }}
              onError={() => {
                setPaymentStatus({ success: false, message: 'Payment failed. Please try again.' });
                toast.error('Payment failed. Please try again.');
              }}
            />
          </PayPalScriptProvider>
        )}
      </Form>

      <ToastContainer />
    </Container>
  );
};

export default ConfirmPayment;