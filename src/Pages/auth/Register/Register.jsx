// import React from "react";
// import "./Register.scss";
// import AuthSlideImg1 from "../../../assets/images/AuthSlideImg1.jpg";
// // import AuthSlideImg2 from "../../../assets/images/AuthSlideImg2.jpg";
// // import AuthSlideImg3 from "../../../assets/images/AuthSlideImg3.jpg";
// // import AuthSlideImg4 from "../../../assets/images/AuthSlideImg4.jpg";
// import Logo from "../../../assets/images/WholesaleLogo.png";
// import { Link } from "react-router-dom";

// export const Register = () => {
//   return (
//     <div className="Login__mainWrapper">
//       <div className="loginPage__leftWrapper">
//         <div className="mainFormWrapper">
//           <div className="logoWrapper">
//             <img src={Logo} alt="logo" />
//           </div>

//           <form className="login__from">
//             <div className="fieldsWrapper">
//               <div className="inputWrapper">
//                 <label>Full Name</label>
//                 <input placeholder="Enter full name..." type="text" />
//               </div>
//               <div className="inputWrapper">
//                 <label>Email</label>
//                 <input placeholder="Enter email..." type="email" />
//               </div>
//             </div>
//             <div className="fieldsWrapper">
//               <div className="inputWrapper">
//                 <label>Phone Number</label>
//                 <input placeholder="Enter number..." type="number" />
//               </div>
//               <div className="inputWrapper">
//                 <label>Select Business Type</label>
//                 <select>
//                   <option value="">-- Select Type --</option>
//                   <option value="wholesaler"> Wholesaler</option>
//                   <option value="retailer"> Retailer</option>
//                 </select>
//               </div>
//             </div>

//             <div className="inputWrapper">
//               <label>Password</label>
//               <input placeholder="Enter password..." type="password" />
//             </div>

//             <button>Register Now</button>

//             <div className="forgetAndRegisterlinkWrapper">
//               <p>
//                 Already have an account? <Link to='/auth/login'>Log in</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="loginPage__rightWrapper">
//         <img src={AuthSlideImg1} alt="bg" />
//       </div>
//     </div>
//   );
// };





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AuthSlideImg1 from '../../../assets/images/AuthSlideImg1.jpg';
// import Logo from '../../../assets/images/WholesaleLogo.png';
// import Cookies from "js-cookie";

// export const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: 'wholesaler',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//     setSuccess('');
//   };

