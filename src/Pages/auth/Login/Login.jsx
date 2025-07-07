// import React from "react";
// import "./Login.scss";
// import AuthSlideImg1 from "../../../assets/images/AuthSlideImg1.jpg";
// // import AuthSlideImg2 from "../../../assets/images/AuthSlideImg2.jpg";
// // import AuthSlideImg3 from "../../../assets/images/AuthSlideImg3.jpg";
// // import AuthSlideImg4 from "../../../assets/images/AuthSlideImg4.jpg";
// import Logo from "../../../assets/images/WholesaleLogo.png";
// import { Link } from "react-router-dom";

// export const Login = () => {
//   return (
//     <div className="Login__mainWrapper">
//       <div className="loginPage__leftWrapper">
//         <div className="mainFormWrapper">
//           <div className="logoWrapper">
//             <img src={Logo} alt="logo" />
//           </div>

//           <form className="login__from">
//             <div className="inputWrapper">
//               <label>username,email</label>
//               <input placeholder="Enter user email..." type="text" />
//             </div>
//             <div className="inputWrapper">
//               <label>Password</label>
//               <input placeholder="Enter password..." type="password" />
//             </div>

//             <button>Login</button>

//             <div className="forgetAndRegisterlinkWrapper">
//               <Link>Fotgot password?</Link>
//               <p>
//                 Don't have an account?{" "}
//                 <Link to="/auth/register">Register Now</Link>
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



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../assets/images/WholesaleLogo.png';
import Cookies from 'js-cookie';

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
          <animate attributeName="width" values="160;170;160" dur="3s" repeatCount="indefinite"/>
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


export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'wholesaler',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleToggle = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/api/auth/login', formData);
      const { role, token } = response.data;
      const tokenKey = `${role}Token`;
      Cookies.set(tokenKey, token, { expires: 30, secure: true, sameSite: 'Strict' });
      setSuccess('Login successful! Redirecting...');
      const redirectPath = `/${role}/dashboard`;
      setTimeout(() => navigate(redirectPath), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
      background: '#ffffff',
      outline: 'none',
      fontFamily: 'inherit',
    },
    toggleWrapper: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '12px',
      padding: '0.25rem',
      border: '2px solid #e5e7eb',
    },
    toggleOption: {
      flex: 1,
      textAlign: 'center',
      padding: '0.75rem 0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      borderRadius: '8px',
      color: '#6b7280',
    },
    toggleOptionActive: {
      color: '#ffffff',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
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
      marginTop: '0.5rem',
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
    },
    messageBase: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center',
    },
    errorMessage: {
      background: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fecaca',
    },
    successMessage: {
      background: '#d1fae5',
      color: '#059669',
      border: '1px solid #a7f3d0',
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '0.5rem',
      display: 'inline-block',
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
      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .right-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background: transparent;
      }

      .right-wrapper svg {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 800px;
        display: block;
        margin: auto;
      }

      @media (max-width: 767px) {
        .main-wrapper {
          flex-direction: column;
        }
        .left-wrapper {
          padding: 1rem;
        }
        .right-wrapper {
          display: none !important;
        }
      }

      @media (max-width: 480px) {
        .form-container {
          padding: 1.5rem 1rem !important;
          margin: 0.5rem !important;
        }
        .logo {
          max-width: 120px !important;
        }
      }
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: cssAnimations }} />
      <div className="main-wrapper" style={styles.mainWrapper}>
        <div className="left-wrapper" style={styles.leftWrapper}>
          <div className="form-container" style={styles.formContainer}>
            <div style={styles.formContainerBefore}></div>
            <div style={styles.logoWrapper}>
              <img src={Logo} alt="logo" className="logo" style={styles.logo} />
            </div>
            <form style={styles.form} onSubmit={handleSubmit}>
              {error && <div style={{ ...styles.messageBase, ...styles.errorMessage }}>{error}</div>}
              {success && <div style={{ ...styles.messageBase, ...styles.successMessage }}>{success}</div>}
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
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Password</label>
                <input
                  style={styles.input}
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Account Type</label>
                <div style={styles.toggleWrapper}>
                  {['admin', 'wholesaler', 'retailer'].map((role) => (
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
              <button type="submit" style={styles.submitButton} disabled={isLoading}>
                {isLoading && <span style={styles.loadingSpinner}></span>}
                {isLoading ? 'Logging In...' : 'Log In'}
              </button>
              <div style={styles.linkWrapper}>
                <p style={styles.linkText}>
                  Don't have an account?{' '}
                  <Link to="/auth/register" style={styles.link}>
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="right-wrapper">
          <ModernAIAuthImage />
        </div>
      </div>
    </>
  );
};
