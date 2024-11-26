import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const ConfirmPaymentPlan = ({ planId, planType, planAmount, onClose }) => {
  const [serviceLocation, setServiceLocation] = useState("");
  const [duration, setDuration] = useState(1);
  const [username] = useState(localStorage.getItem("username") || "");
  const [email] = useState(localStorage.getItem("email") || "");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);

  const [disableInputs, setDisableInputs] = useState(false);

  const totalAmount = planAmount * duration;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login"; // Redirect to login if the user is not logged in
    }
  }, []);

  const validateForm = async () => {
    if (!serviceLocation.trim()) {
      toast.error("Service location is required.");
      resetForm(); // Reset form if service location is not provided
      return false;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/booking", {
        params: {
          user: username,
          serviceName: planType,
          serviceLocation: serviceLocation,
        },
      });

      const existingBookings = response.data;

      for (const booking of existingBookings) {
        const bookingDurationInMonths = parseInt(booking.planduration);
        const createdAtDate = moment(booking.createdAt);
        const endDate = createdAtDate.add(bookingDurationInMonths, "months");
        const currentDate = moment();

        if (booking.planName === planType && currentDate.isBefore(endDate)) {
          toast.error(
            `You already have an active booking for the "${
              booking.planName
            }" plan at "${
              booking.planserviceLocation
            }". Please wait until ${endDate.format(
              "MMMM Do YYYY"
            )} to book again.`
          );
          resetForm(); // Reset form if an active booking is found
          return false;
        }
      }
    } catch (error) {
      console.error(
        "Error checking existing bookings:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error checking existing bookings. Please try again.");
      resetForm(); // Reset form if there's an error
      return false;
    }

    return true;
  };

  const handleProceed = async () => {
    const isValid = await validateForm();
    if (isValid) {
      setDisableInputs(true);
      setShowPayPal(true); // Show PayPal component
    }
  };

  const handleImageUpload = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const handleSuccessPayment = async (details) => {
    try {
      const formData = new FormData();
      formData.append("planName", planType);
      formData.append("planserviceLocation", serviceLocation);
      formData.append("planpaymentId", details.id);
      formData.append("planuser", username);
      formData.append("planemail", email);
      formData.append("planduration", duration);
      formData.append("plantotalAmount", totalAmount);

      if (uploadedImage) {
        formData.append("serviceImage", uploadedImage);
      }

      await axios.post("http://localhost:5000/api/bookings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success toast
      toast.success("Booking created successfully!");

      // Reset form
      resetForm();
      // Close the modal

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = "/";
        onClose(); // Redirect to home page
      }, 3000); // 2000 ms = 2 seconds
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response ? error.response.data : error.message
      );
      toast.error("Payment failed. Please try again.");
    }
  };

  const resetForm = () => {
    setServiceLocation("");
    setDuration(1);
    setUploadedImage(null);
    setDisableInputs(false);
    setShowPayPal(false);
  };

  return (
    <Container>
      <p>
        <strong>Plan:</strong> {planType || "Loading..."}
      </p>
      <p>
        <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
      </p>

      <Form>
        <Form.Group>
          <Form.Label>Service Location</Form.Label>
          <Form.Control
            type="text"
            value={serviceLocation}
            onChange={(e) => setServiceLocation(e.target.value)}
            required
            disabled={disableInputs}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Duration</Form.Label>
          <Form.Control
            as="select"
            value={duration}
            onChange={handleDurationChange}
            disabled={disableInputs}
          >
            <option value="1">1 Month</option>
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Service Location Image (Optional)</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageUpload}
            disabled={disableInputs}
          />
        </Form.Group>

        {!showPayPal && (
          <Button
            variant="primary"
            className="mt-3 custom-button "
            onClick={handleProceed}
            disabled={disableInputs}
          >
            Proceed to Payment
          </Button>
        )}

        {showPayPal && (
          <>
            <h3 className="mt-4">Payment Information</h3>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AT4si2YLorhpc5Nk-YiaE8za2qLz2Jo9cSp3AgoJnFZAXpum0idHZOu35dqP5bj0S9nB6qHP0h7Lk9k_",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  handleSuccessPayment(details);
                }}
                onError={() => {
                  toast.error("Payment failed. Please try again.");
                }}
              />
            </PayPalScriptProvider>
          </>
        )}
      </Form>
      <ToastContainer autoClose={3000} hideProgressBar={false} />
    </Container>
  );
};

export default ConfirmPaymentPlan;
