import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
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
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/service-plans"
      );
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

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
                      className="custom-button  mt-auto"
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

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
// import ConfirmPaymentplan from './ConfirmPaymentplan'; // Import ConfirmPaymentplan component
// import { ToastContainer } from 'react-toastify'; // Import ToastContainer
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// // Function to format the plan's description
// const PlanDescription = ({ description }) => {
//   const words = description.split(',');
//   return (
//     <div style={{ textAlign: 'left', marginTop: '20px' }}>
//       {words.map((word, index) => (
//         <p key={index} style={{ marginBottom: '5px', color: '#6c757d' }}>
//           <FaCheckCircle size={18} style={{ marginRight: '10px', color: '#f0a6a6' }} /> {word.trim()}
//         </p>
//       ))}
//     </div>
//   );
// };

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   // Fetch plans from the server on component mount
//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/service-plans');
//       setPlans(response.data);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     }
//   };

//   // Open the modal with selected plan details
//   const handleChoosePlan = (plan) => {
//     setSelectedPlan(plan);
//     setShowModal(true);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedPlan(null);
//   };

//   return (
//     <><section id="plans" className="service-plans section bg-light">
//     <Container>
//       <h2 className="text-center  mb-5" style={{ color: '#191E2B', fontWeight: 'bold', fontSize: '2.5rem' ,paddingTop:'80px', }}>
//         Our Service Plans
//       </h2>

//       <Row className="justify-content-center">
//         {plans.map(plan => (
//           <Col xs={12} sm={12} md={6} lg={4} key={plan._id} className="mb-4" style={{paddingBottom:'30px'}}>
//             <Card
//               className="text-center p-4 shadow-lg h-100 card1"
//               style={{
//                 height: '500px',
//                 transition: 'transform 0.3s, box-shadow 0.1s',
//                 borderRadius: '50px',
//                 padding: '1rem',
//                 border: '3px solid #113047',
//                   // background: 'linear-gradient(45deg, #921A40 70%, transparent 100%)',
// }}
//               onMouseEnter={e => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 51, 102, 0.15)';
//               }}
//               onMouseLeave={e => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.1)';
//               }}
//             >
//               <h3 style={{  fontWeight: 'bold' }}>{plan.planType} Plan</h3>
//               <h4 style={{ marginBottom: '5px', fontWeight: 'bold' }}>${plan.planAmount.toFixed(2)}</h4>

//               <div  style={{ marginTop: '5px',marginBottom:'30px' }}>
//                 <PlanDescription description={plan.planDescription} />
//               </div>
//               <div  style={{marginRight: '50px'}}>

//               {/* Bootstrap Button Styling */}
//               <Button
//                 variant="primary"
//                 className="cs-button  w-40 mt-auto mx-auto"
//                 style={{
//                   backgroundColor: '#D97D7D',
//                   borderColor: '#8f2347',
//                    fontWeight:'900',

//                 }}
//                 onClick={() => handleChoosePlan(plan)}
//               >
//                 <FaCalendarCheck size={20} className="me-2" /> Choose Plan
//               </Button>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//           {/* Modal for confirming payment */}
//           <Modal show={showModal} onHide={closeModal} size="150" centered>
//             <Modal.Header closeButton style={{ backgroundColor: '#8c2d4f '}}>
//               <Modal.Title style={{ color: 'white', fontWeight: 'bold', fontSize: '2.0rem' }}>Confirm Payment</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {selectedPlan && (
//                 <ConfirmPaymentplan
//                   planId={selectedPlan._id}
//                   planType={selectedPlan.planType}
//                   planAmount={selectedPlan.planAmount}
//                   onClose={closeModal}  // Pass the closeModal function to close the modal after payment
//                   style={{ boxShadow: '10px 10px 10px #003366' }}
//                 />
//               )}
//             </Modal.Body>
//           </Modal>
//         </Container>
//       </section>

//       {/* Include ToastContainer to show the toast notifications */}
//       <ToastContainer />
//     </>
//   );
// };

// export default Plans;
// // import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// // import axios from 'axios';
// // import { BsCheckCircleFill, BsCalendarCheckFill, BsArrowRightShort } from 'react-icons/bs';
// // import ConfirmPaymentplan from './ConfirmPaymentplan';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const PlanDescription = ({ description }) => {
// //   const words = description.split(',');
// //   return (
// //     <div className="text-start mt-3">
// //       {words.map((word, index) => (
// //         <p key={index} className="mb-2 d-flex align-items-center" style={{ color: '#D9ABAB' }}>
// //           <BsCheckCircleFill className="me-2" style={{ color: '#C75B7A' }} />
// //           <span>{word.trim()}</span>
// //         </p>
// //       ))}
// //     </div>
// //   );
// // };

