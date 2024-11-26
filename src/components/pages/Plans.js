import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
import ConfirmPaymentplan from "./ConfirmPaymentplan";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Plans.css";

const PlanDescription = ({ description }) => {
  const features = description.split(",");
  return (
    <ul className="plan-description">
      {features.map((feature, index) => (
        <li key={index} className="d-flex align-items-center">
          <FaCheckCircle
            size={18}
            className="me-2"
            style={{ color: "#f0a6a6" }}
          />
          <span>{feature.trim()}</span>
        </li>
      ))}
    </ul>
  );
};

const Plans = () => {
  // Local plans data
  const plansData = [
    {
      _id: "66eff0bef3a306cc62751aa7",
      planType: "Premium",
      planDescription:
        "Basic House Cleaning, Plumbing, Roof Repair, Indoor House Cleaning, Outdoor Cleaning",
      planAmount: 0.02,
      createdAt: "2024-09-22T10:26:06.117+00:00",
    },
    {
      _id: "66eff338f3a306cc62751aae",
      planType: "Basic",
      planDescription:
        "Basic House Cleaning, Plumbing, Roof Repair, Indoor House Cleaning, Outdoor Cleaning",
      planAmount: 0.01,
      createdAt: "2024-09-22T10:36:40.169+00:00",
    },
    {
      _id: "66eff364f3a306cc62751ab1",
      planType: "Pro",
      planDescription:
        "Basic House Cleaning, Plumbing, Roof Repair, Indoor House Cleaning, Outdoor Cleaning",
      planAmount: 55,
      createdAt: "2024-09-22T10:37:24.908+00:00",
    },
  ];

  const [plans] = useState(plansData);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <section id="plans" className="service-plans-section">
        <Container>
          <h2 className="display-5 mb-5 cheading text-center">
            Choose Your <span className="highlight">Perfect Plan</span>
          </h2>
          <Row className="justify-content-center">
            {plans.map((plan) => (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={4}
                key={plan._id}
                className="mb-4"
              >
                <Card className="plan-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <h3 className="plan-title" style={{ color: "black" }}>
                      {plan.planType} Plan
                    </h3>
                    <h4 className="plan-price">
                      ${plan.planAmount.toFixed(2)}
                    </h4>
                    <PlanDescription description={plan.planDescription} />
                    <Button
                      variant="primary"
                      className="custom-button mt-auto"
                      onClick={() => handleChoosePlan(plan)}
                    >
                      <FaCalendarCheck className="me-2" />
                      Choose Plan
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>Confirm Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPlan && (
              <ConfirmPaymentplan
                planId={selectedPlan._id}
                planType={selectedPlan.planType}
                planAmount={selectedPlan.planAmount}
                onClose={closeModal}
              />
            )}
          </Modal.Body>
        </Modal>

        <ToastContainer />
      </section>
    </>
  );
};

export default Plans;
