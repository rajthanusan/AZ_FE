// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Form, Table, Pagination } from 'react-bootstrap';
// import axios from 'axios';

// const AdminServices = () => {
//   const [services, setServices] = useState([]);
//   const [formData, setFormData] = useState({
//     serviceName: '',
//     serviceDescription: '',
//     serviceAmountPerHour: '',
//     serviceImage: null,
//   });
//   const [editingServiceId, setEditingServiceId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const servicesPerPage = 3;

//   // Fetch services on component mount
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       serviceImage: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append('serviceName', formData.serviceName);
//     formDataToSend.append('serviceDescription', formData.serviceDescription);
//     formDataToSend.append('serviceAmountPerHour', formData.serviceAmountPerHour);

//     if (formData.serviceImage) {
//       formDataToSend.append('serviceImage', formData.serviceImage);
//     }

//     try {
//       if (editingServiceId) {
//         // Update service
//         await axios.put(`http://localhost:5000/api/services/${editingServiceId}`, formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       } else {
//         // Create new service
//         await axios.post('http://localhost:5000/api/services', formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//       }
      
//       // Clear the form after submission
//       setFormData({ serviceName: '', serviceDescription: '', serviceAmountPerHour: '', serviceImage: null });
//       setEditingServiceId(null);
//       fetchServices();
//     } catch (error) {
//       console.error('Error submitting service:', error);
//     }
//   };

//   const handleEdit = (service) => {
//     setEditingServiceId(service._id);
//     setFormData({
//       serviceName: service.serviceName,
//       serviceDescription: service.serviceDescription,
//       serviceAmountPerHour: service.serviceAmountPerHour,
//       serviceImage: null
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/services/${id}`);
//       fetchServices();
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };

//   // Pagination logic
//   const indexOfLastService = currentPage * servicesPerPage;
//   const indexOfFirstService = indexOfLastService - servicesPerPage;
//   const currentServices = services.slice(indexOfFirstService, indexOfLastService);
//   const totalPages = Math.ceil(services.length / servicesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <section id="services" className="py-4">
//       <Container fluid>
//       <h2 className="display-5 mb-3 cheading">
//           Manage <span>Services</span> 
//         </h2>
       

//         {/* Form for adding or editing services */}
//         <Row>
//   <Col md={12} className="mx-auto">
//     <Card className="p-3 shadow-lg mb-4">
//               <h4>{editingServiceId ? 'Edit Service' : 'Add New Service'}</h4>
//               <Form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <Form.Group>
//                   <Form.Label>Service Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="serviceName"
//                     value={formData.serviceName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Service Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="serviceDescription"
//                     value={formData.serviceDescription}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Amount Per Hour ($)</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="serviceAmountPerHour"
//                     value={formData.serviceAmountPerHour}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Service Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="serviceImage"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </Form.Group>
//                 <br/>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>

//                 <Button variant="primary" type="submit" className='custom-button '>
//                   {editingServiceId ? 'Update Service' : 'Add Service'}
//                 </Button>
//                 </div>
//               </Form>
//             </Card>
//           </Col>
//         </Row>

//         {/* Table to display all services */}
//         <Card className="shadow-lg border-0">
//           <Card.Body>
//             <Table striped bordered hover responsive>
//               <thead style={{ backgroundColor: '#8f2347', color: 'white' }}>
//                 <tr>
//                   <th>Service Name</th>
//                   <th>Description</th>
//                   <th>Amount Per Hour ($)</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentServices.map((service) => (
//                   <tr key={service._id}>
//                     <td>{service.serviceName}</td>
//                     <td>{service.serviceDescription}</td>
//                     <td>{service.serviceAmountPerHour}</td>
//                     <td>
//                       {service.serviceImage && (
//                         <img
//                           src={`http://localhost:5000/uploads/${service.serviceImage}`}
//                           alt={service.serviceName}
//                           width="50"
//                         />
//                       )}
//                     </td>
//                     <td>
//                       <Button
//                         variant="danger"
//                           className="flex-fill mx-1"
//                         style={{
//                           backgroundColor: '#e63946',
//                           borderColor: '#e63946',
//                           borderRadius: '5px',
//                         }}
//                          onClick={() => handleEdit(service)}
//                       >
//                         Edit
//                       </Button>
//                       <Button   variant="danger"
//                         className="flex-fill mx-1"
//   style={{
//     backgroundColor: '#e63946',
//     borderColor: '#e63946',
//     borderRadius: '5px',
//   }}  onClick={() => handleDelete(service._id)}>
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <Pagination className="justify-content-center mt-3">
//                 <Pagination.First
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(1)}
//                 />
//                 <Pagination.Prev
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 />
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Pagination.Item
//                     key={i + 1}
//                     active={i + 1 === currentPage}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 />
//                 <Pagination.Last
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(totalPages)}
//                 />
//               </Pagination>
//             )}
//           </Card.Body>
//         </Card>
        
