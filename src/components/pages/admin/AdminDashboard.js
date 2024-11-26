import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingServices, setBookingServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          bookingData,
          bookingServiceData,
          userData,
          packageData,
          serviceData,
        ] = await Promise.all([
          axios.get(
            "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookings"
          ),
          axios.get(
            "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookingservice"
          ),
          axios.get(
            "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users"
          ),
          axios.get(
            "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/service-plans"
          ),
          axios.get(
            "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/services"
          ),
        ]);

        setBookings(bookingData.data);
        setBookingServices(bookingServiceData.data);
        setUsers(userData.data);
        setPackages(packageData.data);
        setServices(serviceData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Dashboard...</p>
      </Container>
    );
  }

  // Data for Charts
  const barChartData = {
    labels: [
      "Users",
      "Packages",
      "Services",
      "Package Bookings",
      "Service Bookings",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          users.length,
          packages.length,
          services.length,
          bookings.length,
          bookingServices.length,
        ],
        backgroundColor: [
          "#8f2347",
          "#D98E73",
          "#C7596B",
          "#8F5C47",
          "#73D9C7",
        ],
        borderColor: ["#8f2347", "#D98E73", "#C7596B", "#8F5C47", "#73D9C7"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Packages", "Services"],
    datasets: [
      {
        label: "Distribution",
        data: [packages.length, services.length],
        backgroundColor: ["#8f2347", "#D98E73", "#C7596B"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <section id="admin-dashboard" className="py-4">
      <Container>
        <h2 className="display-5 mb-3 cheading">
          Admin <span>Dashboard </span>
        </h2>

        <Row className="mb-4">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Total Users</h5>
                <p className="display-6">{users.length}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Total Packages</h5>
                <p className="display-6">{packages.length}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Total Services</h5>
                <p className="display-6">{services.length}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Total Package Bookings</h5>
                <p className="display-6">{bookings.length}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Total Service Bookings</h5>
                <p className="display-6">{bookingServices.length}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Overview Chart</h5>
                <div style={{ height: "300px" }}>
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h5>Distribution Pie Chart</h5>
                <div style={{ height: "300px" }}>
                  <Pie data={pieChartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminDashboard;
