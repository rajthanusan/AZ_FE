// // import React, { useEffect, useState } from 'react';
// // import { Container, Row, Col, Button } from 'react-bootstrap';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faCheckCircle, faClock, faUserTie, faCalendarAlt, faWrench } from '@fortawesome/free-solid-svg-icons';
// // import { useNavigate } from 'react-router-dom';

// // import '../style/HeroSection.css'; // Adding a custom CSS file for animations

// // // Image array for background
// // const images = [
// //   // 'https://i.pinimg.com/564x/57/b8/1d/57b81d697422428d737a02815ab00f71.jpg',
// //   // 'https://i.ibb.co/hHLS2fB/customized-room-design-4.png',
// //   'https://i.pinimg.com/564x/b6/5c/f3/b65cf3dd3b11f70f35604978218016fd.jpg',
  
  
// // ];

// // const HeroSection = () => {
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const navigate = useNavigate();

// //   // Change background images every 3 seconds
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleGetStartedClick = () => {
// //     const isLoggedIn = Boolean(localStorage.getItem('token'));
// //     if (isLoggedIn) {
// //       window.location.href = './room-design';
// //     } else {
// //       navigate('/login', { state: { from: './room-design' } });
// //     }
// //   };

// //   return (
// //     <section id="home" className="hero-section full-screen d-flex flex-column justify-content-center align-items-start text-left">
// //       <div
// //         className="background-image"
// //         style={{
// //           backgroundImage: `url(${images[currentImageIndex]})`,
// //           transition: 'background-image 1s ease-in-out',
// //         }}
// //       >
// //         <Container fluid>
// //         <Row className="align-items-center justify-content-start p-5"> 
// //   <Col
// //     md={6}
// //     className="hero-content mt-4"
// //     style={{ color: '#003366', fontWeight: 900, paddingLeft:'42px'}}//marginLeft:'40px'
// //   >
// //     <p className="subheading fadeIn">Maintenances - Repairs - Improvements</p>
// //     <h1
// //       className="display-5 fadeIn"
// //       style={{ color: '#00224D', fontWeight: 700 }}
// //     >
// //       Need property management<br />
// //       or repair your home?<br />
// //       We can help!
// //     </h1>
// //     <ul className="benefits-list list-unstyled fadeIn">
// //       <li>Free Quotes-100% Commitment-Free</li>
// //     </ul>
// //     <Button
// //       variant="light"
// //       className="call-us-button fadeIn"
// //       style={{ backgroundColor: '#f6f0d8', color: 'black', border: 'none' }}
// //       onClick={handleGetStartedClick}
// //     >
// //       Get Started
// //     </Button>
// //   </Col>
// // </Row>

          
          
// //           <div className="benefits-icons benefits-background py-2 mb-4" style={{  backgroundColor:'#D97D7D', fontWeight: 600  }}>
// //             <Row className="text-center" >
// //               <Col xs={6} md={3} className="icon-item fadeIn">
// //                 <FontAwesomeIcon icon={faCheckCircle} className="icon mb-1"style={{ color: '#8c2d4f' }}/>
// //                  <p>Satisfaction Guarantee</p>
// //               </Col>
// //                <Col xs={6} md={3} className="icon-item fadeIn">
// //                 <FontAwesomeIcon icon={faClock} className="icon mb-1" style={{ color: '#8c2d4f' }}/>
// //                 <p>24H Availability</p>
// //               </Col>
// //                <Col xs={6} md={3} className="icon-item fadeIn">
// //            <FontAwesomeIcon icon={faWrench} className="icon mb-1" style={{ color: '#8c2d4f' }} />
// //                <p>Easy Customization</p>
// //                </Col>

// //                <Col xs={6} md={3} className="icon-item fadeIn">
// //                  <FontAwesomeIcon icon={faCalendarAlt} className="icon mb-1" style={{ color: '#8c2d4f' }}/>
// //                <p>Flexible Appointments</p>
// //                </Col>
              
              
// //              </Row>
// //          </div>
// //         </Container>
// //       </div>
// //     </section>
// //   );
// // };

// export default HeroSection;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import myImage from '../Image/home-img.webp';

import '../style/HeroSection.css'; // Custom CSS for animations and styling

// Array for background images (if you plan to add more in the future)
const images = [
  'https://i.imghippo.com/files/uuoP4808loQ.png',
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Rotating background image logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStartedClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    if (isLoggedIn) {
      window.location.href = './room-design';
    } else {
      navigate('/login', { state: { from: './room-design' } });
    }
  };

  return (
    <section
      id="home"
      className="hero-section d-flex align-items-center"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Container fluid>
        <Row className="align-items-center ">
          {/* First Column: Text Section */}
          <Col
            md={6}
            className="hero-content text-left px-5"
            style={{
              color: '#003366',
              fontWeight: 900,
              marginTop: '30px',
              marginLeft:'5px'
            }}

          >
            <p className="subheading fadeIn" style={{ color: '#191E2B', fontWeight: 'bold' ,fontFamily:  'Montserrat'
}}>

Maintenances - <span style={{ color: '#8f2347' }}>Repairs</span> - Improvements
            </p>
            <h1
              className="fadeIn"
              style={{
                color: '#191E2B',
                fontWeight: '700',
                fontSize: '2.5rem',
                lineHeight: '1.5',fontFamily:  'Montserrat'
              }}
            >
              Need property management
              <br />
              or repair your home?
              <br />
              We can help!
            </h1>
            <p className="fadeIn" style={{ color: '#191E2B', margin: '20px 0', fontSize: '18px' }}>
              Free Quotes - 100% Commitment-Free
            </p>
            <Button
              variant="light"
              className="custom-button fadeIn"
            
             
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </Col>

          {/* Second Column: Image Section */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center mt-4"
          >
            {/* <img
              // src={myImage}
              alt="Property management"
              className="img-fluid fadeIn"
              style={{
                maxHeight: '500px',
                maxWidth: '100%',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#f0a6a6',
              }}
            /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;

// import React, { useEffect } from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import '../style/HeroSection.css'; // Custom CSS file for animations

// const HeroSection = () => {
//   const navigate = useNavigate();

//   const handleGetStartedClick = () => {
//     const isLoggedIn = Boolean(localStorage.getItem('token'));
//     if (isLoggedIn) {
//       window.location.href = './room-design';
//     } else {
//       navigate('/login', { state: { from: './room-design' } });
//     }
//   };

//   return (
//     <section id="home" className="hero-section full-screen d-flex justify-content-center align-items-center text-center">
//       {/* Video Background */}
//       <video autoPlay loop muted className="video-background">
//         <source
//           src="https://www.w3schools.com/howto/rain.mp4" // Replace this with your video URL
//           type="video/mp4"
//         />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay Content */}
//       <div className="hero-overlay">
//         <Container>
//           <Row className="align-items-center">
//             <Col md={12}>
//               <p className="subheading fadeIn">Maintenances - Repairs - Improvements</p>
//               <h1 className="display-5 fadeIn" style={{ color: '#FFFFFF', fontWeight: 700 }}>
//                 Need property management<br />
//                 or repair your home?<br />
//                 We can help!
//               </h1>
//               <ul className="benefits-list list-unstyled fadeIn" style={{ color: '#FFFFFF' }}>
//                 <li>Free Quotes - 100% Commitment-Free</li>
//               </ul>
//               <Button
//                 variant="light"
//                 className="call-us-button fadeIn"
//                 style={{
//                   backgroundColor: '#f0a6a6',
//                   color: '#003366',
//                   border: 'none',
//                   fontWeight: '900',
//                 }}
//                 onClick={handleGetStartedClick}
//               >
//                 Get Started
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
// import React from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import '../style/HeroSection.css'; // Custom CSS for additional styles
// import logo from '../Image/logo.png'; // Replace with your logo
// import heroImage from '../Image/heroImage.webp'; // Replace with your image

// const HeroSection = () => {
//   return (
//     <section className="hero-section" style={{ backgroundColor: '#f7faff' }}>
//       <Container fluid>
//         <Row className="align-items-center">
//           {/* Logo and Navigation */}
//           <Col md={12} className="d-flex justify-content-between p-3">
//             <img src={logo} alt="Logo" style={{ height: '50px' }} />
//             <Button
//               variant="outline-primary"
//               style={{
//                 borderRadius: '20px',
//                 fontWeight: 'bold',
//                 padding: '8px 16px',
//               }}
//             >
//               Contact Us
//             </Button>
//           </Col>
//         </Row>
//         <Row className="align-items-center">
//           {/* Left Section: Text */}
//           <Col md={6} className="text-left p-5">
//             <h1 style={{ color: '#003366', fontWeight: 'bold' }}>
//               Your Out of House HR
//             </h1>
//             <p style={{ color: '#5c6f7c', fontSize: '18px', marginTop: '15px' }}>
//               Whenever you are, wherever you need!
//             </p>
//             <div className="mt-4">
//               <Button
//                 variant="primary"
//                 style={{
//                   marginRight: '10px',
//                   backgroundColor: '#003366',
//                   border: 'none',
//                   borderRadius: '20px',
//                   padding: '10px 20px',
//                 }}
//               >
//                 Learn More
//               </Button>
//               <Button
//                 variant="outline-primary"
//                 style={{
//                   borderRadius: '20px',
//                   padding: '10px 20px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Contact Us
//               </Button>
//             </div>
//           </Col>

//           {/* Right Section: Image */}
//           <Col md={6} className="text-center">
//             <img
//               src={heroImage}
//               alt="Hero"
//               className="img-fluid"
//               style={{
//                 maxHeight: '500px',
//                 borderRadius: '15px',
//                 boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
//               }}
//             />
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default HeroSection;
