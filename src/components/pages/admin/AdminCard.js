import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Pagination,
  Modal,
  Card,
} from "react-bootstrap";
import axios from "axios";

const AdminCard = () => {
  const [serviceBookings, setServiceBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const BASE_URL = "https://az-be-nine.vercel.app/uploads/";
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchServiceBookings();
  }, []);

  const fetchServiceBookings = async () => {
    try {
      const response = await axios.get(
        "https://az-be-nine.vercel.app/api/bookings"
      );
      setServiceBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = serviceBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(serviceBookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://az-be-nine.vercel.app/api/bookings/${id}`);
      fetchServiceBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  return (
    <section id="bookings" className="py-4">
      <Container>
        <h2 className="display-5 mb-3 cheading">
          Manage <span>Plans </span> Bookings
        </h2>

        <Row>
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead style={{ backgroundColor: "#8f2347", color: "white" }}>
                    <tr>
                      <th>Plan Name</th>
                      <th>Service Location</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Duration (months)</th>
                      <th>Total Amount ($)</th>
                      <th>Booked On</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.length > 0 ? (
                      currentBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking.planName}</td>
                          <td>{booking.planserviceLocation}</td>
                          <td>{booking.planuser}</td>
                          <td>{booking.planemail}</td>
                          <td>{booking.planduration}</td>
                          <td>
                            $
                            {booking.plantotalAmount !== undefined
                              ? booking.plantotalAmount.toFixed(2)
                              : "N/A"}
                          </td>
                          <td>
                            {new Date(booking.createdAt).toLocaleString()}
                          </td>
                          <td>
                            {booking.serviceImage ? (
                              <img
                                src={`${BASE_URL}${booking.serviceImage}`}
                                alt="Service Booking"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleImageClick(
                                    `${BASE_URL}${booking.serviceImage}`
                                  )
                                }
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              style={{
                                backgroundColor: "#e63946",
                                borderColor: "#e63946",
                                borderRadius: "5px",
                              }}
                              onClick={() => handleDeleteBooking(booking._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No bookings available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

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
                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
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
          </Col>
        </Row>
      </Container>

      {/* Modal for displaying the enlarged image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Service Booking Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Enlarged Service Booking"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default AdminCard;
