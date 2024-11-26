
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
// import './FAQ.css'; // Import the CSS file for styles

const FAQ = () => {
  return (
    <section id="faq" className="faq-section section full-screen bg-light">
      <Container>
      <h2 className="display-5 mb-3 cheading">
      Frequently <span>Asked </span> Questions
            </h2>
       
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="accordion-item">
            <Accordion.Header>What is AIZBOARD?</Accordion.Header>
            <Accordion.Body className="accordion-body">
              AIZBOARD is a trusted platform for home repairs and property management.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="accordion-item">
            <Accordion.Header>Are service providers reliable?</Accordion.Header>
            <Accordion.Body className="accordion-body">
              Yes, all providers are licensed and fully qualified.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="accordion-item">
            <Accordion.Header>How do I book a service?</Accordion.Header>
            <Accordion.Body className="accordion-body">
              You can easily book a service through our website or mobile app by selecting the service you need and choosing a convenient time.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="accordion-item">
            <Accordion.Header>What types of services are offered?</Accordion.Header>
            <Accordion.Body className="accordion-body">
              We offer a wide range of services, including plumbing, electrical work, cleaning, and general home repairs.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className="accordion-item">
            <Accordion.Header>How can I contact customer support?</Accordion.Header>
            <Accordion.Body className="accordion-body">
              You can reach our customer support team via email or through the contact form on our website. We're here to help!
            </Accordion.Body>
          </Accordion.Item>
         
        </Accordion>
      </Container>
    </section>
  );
};

export default FAQ;
// import React from 'react';
// import { Container, Accordion, Card } from 'react-bootstrap';
// import { BsQuestionCircle, BsChevronDown } from 'react-icons/bs';

// const FAQ = () => {
//   const faqItems = [
//     {
//       question: "What is AIZBOARD?",
//       answer: "AIZBOARD is a trusted platform for home repairs and property management."
//     },
//     {
//       question: "Are service providers reliable?",
//       answer: "Yes, all providers are licensed and fully qualified."
//     },
//     {
//       question: "How do I book a service?",
//       answer: "You can easily book a service through our website or mobile app by selecting the service you need and choosing a convenient time."
//     },
//     {
//       question: "What types of services are offered?",
//       answer: "We offer a wide range of services, including plumbing, electrical work, cleaning, and general home repairs."
//     },
//     {
//       question: "How can I contact customer support?",
//       answer: "You can reach our customer support team via email or through the contact form on our website. We're here to help!"
//     }
//   ];

//   return (
//     <section id="faq" className="py-5" style={{ background: 'linear-gradient(135deg, #921A40 0%, #C75B7A 50%, #D9ABAB 100%)' }}>
//       <Container>
//         <h2 className="text-center mb-5" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '2.5rem'}}>
//           <BsQuestionCircle className="me-3" />
//           Frequently Asked Questions
//         </h2>
//         <Accordion defaultActiveKey="0" className="shadow-lg">
//           {faqItems.map((item, index) => (
//             <Accordion.Item key={index} eventKey={index.toString()}>
//               <Accordion.Header>
//                 <Card.Body className="d-flex justify-content-between align-items-center w-100 py-3">
//                   <span style={{ color: '#921A40', fontWeight: 'bold' }}>{item.question}</span>
//                   <BsChevronDown className="ms-2" style={{ color: '#C75B7A' }} />
//                 </Card.Body>
//               </Accordion.Header>
//               <Accordion.Body 
//                 style={{ 
//                   background: 'rgba(255, 255, 255, 0.1)', 
//                   backdropFilter: 'blur(10px)',
//                   color: 'black'
//                 }}
//               >
//                 {item.answer}
//               </Accordion.Body>
//             </Accordion.Item>
//           ))}
//         </Accordion>
//       </Container>
//     </section>
//   );
// };

// export default FAQ;