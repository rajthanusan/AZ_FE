import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Pagination,
  Card,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3); // Show 3 users per page
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "DELETE",
        });
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, role } = e.target.elements;

    try {
      await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          role: role.value,
        }),
      });
      toast.success("User updated successfully");
      fetchUsers();
      handleModalClose();
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages and page range logic
  const totalPages = Math.ceil(users.length / usersPerPage);
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
    <section id="admin-user" className="py-4">
      <Container>
        <h2 className="display-5 mb-3 cheading">
          User <span>Management</span>
        </h2>

        {/* Display the total number of users with role 'user' */}

        <div className="table-container">
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead style={{ backgroundColor: "#8f2347", color: "white" }}>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{indexOfFirstUser + index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button
                          variant="danger"
                          style={{
                            backgroundColor: "#e63946",
                            borderColor: "#e63946",
                            borderRadius: "5px",
                            marginRight: "10px", // Add space to the right of the first button
                          }}
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          style={{
                            backgroundColor: "#e63946",
                            borderColor: "#e63946",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleDelete(user._id)}
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
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => paginate(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            />
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <Pagination.Item
                key={startPage + index}
                active={startPage + index === currentPage}
                onClick={() => paginate(startPage + index)}
              >
                {startPage + index}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            />
            <Pagination.Last
              disabled={currentPage === totalPages}
              onClick={() => paginate(totalPages)}
            />
          </Pagination>
        )}

        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <Form onSubmit={handleUpdateUser}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedUser.firstName}
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedUser.lastName}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={selectedUser.email}
                  />
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control as="select" defaultValue={selectedUser.role}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "black" }}
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Toast Container */}
        <ToastContainer />
      </Container>
    </section>
  );
};

export default AdminUser;