//   const handleToggle = (selectedRole) => {
//     setFormData({
//       ...formData,
//       role: selectedRole,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5555/api/auth/register', formData);
//       const tokenKey = `${formData.role}Token`;
//       Cookies.set(tokenKey, response.data.token);
//       setSuccess('Registration successful! Redirecting...');
//       // const redirectPath = `/${formData.role}/dashboard`;
//        const redirectPath = `/`;
//       setTimeout(() => navigate(redirectPath), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const styles = {
//     mainWrapper: {
//       display: 'flex',
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     },
//     leftWrapper: {
//       flex: 1,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '2rem',
//       position: 'relative',
//       background: 'rgba(255, 255, 255, 0.05)',
//       backdropFilter: 'blur(10px)',
//     },
//     rightWrapper: {
//       flex: 1,
//       position: 'relative',
//       overflow: 'hidden',
//       display: 'none',
//       '@media (min-width: 768px)': {
//         display: 'block',
//       },
//     },
//     rightWrapperImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       objectPosition: 'center',
//     },
//     formContainer: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       backdropFilter: 'blur(20px)',
//       borderRadius: '24px',
//       padding: '3rem',
//       width: '100%',
//       maxWidth: '500px',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(255, 255, 255, 0.2)',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     formContainerBefore: {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
//       backgroundSize: '200% 100%',
//       animation: 'gradient 3s ease infinite',
//     },
//     logoWrapper: {
//       textAlign: 'center',
//       marginBottom: '2rem',
//     },
//     logo: {
//       maxWidth: '150px',
//       height: 'auto',
//       filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1.5rem',
//     },
//     fieldsRow: {
//       display: 'grid',
//       gridTemplateColumns: '1fr',
//       gap: '1.5rem',
//       '@media (min-width: 640px)': {
//         gridTemplateColumns: '1fr 1fr',
//       },
//     },
//     inputWrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.5rem',
//     },
//     label: {
//       fontSize: '0.875rem',
//       fontWeight: '600',
//       color: '#374151',
//       marginBottom: '0.25rem',
//     },
//     input: {
//       padding: '0.875rem 1rem',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       background: '#ffffff',
//       outline: 'none',
//       fontFamily: 'inherit',
//       '::placeholder': {
//         color: '#9ca3af',
//       },
//       ':focus': {
//         borderColor: '#667eea',
//         boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
//         transform: 'translateY(-1px)',
//       },
//       ':hover': {
//         borderColor: '#d1d5db',
//       },
//     },
//     toggleWrapper: {
//       display: 'flex',
//       background: '#f3f4f6',
//       borderRadius: '12px',
//       padding: '0.25rem',
//       position: 'relative',
//       border: '2px solid #e5e7eb',
//       transition: 'border-color 0.3s ease',
//     },
//     toggleOption: {
//       flex: 1,
//       textAlign: 'center',
//       padding: '0.75rem 0.5rem',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       borderRadius: '8px',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       zIndex: 2,
//       color: '#6b7280',
//     },
//     toggleOptionActive: {
//       color: '#ffffff',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//       transform: 'translateY(-1px)',
//     },
//     submitButton: {
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '0.875rem 1.5rem',
//       fontSize: '1rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden',
//       fontFamily: 'inherit',
//       marginTop: '0.5rem',
//       ':hover': {
//         transform: 'translateY(-2px)',
//         boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
//       },
//       ':active': {
//         transform: 'translateY(0)',
//       },
//       ':disabled': {
//         opacity: 0.7,
//         cursor: 'not-allowed',
//         transform: 'none',
//       },
//     },
//     linkWrapper: {
//       textAlign: 'center',
//       marginTop: '1rem',
//     },
//     linkText: {
//       color: '#6b7280',
//       fontSize: '0.875rem',
//     },
//     link: {
//       color: '#667eea',
//       textDecoration: 'none',
//       fontWeight: '600',
//       transition: 'color 0.3s ease',
//       ':hover': {
//         color: '#764ba2',
//         textDecoration: 'underline',
//       },
//     },
//     messageBase: {
//       padding: '0.75rem 1rem',
//       borderRadius: '8px',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       textAlign: 'center',
//       animation: 'slideIn 0.3s ease-out',
//     },
//     errorMessage: {
//       background: '#fee2e2',
//       color: '#dc2626',
//       border: '1px solid #fecaca',
//     },
//     successMessage: {
//       background: '#d1fae5',
//       color: '#059669',
//       border: '1px solid #a7f3d0',
//     },
//     loadingSpinner: {
//       width: '20px',
//       height: '20px',
//       border: '2px solid transparent',
//       borderTop: '2px solid currentColor',
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite',
//       marginRight: '0.5rem',
//       display: 'inline-block',
//     },
//     '@media (max-width: 768px)': {
//       mainWrapper: {
//         flexDirection: 'column',
//       },
//       rightWrapper: {
//         display: 'none',
//       },
//       leftWrapper: {
//         padding: '1rem',
//       },
//       formContainer: {
//         padding: '2rem 1.5rem',
//         margin: '1rem',
//         borderRadius: '20px',
//       },
//       fieldsRow: {
//         gridTemplateColumns: '1fr',
//         gap: '1rem',
//       },
//     },
//     '@media (max-width: 480px)': {
//       formContainer: {
//         padding: '1.5rem 1rem',
//         margin: '0.5rem',
//       },
//       logo: {
//         maxWidth: '120px',
//       },
//     },
//   };

//   const cssAnimations = `
//     <style>
//       @keyframes gradient {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//       }
      
//       @keyframes slideIn {
//         from {
//           opacity: 0;
//           transform: translateY(-10px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
      
//       @keyframes spin {
//         to {
//           transform: rotate(360deg);
//         }
//       }
      
//       @media (min-width: 768px) {
//         .right-wrapper-show {
//           display: block !important;
//         }
//       }
//     </style>
//   `;

//   return (
//     <>
//       <div dangerouslySetInnerHTML={{ __html: cssAnimations }} />
//       <div style={styles.mainWrapper}>
//         <div style={styles.leftWrapper}>
//           <div style={styles.formContainer}>
//             <div style={styles.formContainerBefore}></div>
            
//             <div style={styles.logoWrapper}>
//               <img src={Logo} alt="logo" style={styles.logo} />
//             </div>

//             <form style={styles.form} onSubmit={handleSubmit}>
//               {error && (
//                 <div style={{...styles.messageBase, ...styles.errorMessage}}>
//                   {error}
//                 </div>
//               )}
//               {success && (
//                 <div style={{...styles.messageBase, ...styles.successMessage}}>
//                   {success}
//                 </div>
//               )}

