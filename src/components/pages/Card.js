import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Card as BootstrapCard,
} from "react-bootstrap";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import "../style/Card.css"; // Custom CSS file

const Card = () => {
  const [serviceBookings, setServiceBookings] = useState([]);
  const [planBookings, setPlanBookings] = useState([]);
  const [serviceError, setServiceError] = useState("");
  const [planError, setPlanError] = useState("");
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchServiceBookings = async () => {
      try {
        const response = await fetch(
          "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookingservice"
        );
        if (!response.ok) throw new Error("Failed to fetch service bookings");
        const data = await response.json();
        const userServiceBookings = data.filter(
          (booking) => booking.email === userEmail
        );
        setServiceBookings(userServiceBookings);
      } catch (error) {
        console.error(error);
        setServiceError(
          "Could not fetch service bookings. Please try again later."
        );
      }
    };

    const fetchPlanBookings = async () => {
      try {
        const response = await fetch(
          "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookings"
        );
        if (!response.ok) throw new Error("Failed to fetch plan bookings");
        const data = await response.json();
        const userPlanBookings = data.filter(
          (booking) => booking.planemail === userEmail
        );
        setPlanBookings(userPlanBookings);
      } catch (error) {
        console.error(error);
        setPlanError("Could not fetch plan bookings. Please try again later.");
      }
    };

    fetchServiceBookings();
    fetchPlanBookings();
  }, [userEmail]);

  return (
    <section id="card" className="services">
      <Container className="my-1">
        <h2 className="display-5 mb-3 cheading">
          Your <span>Service </span> Bookings
        </h2>

        {serviceError && (
          <Alert variant="danger" className="error-alert">
            {serviceError}
          </Alert>
        )}
        {serviceBookings.length === 0 ? (
          <p className="no-bookings">
            No service bookings found for your email.
          </p>
        ) : (
          <Row className="g-4">
            {serviceBookings.map((booking) => (
              <Col sm={12} md={6} lg={4} key={booking._id}>
                <BootstrapCard className="booking-card mb-4 shadow-lg rounded-lg">
                  <BootstrapCard.Body>
                    <BootstrapCard.Title className="card-title">
                      {booking.planName}
                    </BootstrapCard.Title>
                    <div className="card-icon">
                      <FaMapMarkerAlt className="icon" />
                      <span className="card-text">
                        {booking.serviceLocation}
                      </span>
                    </div>
                    <div className="card-icon">
                      <FaClock className="icon" />
                      <span className="card-text">{booking.hours} hours</span>
                    </div>
                    <div className="card-icon">
                      <FaDollarSign className="icon" />
                      <span className="card-text">
                        $
                        {booking.totalAmount
                          ? booking.totalAmount.toFixed(2)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="card-icon">
                      <FaRegCalendarAlt className="icon" />
                      <span className="card-text">
                        Booked On:{" "}
                        {new Date(booking.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </BootstrapCard.Body>
                </BootstrapCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Container className="my-5">
        <h2 className="display-5 mb-3 cheading">
          Your <span>Plan </span> Bookings
        </h2>

        {planError && (
          <Alert variant="danger" className="error-alert">
            {planError}
          </Alert>
        )}
        {planBookings.length === 0 ? (
          <p className="no-bookings">No plan bookings found for your email.</p>
        ) : (
          <Row className="g-4">
            {planBookings.map((booking) => (
              <Col sm={12} md={6} lg={4} key={booking._id}>
                <BootstrapCard className="booking-card mb-4 shadow-lg rounded-lg">
                  <BootstrapCard.Body>
                    <BootstrapCard.Title className="card-title">
                      {booking.planName}
                    </BootstrapCard.Title>
                    <div className="card-icon">
                      <FaMapMarkerAlt className="icon" />
                      <span className="card-text">
                        {booking.planserviceLocation}
                      </span>
                    </div>
                    <div className="card-icon">
                      <FaClock className="icon" />
                      <span className="card-text">
                        {booking.planduration} month(s)
                      </span>
                    </div>
                    <div className="card-icon">
                      <FaDollarSign className="icon" />
                      <span className="card-text">
                        $
                        {booking.plantotalAmount
                          ? booking.plantotalAmount.toFixed(2)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="card-icon">
                      <FaRegCalendarAlt className="icon" />
                      <span className="card-text">
                        Booked On:{" "}
                        {new Date(booking.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </BootstrapCard.Body>
                </BootstrapCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Card;