//       </Container>
//     </section>
//   );
// };

// export default AdminServices;

import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Table, Pagination, Modal } from 'react-bootstrap';
import axios from 'axios';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    serviceAmountPerHour: '',
    serviceImage: null,
  });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const servicesPerPage = 3;

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      serviceImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('serviceName', formData.serviceName);
    formDataToSend.append('serviceDescription', formData.serviceDescription);
    formDataToSend.append('serviceAmountPerHour', formData.serviceAmountPerHour);

    if (formData.serviceImage) {
      formDataToSend.append('serviceImage', formData.serviceImage);
    }

    try {
      if (editingServiceId) {
        // Update service
        await axios.put(`http://localhost:5000/api/services/${editingServiceId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new service
        await axios.post('http://localhost:5000/api/services', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      // Clear the form after submission
      setFormData({ serviceName: '', serviceDescription: '', serviceAmountPerHour: '', serviceImage: null });
      setEditingServiceId(null);
      fetchServices();
      setShowModal(false); // Close the modal after submit
    } catch (error) {
      console.error('Error submitting service:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingServiceId(service._id);
    setFormData({
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      serviceAmountPerHour: service.serviceAmountPerHour,
      serviceImage: null
    });
    setShowModal(true); // Show the modal when editing a service
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="services" className="py-4">
      <Container fluid>
        <h2 className="display-5 mb-3 cheading">
          Manage <span>Services</span> 
        </h2>

        {/* Button to trigger modal for adding a new service */}
        <Button variant="primary" onClick={() => setShowModal(true)}  className='custom-button mt-3'>
          Add New Service
        </Button>
        
            

        {/* Modal for adding or editing services */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editingServiceId ? 'Edit Service' : 'Add New Service'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group>
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount Per Hour ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="serviceAmountPerHour"
                  value={formData.serviceAmountPerHour}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Service Image</Form.Label>
                <Form.Control
                  type="file"
                  name="serviceImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <br/>
              <Button variant="primary" type="submit" className='custom-button '>
                {editingServiceId ? 'Update Service' : 'Add Service'}
              </Button>
              <br/>
            </Form>
          </Modal.Body>
        </Modal>
        

        {/* Table to display all services */}
        <Card className="shadow-lg border-0">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#8f2347', color: 'white' }}>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Amount Per Hour ($)</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service) => (
                  <tr key={service._id}>
                    <td>{service.serviceName}</td>
                    <td>{service.serviceDescription}</td>
                    <td>{service.serviceAmountPerHour}</td>
                    <td>
                      {service.serviceImage && (
                        <img
                          src={`http://localhost:5000/uploads/${service.serviceImage}`}
                          alt={service.serviceName}
                          width="50"
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="flex-fill mx-1"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="flex-fill mx-1"
                        onClick={() => handleDelete(service._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-3">
                <Pagination.First
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                />
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
                <Pagination.Last
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                />
              </Pagination>
            )}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default AdminServices;