//               <div style={styles.fieldsRow}>
//                 <div style={styles.inputWrapper}>
//                   <label style={styles.label}>Full Name</label>
//                   <input
//                     style={styles.input}
//                     placeholder="Enter your full name"
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div style={styles.inputWrapper}>
//                   <label style={styles.label}>Email Address</label>
//                   <input
//                     style={styles.input}
//                     placeholder="Enter your email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div style={styles.fieldsRow}>
//                 <div style={styles.inputWrapper}>
//                   <label style={styles.label}>Phone Number</label>
//                   <input
//                     style={styles.input}
//                     placeholder="Enter your phone number"
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     pattern="\d{10}"
//                     required
//                   />
//                 </div>
//                 <div style={styles.inputWrapper}>
//                   <label style={styles.label}>Account Type</label>
//                   <div style={styles.toggleWrapper}>
//                     {['wholesaler', 'retailer'].map((role) => (
//                       <span
//                         key={role}
//                         style={{
//                           ...styles.toggleOption,
//                           ...(formData.role === role ? styles.toggleOptionActive : {}),
//                         }}
//                         onClick={() => handleToggle(role)}
//                       >
//                         {role.charAt(0).toUpperCase() + role.slice(1)}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div style={styles.inputWrapper}>
//                 <label style={styles.label}>Password</label>
//                 <input
//                   style={styles.input}
//                   placeholder="Create a strong password"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength="6"
//                 />
//               </div>

//               <button 
//                 type="submit" 
//                 style={styles.submitButton}
//                 disabled={isLoading}
//               >
//                 {isLoading && <span style={styles.loadingSpinner}></span>}
//                 {isLoading ? 'Creating Account...' : 'Create Account'}
//               </button>

//               <div style={styles.linkWrapper}>
//                 <p style={styles.linkText}>
//                   Already have an account?{' '}
//                   <Link to="/auth/login" style={styles.link}>
//                     Sign in here
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div style={styles.rightWrapper} className="right-wrapper-show">
//           <img src={AuthSlideImg1} alt="Registration background" style={styles.rightWrapperImage} />
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../assets/images/WholesaleLogo.png';
import Cookies from "js-cookie";

