import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CustomNavbar from './components/pages/Navbar';
import HeroSection from './components/pages/HeroSection';
import Plans from './components/pages/Plans';
import Services from './components/pages/Services';
import FAQ from './components/pages/FAQ';
import Footer from './components/pages/Footer';
import Login from './components/pages/LoginPage';
import SignupForm from './components/pages/SignUpPage';
import UserDashboard from './components/panal/User';
import AdminDashboard from './components/panal/Admin';
import ConfirmPayment from './components/pages/ConfirmPayment';
import ConfirmPayment1 from './components/pages/ConfirmPaymentplan';
import Card from './components/pages/Card';
import RoomDesign from './components/pages/RoomDesign';
import CusRoom from './components/pages/CustomizeRoomSection';

import Servicesection from './components/pages/ServicesSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './ScrollToTop'
import './App.css';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('username') || null);
  const [isAdmin, setIsAdmin] = useState(() => {
    const role = localStorage.getItem('role'); // Assuming you store role in localStorage
    return role === 'admin'; // Check if the role is 'admin'
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (username, role) => {
    setUser(username);
    setIsAdmin(role === 'admin'); // Update isAdmin based on the role
    localStorage.setItem('username', username);
    localStorage.setItem('role', role); // Save role in localStorage
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false); // Reset isAdmin on logout
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="app-container">
      {/* <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /> */}
      <ScrollToTop/>
      <Routes>
      <Route path="/" element={<><CustomNavbar/><HeroSection /><CusRoom/><Plans /><Services /><FAQ /><Servicesection/><Footer /></>} />
        <Route path="/CusRoom" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><CusRoom /><Footer /></>} />
        <Route path="/Services" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><Services /><Footer /></>} />
        <Route path="/FAQ" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><FAQ /><Footer /></>} />
        <Route path="/Servicesection" element={<><CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><Servicesection /><Footer /></>} />
        <Route path="/plans" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><Plans /><Footer /></>} />
        <Route path="/room-design" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><RoomDesign /><Footer /></>} />
        <Route path="/user-dashboard" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><UserDashboard /><Footer /></>} />
        <Route path="/confirm-payment" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><ConfirmPayment /><Footer /></>} />
        <Route path="/confirm-payment1" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><ConfirmPayment1 /><Footer /></>} />

    
        <Route path="/login" element={<><CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><Login onLogin={handleLogin} /><Footer /></>} />
        <Route path="/signup" element={<><CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><SignupForm /><Footer /></>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/card" element={<> <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} /><Card /><Footer /></>} />
        
      </Routes>
     
    </div>
  );
}

// Wrap App component in Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import CustomNavbar from './components/pages/Navbar';
// import HeroSection from './components/pages/HeroSection';
// import Plans from './components/pages/Plans';
// import Services from './components/pages/Services';
// import FAQ from './components/pages/FAQ';
// import Footer from './components/pages/Footer';
// import Login from './components/pages/LoginPage';
// import SignupForm from './components/pages/SignUpPage';
// import UserDashboard from './components/panal/User';
// import AdminDashboard from './components/panal/Admin';
// import ConfirmPayment from './components/pages/ConfirmPayment';
// import ConfirmPayment1 from './components/pages/ConfirmPaymentplan';
// import Card from './components/pages/Card';
// import Room from './components/pages/RoomDesign';
// import CusRoom from './components/pages/CustomizeRoomSection';
// import Chatbot from './components/pages/Chatbot';
// import Servicesection from './components/pages/ServicesSection';
// import ScrollToTop from './ScrollToTop';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// function App() {
//   const [user, setUser] = useState(() => localStorage.getItem('username') || null);
//   const [isAdmin, setIsAdmin] = useState(() => {
//     const role = localStorage.getItem('role'); // Assuming you store role in localStorage
//     return role === 'admin'; // Check if the role is 'admin'
//   });

//   const navigate = useNavigate(); // Initialize navigate

//   const handleLogin = (username, role) => {
//     setUser(username);
//     setIsAdmin(role === 'admin'); // Update isAdmin based on the role
//     localStorage.setItem('username', username);
//     localStorage.setItem('role', role); // Save role in localStorage
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setIsAdmin(false); // Reset isAdmin on logout
//     localStorage.removeItem('username');
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/'); // Redirect to home page after logout
//   };

//   return (
//     <div className="app-container">
//       <CustomNavbar user={user} onLogout={handleLogout} isAdmin={isAdmin} />
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<><HeroSection /><CusRoom/><Plans /><Services /><FAQ /><Servicesection/></>} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/confirm-payment" element={<ConfirmPayment />} />
//         <Route path="/confirm-payment1" element={<ConfirmPayment1 />} />
//         <Route path="/card" element={<Card />} />
//         <Route path="/room-design" element={<Room />} />
//         <Route path="/plans" element={<Plans />} />
        
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// // Wrap App component in Router
// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWrapper;
