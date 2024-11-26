import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSmile, FaUsers, FaCalendarAlt, FaDollarSign, FaClock, FaHandshake } from 'react-icons/fa';
import '../style/ServicesSection.css'; // Ensure the correct path

const ServicesSection = () => {
  return (
    <section id="grantee" style={{
      background: "#cfd4d9",
      padding: "80px 0",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    }}>
      <div className="services-section py-1">
        <Container>
          
          <h2 className="display-5 mb-3 cheading">
          Why <span>Choose </span> Us
            </h2>

          <Row>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaSmile className="mb-3" style={{ color: '#ff6666' }} size={50} />
                </div>
                <h5 style={{ color: '#ff6666', fontWeight: '900' }}>Satisfaction Guarantee</h5>
                <p>
                  No worries about scams; our verified company delivers optimal results. Your satisfaction is our priority with every service.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaUsers className="mb-3" style={{ color: 'black' }} size={50} />
                </div>
                <h5 style={{ color: 'black', fontWeight: '900' }}>Local Professionals</h5>
                <p>
                  Our services cover the Nationwide, US area, including urban, suburban, and rural locations for both long and short-term maintenance.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaCalendarAlt className="mb-3" style={{ color: '#ff6666' }} size={50} />
                </div>
                <h5 style={{ color: '#ff6666', fontWeight: '900' }}>Flexible Appointments</h5>
                <p>
                  Get personalized cost estimates with no obligation. Enjoy transparency and peace of mind as you explore our wide range of services.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaDollarSign className="mb-3" style={{ color: 'black' }} size={50} />
                </div>
                <h5 style={{ color: 'black', fontWeight: '900' }}>Free Quotes</h5>
                <p>
                  Get personalized cost estimates without any obligation. Experience transparency and peace of mind as you explore our services.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaClock className="mb-3" style={{ color: '#ff6666' }} size={50} />
                </div>
                <h5 style={{ color: '#ff6666', fontWeight: '900' }}>Fast 24-Hour Service</h5>
                <p>
                  Need help with repairs? Our expert team is available around the clock to quickly address any issue with efficiency and precision.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="service-card">
                <div className="icon">
                  <FaHandshake className="mb-3" style={{ color: 'black' }} size={50} />
                </div>
                <h5 style={{ color: 'black', fontWeight: '900' }}>100% Commitment-Free</h5>
                <p>
                  Discuss any problems without pressure or obligation. Our no-commitment approach ensures you feel comfortable asking questions.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default ServicesSection;
