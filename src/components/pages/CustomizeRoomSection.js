import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import roomDesignImage from "../Image/img3.png";
import "../style/CustomizeRoomSection.css";

const CustomizeRoomSection = () => {
  const navigate = useNavigate();
 

  const handleCartClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Always redirect to the room-design page
    navigate("/room-design");
  };

  return (
    <section id="Personalize" className="customize-room-section">
      <Container fluid className="px-5">
        <Row className="align-items-center mt-5">
          {/* Image Section */}
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center position-relative"
          >
            <div className="image-container">
              <img
                src={roomDesignImage}
                alt="Room Design"
                className="img-fluid rounded main-image"
              />
              <div className="overlay-box">
                <p>Visualize Your Dream Space</p>
              </div>
            </div>
          </Col>

          {/* Text Section */}
          <Col xs={12} md={6} className="text-center text-md-left">
            <h2 className="display-5 mb-3 heading" >
            Customize<span>Your Room </span> Design
            </h2>
            <p className="description mb-4" style={{ textAlign: 'justify' }}>
              With our cutting-edge tools, you can effortlessly customize your
              room design. Experiment with layouts, furniture, and colors to
              create a space tailored to your unique taste.With our cutting-edge tools, you can effortlessly customize your
              room design. Experiment with layouts, furniture, and colors to
              create a space tailored to your unique taste.
            </p>
            <Button
              variant="primary"
              className="custom-button btn-lg"
              onClick={handleCartClick}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
      <br/>
      <br/>
    </section>
  );
};

export default CustomizeRoomSection;
