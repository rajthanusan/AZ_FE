import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/signup.css";

import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      const response = await fetch(
        "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Sign up successful! Please log in.");
        navigate("/login"); // Redirect to login after successful signup
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Sign up failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred while signing up.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to /login when "Already have an account? Login" is clicked
  };

  return (
    <section className="signup-page">
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <form className="signup-form" onSubmit={handleSignUp}>
            <h2>Create a New Account</h2>
            <p className="signup-subtitle">
              Quick & Simple way to Automate your payment
            </p>
            <div className="input-icon">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-icon">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-icon">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="signup-btn custom-button ">
              Create an Account
            </button>

            <p className="login-link" onClick={handleLoginClick}>
              Already have an account? Login
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUpPage;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaGoogle, FaFacebook } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../style/signup.css'; // Ensure to import your CSS file

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     agree: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (!formData.agree) {
//       toast.error('You must agree to the terms and conditions.');
//       return;
//     }

//     try {
//       const response = await fetch('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast.success('Account created successfully! Redirecting to login...');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       toast.error('Network error. Please check the console for more details.');
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-image">
//         <img src="https://i0.wp.com/shedblog.co.uk/wp-content/uploads/2014/10/FAIL_blc.gif?resize=500%2C384&ssl=1" alt="Sign Up" />
//       </div>
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSignUp}>
//           <h2>Create a New Account</h2>
//           <p>Quick & Simple way to Automate your payment</p>
//           <div className="input-icon">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-icon">
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-icon">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-icon">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-icon">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 name="agree"
//                 checked={formData.agree}
//                 onChange={handleChange}
//                 required
//               />
//               I agree to the Terms of Service and the Privacy Policy
//             </label>
//           </div>

//           <button type="submit" className="signup-button">
//             CREATE AN ACCOUNT
//           </button>
//           <div className="signup-footer">
//             <p>Already have an account? <Link to="/login" className="signup-link">Login here</Link></p>
//           </div>

//           <div className="social-buttons">
//             <button className="w-100">
//               <FaGoogle /> Sign up with Google
//             </button>
//             <button className="w-100 mt-2">
//               <FaFacebook /> Sign up with Facebook
//             </button>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

//try
// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../style/signup.css';
// import { FaGoogle, FaFacebook } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const SignUpPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNumber: '', // Added phone number
//     agree: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (!formData.agree) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }

//     try {
//       const response = await fetch('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast.success('Account created successfully! Redirecting to login...');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       toast.error('Network error. Please check the console for more details.');
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   return (
//     <section className="signup-page">
//       <div className="signup-container">
//         <div className="signup-form-wrapper">
//           <form className="signup-form" onSubmit={handleSignUp}>
//             <h2>Create a New Account</h2>
//             <p className="signup-subtitle">Quick & Simple way to Automate your payment</p>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Phone Number"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="checkbox-container">
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="agree"
//                   checked={formData.agree}
//                   onChange={handleChange}
//                   required
//                 />
//                 I agree to the Terms of Service and Privacy Policy
//               </label>
//             </div>

//             <button type="submit" className="signup-btn cs-button1">
//               Create an Account
//             </button>

//             <p className="login-link" onClick={handleLoginClick}>
//               Already have an account? Login
//             </p>
//           </form>
//         </div>
//         <ToastContainer />
//       </div>
//     </section>
//   );
// };

// export default SignUpPage;

// vedidation

// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../style/signup.css';
// import { useNavigate } from 'react-router-dom';

// const SignUpPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     agree: false,
//   });

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!formData.agree) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }

//     if (!validateEmail(formData.email)) {
//       toast.error('Invalid email address');
//       return;
//     }

//     if (!validatePhoneNumber(formData.phoneNumber)) {
//       toast.error('Phone number must contain exactly 10 digits');
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       toast.error(
//         'Password must be at least 7 characters long, include one capital letter and one special character'
//       );
//       return;
//     }

//     try {
//       const response = await fetch('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast.success('Account created successfully! Redirecting to login...');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       toast.error('Network error. Please check the console for more details.');
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   return (
//     <section className="signup-page">
//       <div className="signup-container">
//         <div className="signup-form-wrapper">
//           <form className="signup-form" onSubmit={handleSignUp}>
//             <h2>Create a New Account</h2>
//             <p className="signup-subtitle">Quick & Simple way to Automate your payment</p>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Phone Number"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-icon">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="checkbox-container">
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="agree"
//                   checked={formData.agree}
//                   onChange={handleChange}
//                   required
//                 />
//                 I agree to the Terms of Service and Privacy Policy
//               </label>
//             </div>

//             <button type="submit" className="signup-btn cs-button1">
//               Create an Account
//             </button>

//             <p className="login-link" onClick={handleLoginClick}>
//               Already have an account? Login
//             </p>
//           </form>
//         </div>
//         <ToastContainer />
//       </div>
//     </section>
//   );
// };

// export default SignUpPage;
