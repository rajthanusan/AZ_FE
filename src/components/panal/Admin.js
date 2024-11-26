import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faToolbox, faUser, faClipboardList, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import AdminUser from '../pages/admin/AdminUser';
import AdminPlans from '../pages/admin/AdminPlans';
import AdminCard from '../pages/admin/AdminCard';
import AdminCardService from '../pages/admin/AdminCardService';
import AdminServices from '../pages/admin/AdminServices';
import AdminDashboard from '../pages/admin/AdminDashboard';

import logo from '../Image/az01.png';

const Admin = ({ user, onLogout, handleCartClick }) => {
  const [activeComponent, setActiveComponent] = useState('AdminDashboard');

  const renderComponent = () => {
    switch(activeComponent) {
      case 'AdminDashboard':
        return <AdminDashboard />;
      case 'AdminCard':
        return <AdminCard />;
      case 'AdminCardService':
        return <AdminCardService />;
      case 'AdminUser':
        return <AdminUser />;
      case 'AdminPlans':
        return <AdminPlans />;
      case 'AdminServices':
        return <AdminServices />;
      default:
        return <AdminCard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Navigation Bar */}
      <div style={{
        width: '100%',
        background: '#863146',
        color: '#fff',
        fontSize: '22px',
        padding: '15px 30px',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
         <img
          src={logo}
          alt="AZBROAD"
          width="100"
          height="40"
          className="d-inline-block align-top"
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Button onClick={handleCartClick} variant="primary" className="ms-3 cs-button" style={{ backgroundColor: '#f6f0d8', color:'black',fontWeight:'900'}} >
                <FontAwesomeIcon icon={faCreditCard} className="cart-icon" style={{ fontSize: '22px', color: '#fff' }} />
              </Button>
              <Button onClick={onLogout} variant="primary" className="ms-3 cs-button" style={{ backgroundColor: '#f6f0d8', color:'black',fontWeight:'900'}}>
                {user} (Logout)
              </Button>
            </>
          ) : (
            <Button variant="primary" className="ms-3 cs-button" href="/login"  style={{ backgroundColor: '#f6f0d8', color:'black',fontWeight:'900'}}>
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        width: '250px',
        boxShadow:'0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px 15px',
        position: 'fixed',
        top: '50px',
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        color: '#8f2347',
        backgroundColor:'#fff',
      }}>
        <ul style={{ listStyleType: 'none', paddingTop: '15px' }}>
          {['AdminDashboard','AdminCard', 'AdminCardService', 'AdminUser', 'AdminPlans', 'AdminServices'].map((item, index) => (
            <li key={index} style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
             <a
  href="#home"
  onClick={() => setActiveComponent(item)}
  style={{
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#8f2347',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    padding: '5px 0',
  }}
>


                <FontAwesomeIcon icon={index === 0 ? faCreditCard : index === 1 ? faToolbox : index === 2 ? faUser : index === 3 ? faClipboardList : faCog} 
                                 color="#8f2347" style={{ marginRight: '10px' }} />
                {item.replace('Admin', '').replace(/([A-Z])/g, ' $1').trim()}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: '250px',
        padding: '20px 40px',
        flex: 1,
        overflowY: 'auto',
        marginTop: '50px',
        paddingBottom: '70px', // Extra padding for footer space
        backgroundColor: '#f9f9f9',
      }}>
        {renderComponent()}
      </div>

      {/* Fixed Footer */}
      <footer style={{
        background: '#8f2347',
        color: 'white',
        textAlign: 'center',
        padding: '15px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #ccc',
        zIndex: 999,
        fontSize: '14px',
      }}>
        © 2024 AZBOARD
      </footer>
    </div>
  );
};

export default Admin;
