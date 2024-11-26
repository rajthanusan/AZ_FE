import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Pagination, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminCardService = () => {
  const [serviceBookings, setServiceBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5; // You can adjust this number as needed.

  useEffect(() => {
    fetchServiceBookings();
  }, []);

  const fetchServiceBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookingservice');
      setServiceBookings(response.data);
    } catch (error) {
      console.error('Error fetching service bookings:', error);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = serviceBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(serviceBookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookingservice/${id}`);
      fetchServiceBookings(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting service booking:', error);
    }
  };

  // Dynamic page range logic
  const pageRange = 2; // Number of pages to show around the current page
  let startPage = Math.max(1, currentPage - pageRange);
  let endPage = Math.min(totalPages, currentPage + pageRange);

  if (currentPage - pageRange <= 1) {
    startPage = 1;
  }

  if (currentPage + pageRange >= totalPages) {
    endPage = totalPages;
  }

  return (
    <section
      id="admin-service-bookings" 
      className="py-4"
     
    >
      <Container>
        <h2 className="display-5 mb-3 cheading">
          Manage <span>Service</span> Bookings
        </h2>

        <Card className="shadow-lg border-0">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: '#8f2347', color: 'white' }}>
                <tr>
                  <th>Plan Name</th>
                  <th>Service Location</th>
                  <th>Hours</th>
                  <th>Email</th>
                  <th>Total Amount ($)</th>
                  <th>Booked On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.planName}</td>
                    <td>{booking.serviceLocation}</td>
                    <td>{booking.hours}</td>
                    <td>{booking.email}</td>
                    <td>${booking.totalAmount !== undefined ? booking.totalAmount.toFixed(2) : 'N/A'}</td>
                    <td>{new Date(booking.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteBooking(booking._id)}
                        style={{
                          backgroundColor: '#e63946',
                          borderColor: '#e63946',
                          borderRadius: '5px',
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

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
            {/* Show range of page numbers */}
            {[...Array(totalPages).keys()].map((number) => (
              (number + 1 >= startPage && number + 1 <= endPage) ? (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ) : null
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
      </Container>
    </section>
  );
};

export default AdminCardService;