// // const Plans = () => {
// //   const [plans, setPlans] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedPlan, setSelectedPlan] = useState(null);

// //   useEffect(() => {
// //     fetchPlans();
// //   }, []);

// //   const fetchPlans = async () => {
// //     try {
// //       const response = await axios.get('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/service-plans');
// //       setPlans(response.data);
// //     } catch (error) {
// //       console.error('Error fetching plans:', error);
// //     }
// //   };

// //   const handleChoosePlan = (plan) => {
// //     setSelectedPlan(plan);
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setSelectedPlan(null);
// //   };

// //   return (
// //     <>
// //       <section id="plans" className="py-5"
// //       // style={{ background: 'linear-gradient(135deg, #921A40 0%, #C75B7A 50%, #D9ABAB 100%)' }}
// //       >
// //         <Container>
// //           <h2 className="text-center mb-5 text-white" style={{ fontWeight: 'bold', fontSize: '2.5rem', paddingTop: '80px' }}>
// //             Our Service Plans
// //           </h2>

// //           <Row className="justify-content-center">
// //             {plans.map(plan => (
// //               <Col xs={12} sm={12} md={6} lg={4} key={plan._id} className="mb-4">
// //                 <Card
// //                   className="text-center h-100 border-0"
// //                   style={{
// //                     background: 'rgba(255, 255, 255, 0.1)',
// //                     backdropFilter: 'blur(10px)',
// //                     transition: 'transform 0.3s',
// //                     borderRadius: '20px',
// //                     overflow: 'hidden',
// //                   }}
// //                 >
// //                   <Card.Body className="d-flex flex-column">
// //                     <Card.Title as="h3" className="mb-4 text-white" style={{ fontWeight: 'bold', fontSize: '2rem' ,color:'white'}}>
// //                       {plan.planType} Plan
// //                     </Card.Title>
// //                     <Card.Subtitle as="h4" className="mb-3 text-white" style={{ fontWeight: 'bold', fontSize: '1.5rem' ,color:'white'}}>
// //                       ${plan.planAmount.toFixed(2)}
// //                     </Card.Subtitle>

// //                     <PlanDescription description={plan.planDescription} />

// //                     <Button
// //                       variant="light"
// //                       className="mt-auto mx-auto px-4 py-2"
// //                       style={{
// //                         backgroundColor: '#C75B7A',
// //                         borderColor: '#921A40',
// //                         color: 'white',
// //                         fontWeight: 'bold',
// //                         transition: 'all 0.3s',
// //                       }}
// //                       onClick={() => handleChoosePlan(plan)}
// //                       onMouseEnter={(e) => {
// //                         e.target.style.backgroundColor = '#921A40';
// //                         e.target.style.transform = 'translateY(-2px)';
// //                       }}
// //                       onMouseLeave={(e) => {
// //                         e.target.style.backgroundColor = '#C75B7A';
// //                         e.target.style.transform = 'translateY(0)';
// //                       }}
// //                     >
// //                       <BsCalendarCheckFill className="me-2" />
// //                       Choose Plan
// //                       <BsArrowRightShort className="ms-1" />
// //                     </Button>
// //                   </Card.Body>
// //                 </Card>
// //               </Col>
// //             ))}
// //           </Row>

// //           <Modal show={showModal} onHide={closeModal} size="lg" centered>
// //             <Modal.Header closeButton style={{ backgroundColor: '#921A40', borderBottom: 'none' }}>
// //               <Modal.Title style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>Confirm Payment</Modal.Title>
// //             </Modal.Header>
// //             <Modal.Body style={{ backgroundColor: '#C75B7A', color: 'white' }}>
// //               {selectedPlan && (
// //                 <ConfirmPaymentplan
// //                   planId={selectedPlan._id}
// //                   planType={selectedPlan.planType}
// //                   planAmount={selectedPlan.planAmount}
// //                   onClose={closeModal}
// //                 />
// //               )}
// //             </Modal.Body>
// //           </Modal>
// //         </Container>
// //       </section>

// //       <ToastContainer />
// //     </>
// //   );
// // };

// // export default Plans;
