import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel, Modal } from "react-bootstrap";
import ConfirmPayment from "./ConfirmPayment";

const Services = () => {
  const [groupedServices, setGroupedServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      _id: "66f00563674387492365cdc8",
      serviceName: "Plumbing",
      serviceDescription: "Fixing leaks, clogs, and plumbing issues.",
      serviceAmountPerHour: 0.01,
      serviceImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWThEJr2iWfWrc-YMxKcUGqeXY1JVPO1TOvg&s",
    },
    {
      _id: "66f006e5674387492365cdcc",
      serviceName: "Basic House Cleaning",
      serviceDescription:
        "Standard cleaning services including dusting, vacuuming, and mopping floors.",
      serviceAmountPerHour: 0.3,
      serviceImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQApikePgBOr7ekPvdTN9yxvIQjVIjhIqPvry8I46DMSS2R7tJ3ZLi-9kqauVBZy3MV0RQ&usqp=CAU",
    },
    {
      _id: "66f0072e674387492365cdcf",
      serviceName: "Roof Repair",
      serviceDescription:
        "Comprehensive roof repair services for residential and commercial properties.",
      serviceAmountPerHour: 70,
      serviceImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFV1IUh2-sagJyp9NbnssDXZgmXzsEblu3wA&s",
    },
    {
      _id: "66f00751674387492365cdd2",
      serviceName: "Electrical Services",
      serviceDescription:
        "Certified electricians for residential and commercial electrical installations.",
      serviceAmountPerHour: 60,
      serviceImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQN4RvlNwjr9qwQo7dX9Y8E3VGqCJ3gh5Jw&s",
    },
  ];

  useEffect(() => {
    groupServices(services);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <Col xs={12} sm={6} md={4} lg={3} key={service._id} className="mb-4">
                    <Card
                      className="text-center p-3 h-100 service-card"
                      style={{
                        border: "none",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                        borderRadius: "20px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                        height: "350px",
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
                      <Card.Img
                        variant="top"
                        src={service.serviceImage}
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "5px solid #113047",
                        }}
                      />
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
                          style={{ padding: "8px 20px" }}
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

        {selectedService && (
          <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ConfirmPayment service={selectedService} onClose={closeModal} />
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default Services;
