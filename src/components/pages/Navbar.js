import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { FaClipboardList, FaComments } from 'react-icons/fa';
import Chatbot from './Chatbot'; // Import the Chatbot component
import logo from '../Image/az01.png';


const CustomNavbar = ({ user, onLogout, isAdmin }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  // Function to handle cart icon click using window.location.href
  const handleCartClick = () => {
    window.location.href = './Card'; // Redirect to the bookings page
  };

  // Function to handle chatbot click to open the chatbot modal
  const handleChatbotClick = () => {
    setShowChatbot(true);
  };

  // Function to close the chatbot modal
  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" className="custom-navbar">
        <Container>
        <Navbar.Brand href="/" >
        <img
          src={logo}
          alt="AZBROAD"
          width="100"
          height="40"
          className="d-inline-block align-top"
        />{' '}
        {/* AZBOARD */}
        </Navbar.Brand>          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isAdmin && (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/CusRoom">Personalize</Nav.Link>
                <Nav.Link href="/plans">Plans</Nav.Link>
                <Nav.Link href="/Services">Services</Nav.Link>
                
                <Nav.Link href="/FAQ">FAQ</Nav.Link>
                <Nav.Link href="/Servicesection">Guarantee</Nav.Link>
                  <Button variant="link" onClick={handleChatbotClick} className="chatbot-icon">
                     <FaComments />
                  </Button>
                </>
              )}
              {isAdmin && (
                <>
                  <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/admin/users">Manage Users</Nav.Link>
                  <Nav.Link href="/admin/services">Manage Services</Nav.Link>
                </>
              )}
            </Nav>

            {user ? (
              <div className="d-flex align-items-center">
                <Button variant="link" onClick={handleCartClick}>
                  <FaClipboardList className="cart-icon" />
                </Button>
                <Button variant="primary" className="ms-3 cs-button" style={{ backgroundColor: '#f6f0d8', color:'black',fontWeight:'900'}}  onClick={onLogout}>
                  {user} (Logout)
                </Button>
              </div>
            ) : (
              <Button variant="primary" className="ms-3 cs-button" style={{ backgroundColor: '#f6f0d8', color:'black',fontWeight:'900'}} href="/login">  
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Chatbot Modal */}
      <Modal show={showChatbot} onHide={handleCloseChatbot} centered>
      <Modal.Header closeButton className="chat-header"> {/* Apply the chat-header class here */}
    <Modal.Title>Customer Care</Modal.Title>
  </Modal.Header>
        <Modal.Body>
          <Chatbot />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomNavbar;

