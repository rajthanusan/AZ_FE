import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Modal } from "react-bootstrap";
import axios from "axios";
import ConfirmPayment from "./ConfirmPayment";

const Services = () => {
  const [services, setServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
      groupServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const groupServices = (services) => {
    const groups = [];
    for (let i = 0; i < services.length; i += 4) {
      groups.push(services.slice(i, i + 4));
    }
    setGroupedServices(groups);
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="services section py-5"
      style={{
        background: "#cfd4d9",
        padding: "80px 0",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <Container>
        <h2 className="display-5 mb-3 cheading">
        
        Additional <span>Services</span>
        </h2>

        <Carousel
          interval={null}
          indicators={true}
          nextLabel=""
          prevLabel=""
          style={{
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "15px",
            padding: "15px",
            backgroundColor: "#fff",
          }}
        >
          {groupedServices.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center">
                {group.map((service) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={service._id}
                    className="mb-4"
                  >
                    <Card
  className="text-center p-3 h-100 service-card" // Reduced padding here
  style={{
    border: "none",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    height: "350px", // Adjust the height of the entire card
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow =
      "0 12px 40px rgba(0, 0, 0, 0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow =
      "0 8px 30px rgba(0, 0, 0, 0.1)";
  }}
>
  {service.serviceImage && (
    <Card.Img
      variant="top"
      src={`http://localhost:5000/uploads/${service.serviceImage}`}
      style={{
        height: "150px", // Reduced height for image
        objectFit: "cover",
        borderRadius: "10px",
        border: "5px solid #113047",
      }}
    />
  )}
  <Card.Body className="d-flex flex-column justify-content-between">
    <h5
      style={{
        color: "#ff4d4d",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "1.2rem",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      {service.serviceName}
    </h5>
    <p
      style={{
        color: "#4f4f4f",
        fontSize: "0.9rem",
        marginBottom: "20px",
      }}
    >
      {service.serviceDescription}
    </p>
    <h6
      style={{
        color: "#2c3e50",
        fontWeight: "bold",
        fontSize: "1.1rem",
      }}
    >
      ${service.serviceAmountPerHour} / hour
    </h6>
    <Button
      variant="primary"
      className="custom-button"
      style={{
        padding: "8px 20px", // Adjust padding to reduce button size
      }}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = 'rgb(255, 102, 102)')
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = "rgb(255, 102, 102)")
      }
      onClick={() => handleBookNow(service)}
    >
      Book Now
    </Button>
  </Card.Body>
</Card>

                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        <br/>
        <br/>

        {selectedService && (
          <Modal
            show={showModal}
            onHide={closeModal}
            size="250px"
            centered
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Modal.Header
              closeButton
              // style={{
              //   backgroundColor: "#8c2d4f",
              //   color: "white",
              //   fontWeight: "bold",
              //   fontSize: "1.6rem",
              //   borderTopLeftRadius: "15px",
              //   borderTopRightRadius: "15px",
              // }}
            >
              <Modal.Title>Confirm Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body
              // style={{
              //   backgroundColor: "#fff",
              //   padding: "30px",
              //   borderRadius: "15px",
              //   boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
              // }}
            >
              <ConfirmPayment service={selectedService} onClose={closeModal} />
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </section>
    
  );
};

export default Services;
