import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Pagination,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    planType: "",
    planDescription: "",
    planAmount: "",
  });
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 2; // Display 2 plans per page

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPlanId) {
      await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/service-plans/${editingPlanId}`,
        formData
      );
    } else {
      await axios.post(
        "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/service-plans",
        formData
      );
    }
    setFormData({ planType: "", planDescription: "", planAmount: "" });
    setEditingPlanId(null);
    fetchPlans();
  };

  const handleEdit = (plan) => {
    setEditingPlanId(plan._id);
    setFormData({
      planType: plan.planType,
      planDescription: plan.planDescription,
      planAmount: plan.planAmount,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/service-plans/${id}`
      );
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(plans.length / plansPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="plans" className="py-4">
      <Container>
        <h2 className="display-5 mb-3 cheading">
          Manage <span>Service</span> Plans
        </h2>

        {/* Form for adding or editing service plans */}
        <Row>
          <Col md={12} className="mx-auto">
            <Card className="p-4 shadow-lg mb-4">
              <h4>{editingPlanId ? "Edit Plan" : "Add New Plan"}</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Plan Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="planType"
                    value={formData.planType}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Plan Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="planDescription"
                    value={formData.planDescription}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Plan Amount ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="planAmount"
                    value={formData.planAmount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className="custom-button"
                  >
                    {editingPlanId ? "Update Plan" : "Add Plan"}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
        {/* Table to display all service plans */}
        <Card className="shadow-lg border-0">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "#8f2347", color: "white" }}>
                <tr>
                  <th>Plan Type</th>
                  <th>Description</th>
                  <th>Amount ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.planType}</td>
                    <td>{plan.planDescription}</td>
                    <td>{plan.planAmount}</td>
                    <td>
                      <ButtonGroup className="w-100" aria-label="Actions">
                        <Button
                          variant="danger"
                          className="flex-fill mx-1"
                          style={{
                            backgroundColor: "#e63946",
                            borderColor: "#e63946",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleEdit(plan)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="flex-fill mx-1"
                          style={{
                            backgroundColor: "#e63946",
                            borderColor: "#e63946",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleDelete(plan._id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
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
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default AdminPlans;