// Modern AI Authentication SVG Component
const ModernAIAuthImage = () => (
  <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
      </linearGradient>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#5a67d8" />
      </linearGradient>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="shadow">
        <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="rgba(0,0,0,0.3)"/>
      </filter>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="800" height="800" fill="transparent"/>
    <g opacity="0.4">
      <circle cx="100" cy="100" r="60" fill="rgba(102,126,234,0.15)">
        <animate attributeName="cy" values="100;85;100" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="700" cy="150" r="40" fill="rgba(102,126,234,0.15)">
        <animate attributeName="cy" values="150;130;150" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.45;0.15" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="150" cy="450" r="50" fill="rgba(102,126,234,0.15)">
        <animate attributeName="cy" values="450;470;450" dur="7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="650" cy="500" r="35" fill="rgba(102,126,234,0.15)">
        <animate attributeName="cy" values="500;520;500" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g transform="translate(400, 400)">
      <g filter="url(#shadow)">
        <rect x="-150" y="-107" width="300" height="214" rx="20" ry="20" fill="url(#cardGradient)" opacity="0.95">
          <animate attributeName="y" values="-107;-112;-107" dur="4s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="translate(0, -50)">
        <circle r="30" fill="url(#iconGradient)" filter="url(#glow)">
          <animate attributeName="r" values="30;34;30" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-6" r="9.6" fill="white" opacity="0.9"/>
        <path d="M -14.4 9.6 Q -14.4 0 -9.6 0 L 9.6 0 Q 14.4 0 14.4 9.6 L 14.4 18 L -14.4 18 Z" fill="white" opacity="0.9"/>
      </g>
      <g transform="translate(0, 20)" opacity="0.7">
        <rect x="-80" y="-5" width="160" height="8" rx="4" fill="rgba(102, 126, 234, 0.3)">
          <animate attributeName="width" values="160;170;0" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="-80" y="10" width="120" height="8" rx="4" fill="rgba(118, 75, 162, 0.3)">
          <animate attributeName="width" values="120;130;120" dur="4s" repeatCount="indefinite"/>
        </rect>
        <rect x="-80" y="25" width="140" height="8" rx="4" fill="rgba(240, 147, 251, 0.3)">
          <animate attributeName="width" values="140;150;140" dur="3.5s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="translate(75, -36)">
        <rect x="-12" y="0" width="24" height="18" rx="3.6" fill="url(#lockGradient)" opacity="0.8"/>
        <path d="M -8.4 0 Q -8.4 -9.6 0 -9.6 Q 8.4 -9.6 8.4 0" stroke="url(#lockGradient)" strokeWidth="2.4" fill="none" opacity="0.8"/>
        <circle cx="0" cy="8.4" r="2.4" fill="white" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      <g transform="translate(-75, -36)">
        <circle r="14.4" fill="#10b981" opacity="0.9">
          <animate attributeName="r" values="14.4;18;14.4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M -6 0 L -2.4 3.6 L 6 -6" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <text x="0" y="150" textAnchor="middle" fill="#ffffff" fontSize="36" fontFamily="'Inter', sans-serif" fontWeight="600" opacity="0.9">
        Welcome to Wholesale
        <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite"/>
      </text>
    </g>
    <g opacity="0.6">
      <circle r="3" fill="#00d4ff">
        <animateMotion dur="8s" repeatCount="indefinite" path="M50,300 Q200,200 350,300 Q500,400 650,300 Q750,200 800,300"/>
        <animate attributeName="opacity" values="0;1;0" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle r="2" fill="#5a67d8">
        <animateMotion dur="10s" repeatCount="indefinite" path="M0,250 Q150,150 300,250 Q450,350 600,250 Q700,150 800,250"/>
        <animate attributeName="opacity" values="0;1;0" dur="10s" repeatCount="indefinite"/>
      </circle>
      <circle r="2.5" fill="#f093fb">
        <animateMotion dur="12s" repeatCount="indefinite" path="M50,350 Q200,450 350,350 Q500,250 650,350 Q750,450 800,350"/>
        <animate attributeName="opacity" values="0;1;0" dur="12s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g opacity="0.4">
      <path d="M200,200 Q400,100 600,200" stroke="url(#iconGradient)" strokeWidth="1" fill="none">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
      </path>
      <path d="M150,400 Q400,500 650,400" stroke="url(#lockGradient)" strokeWidth="1" fill="none">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite"/>
      </path>
    </g>
    <g opacity="0.05">
      <rect width="800" height="800" fill="url(#grid)"/>
    </g>
    <g opacity="0.3">
      <circle cx="80" cy="80" r="2" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="100" cy="60" r="1.5" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="720" cy="80" r="2" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="700" cy="60" r="1.5" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="520" r="2" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="720" cy="520" r="2" fill="white">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>
);

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'wholesaler',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;
    const passwordRegex = /^.{6,}$/;

    // if (!nameRegex.test(formData.name.trim())) {
    //   return 'Please enter a valid name (2-50 characters, letters and spaces only)';
    // }
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit phone number';
    }
    if (!passwordRegex.test(formData.password)) {
      return 'Password must be at least 6 characters long';
    }
    if (!['wholesaler', 'retailer'].includes(formData.role)) {
      return 'Invalid role selected';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format phone number to remove non-digits for validation
    if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData({ ...formData, [name]: formattedValue });
    setError('');
    setSuccess('');
  };

  const handleToggle = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5555/api/auth/register', {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''), // Ensure only digits are sent
      });

      const { role, token } = response.data;
      const tokenKey = `${role}Token`;
      Cookies.set(tokenKey, token, { expires: 30, secure: true, sameSite: 'Strict' });
      setSuccess('Registration successful! Redirecting...');
      const redirectPath = `/${role}/dashboard`;
      setTimeout(() => navigate(redirectPath), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    mainWrapper: {
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    leftWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
    },
    rightWrapper: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      '@media (max-width: 767px)': {
        display: 'none',
      },
    },
    rightWrapperImage: {
      width: '100%',
      height: '100%',
      maxWidth: '800px',
      maxHeight: '800px',
      objectFit: 'contain',
      display: 'block',
      margin: 'auto',
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '3rem',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden',
    },
    formContainerBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
      backgroundSize: '200% 100%',
      animation: 'gradient 3s ease infinite',
    },
    logoWrapper: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    logo: {
      maxWidth: '150px',
      height: 'auto',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    fieldsRow: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      '@media (min-width: 640px)': {
        gridTemplateColumns: '1fr 1fr',
      },
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.25rem',
    },
    input: {
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '0.9rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: '#ffffff',
      outline: 'none',
      fontFamily: 'inherit',
      '::placeholder': {
        color: '#9ca3af',
      },
      ':focus': {
        borderColor: '#667eea',
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        transform: 'translateY(-1px)',
      },
      ':hover': {
        borderColor: '#d1d5db',
      },
    },
    toggleWrapper: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '12px',
      padding: '0.25rem',
      position: 'relative',
      border: '2px solid #e5e7eb',
      transition: 'border-color 0.3s ease',
    },
    toggleOption: {
      flex: 1,
      textAlign: 'center',
      padding: '0.75rem 0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      zIndex: 2,
      color: '#6b7280',
    },
    toggleOptionActive: {
      color: '#ffffff',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
      transform: 'translateY(-1px)',
    },
    submitButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.875rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'inherit',
      marginTop: '0.5rem',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      },
      ':active': {
        transform: 'translateY(0)',
      },
      ':disabled': {
        opacity: 0.7,
        cursor: 'not-allowed',
        transform: 'none',
      },
    },
    linkWrapper: {
      textAlign: 'center',
      marginTop: '1rem',
    },
    linkText: {
      color: '#6b7280',
      fontSize: '0.875rem',
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      ':hover': {
        color: '#764ba2',
        textDecoration: 'underline',
      },
    },
    messageBase: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center',
      animation: 'slideIn 0.3s ease-out',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
    },
    errorMessage: {
      background: 'rgba(254, 226, 226, 0.95)',
      color: '#dc2626',
      border: '1px solid #fecaca',
    },
    successMessage: {
      background: 'rgba(209, 250, 229, 0.95)',
      color: '#059669',
      border: '1px solid #a7f3d0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
      ':before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #059669, #34d399, #059669)',
        backgroundSize: '200% 100%',
        animation: 'gradient 2s ease infinite',
      },
    },
    successIcon: {
      width: '20px',
      height: '20px',
      display: 'inline-block',
      position: 'relative',
    },
    loader: {
      width: '24px',
      height: '24px',
      display: 'inline-block',
      position: 'relative',
      marginRight: '0.5rem',
    },
    loaderDot: {
      position: 'absolute',
      width: '6px',
      height: '6px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      animation: 'pulse 1.5s ease-in-out infinite',
    },
  };

  const cssAnimations = `
    <style>
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      .loader-dot:nth-child(1) { top: 0; left: 9px; animation-delay: 0s; }
      .loader-dot:nth-child(2) { top: 9px; left: 18px; animation-delay: 0.3s; }
      .loader-dot:nth-child(3) { top: 18px; left: 9px; animation-delay: 0.6s; }
      .loader-dot:nth-child(4) { top: 9px; left: 0; animation-delay: 0.9s; }
      .right-wrapper-show svg {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 800px;
        display: block;
        margin: auto;
      }
      @media (min-width: 768px) {
        .right-wrapper-show {
          display: flex !important;
        }
      }
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: cssAnimations }} />
      <div style={styles.mainWrapper}>
        <div style={styles.leftWrapper}>
          <div style={styles.formContainer}>
            <div style={styles.formContainerBefore}></div>
            <div style={styles.logoWrapper}>
              <img src={Logo} alt="logo" style={styles.logo} />
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              {error && (
                <div style={{ ...styles.messageBase, ...styles.errorMessage }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ ...styles.messageBase, ...styles.successMessage }}>
                  <span style={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {success}
                </div>
              )}
              <div style={styles.fieldsRow}>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    style={styles.input}
                    placeholder="Enter your full name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    style={styles.input}
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={styles.fieldsRow}>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    style={styles.input}
                    placeholder="Enter your phone number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Account Type</label>
                  <div style={styles.toggleWrapper}>
                    {['wholesaler', 'retailer'].map((role) => (
                      <span
                        key={role}
                        style={{
                          ...styles.toggleOption,
                          ...(formData.role === role ? styles.toggleOptionActive : {}),
                        }}
                        onClick={() => handleToggle(role)}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  placeholder="Create a strong password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
              <button
                type="submit"
                style={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading && (
                  <span style={styles.loader}>
                    <span style={styles.loaderDot} className="loader-dot"></span>
                    <span style={styles.loaderDot} className="loader-dot"></span>
                    <span style={styles.loaderDot} className="loader-dot"></span>
                    <span style={styles.loaderDot} className="loader-dot"></span>
                  </span>
                )}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
              <div style={styles.linkWrapper}>
                <p style={styles.linkText}>
                  Already have an account?{' '}
                  <Link to="/auth/login" style={styles.link}>
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div style={styles.rightWrapper} className="right-wrapper-show">
          <ModernAIAuthImage style={styles.rightWrapperImage} />
        </div>
      </div>
    </>
  );
};