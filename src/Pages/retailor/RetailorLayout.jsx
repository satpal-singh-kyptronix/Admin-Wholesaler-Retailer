// import React from "react";
// import "./Layout.scss";

// import WholesaleLogo from "../../assets/images/WholesaleLogo.png";
// import {
//   HomeIcon,
//   InventoryManagementIcon,
//   NotificationIcon,
//   OderManagementIcon,
//   PluseIcon,
//   PriceAndPaymentIcon,
//   ReportsIcon,
//   SearchIcon,
//   SettingsIcon,
//   ShippingIcon,
//   UserManagementIcon,
// } from "../../assets/Svgs/AllSvgs";
// import { LogOut, ShieldMinus } from "lucide-react";
// import { Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode";

// export const WholesalerLayout = ({ children }) => {
//     const token =Cookies.get("wholesalerToken");
//     const decodedToken= jwtDecode(token);
//     console.log("Decoded Token:", decodedToken);
//   return (
//     <div className="layout__mainWrapper">
//       <div className="layout__sideBarMainWrapper">
//         <aside className="sideMenu__Wrapper">
//           <div className="sideMenu__logoWrapper">
//             <img src={WholesaleLogo} alt="wholesale.com" />
//           </div>
//           <div className="sideMenu__menuWrapper">
//             <div className="sideMenu__menuLinksWrapper">
//               <h3 className="sideMenu__subHeading">Main Menu</h3>
//               <ul className="menuWrapper">
//                 <Link to="/" className="nav__links nav__linksActive">
//                   <HomeIcon />
//                   Overview
//                 </Link>
//                 <Link to="/admin/user-management" className="nav__links">
//                   <UserManagementIcon />
//                   User Management
//                 </Link>
//                 <Link to='/admin/inventory-management' className="nav__links">
//                   <InventoryManagementIcon />
//                   Inventory Management
//                 </Link>
//                 <Link to='/admin/order-management' className="nav__links">
//                   <OderManagementIcon /> Order Management
//                 </Link>
//                 <Link to='/admin/report-and/analytics' className="nav__links">
//                   <ReportsIcon /> Reports & Analytics
//                 </Link>
//                 <Link to='/admin/commission' className="nav__links">
//                   <ShieldMinus  /> Commissions
//                 </Link>
//               </ul>

//               <h3 className="sideMenu__subHeading">Settings</h3>

//               <ul className="menuWrapper">
//                 <Link to='/admin/pricing-and-payment' className="nav__links ">
//                   <PriceAndPaymentIcon />
//                   Pricing & Payment
//                 </Link>
//                 <Link to='/admin/shipping-and-logistics' className="nav__links">
//                   <ShippingIcon />
//                   Shipping & Logistics
//                 </Link>
//                 <Link to='/admin/profile' className="nav__links">
//                   <SettingsIcon />
//                   Profile
//                 </Link>
//               </ul>

//               <button className="menu__LogoutBtn">
//                 <LogOut />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </aside>
//       </div>
//       <div className="layout__mainContentViewMainWrapper">
//         <nav className="top__navBarMainWrapper">
//           <div className="topNavbar__leftWrapper">
//             <h2>Good Morning, Admin</h2>
//             <p>Here is your daily preview</p>
//           </div>

//           <div className="topNavbar__searchMainWrapper">
//             <div className="searchIcon__wrapper">
//               <SearchIcon />
//             </div>
//             <input type="text" placeholder="Search..." />
//           </div>
//           <div className="topNavbar__rightWrapper">
//             <button className="topNavbar__notificationBtn">
//               <NotificationIcon />
//             </button>
//             <button className="topNavbar__addUserBtn">
//               <PluseIcon /> Add Users
//             </button>

//             <button className="topNavbar__porfileBtn">
//               <Avatar
//                 sx={{
//                   width: 30,
//                   height: 30,
//                 }}
//               />
//               <div className="nameAndRole__Wrapper">
//                 <h4>Ava Richardson</h4>
//                 <p>Admin</p>
//               </div>
//             </button>
//           </div>
//         </nav>

//         {children}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import WholesaleLogo from "../../assets/images/WholesaleLogo.png";
import {
  HomeIcon,
  InventoryManagementIcon,
  NotificationIcon,
  OderManagementIcon,
  PluseIcon,
  PriceAndPaymentIcon,
  ReportsIcon,
  SearchIcon,
  SettingsIcon,
  ShippingIcon,
  UserManagementIcon,
} from "../../assets/Svgs/AllSvgs";
import { LogOut, ShieldMinus } from "lucide-react";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const RetailorLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("retailerToken");
  const decodedToken = jwtDecode(token || "");
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("wholesalerToken");
    navigate("/auth/login");
  };

  return (
    <>
      <div className="layout__mainWrapper">
        <div className="layout__sideBarMainWrapper">
          <aside className="sideMenu__Wrapper">
            <div className="sideMenu__logoWrapper">
              <img src={WholesaleLogo} alt="wholesale.com" />
            </div>
            <div className="sideMenu__menuWrapper">
              <div className="sideMenu__menuLinksWrapper">
                <h3 className="sideMenu__subHeading">Main Menu</h3>
                <ul className="menuWrapper">
                  <Link to="/" className="nav__links nav__linksActive">
                    <HomeIcon />
                    Overview
                  </Link>
                  <Link to="/admin/user-management" className="nav__links">
                    <UserManagementIcon />
                    User Management
                  </Link>
                  <Link to="/retailor/inventory-management" className="nav__links">
                    <InventoryManagementIcon />
                    Inventory Management
                  </Link>
                  <Link to="/admin/order-management" className="nav__links">
                    <OderManagementIcon /> Order Management
                  </Link>
                  <Link to="/admin/report-and/analytics" className="nav__links">
                    <ReportsIcon /> Reports & Analytics
                  </Link>
                  <Link to="/admin/commission" className="nav__links">
                    <ShieldMinus /> Commissions
                  </Link>
                </ul>

                <h3 className="sideMenu__subHeading">Settings</h3>

                <ul className="menuWrapper">
                  <Link to="/admin/pricing-and-payment" className="nav__links">
                    <PriceAndPaymentIcon />
                    Pricing & Payment
                  </Link>
                  <Link to="/admin/shipping-and-logistics" className="nav__links">
                    <ShippingIcon />
                    Shipping & Logistics
                  </Link>
                  <Link to="/admin/profile" className="nav__links">
                    <SettingsIcon />
                    Profile
                  </Link>
                </ul>

                <button className="menu__LogoutBtn" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className="layout__mainContentViewMainWrapper">
          <nav className="top__navBarMainWrapper">
            <div className="topNavbar__leftWrapper">
              <h2>Good Morning, {decodedToken?.id?.name || "User"}</h2>
              <p>Here is your daily preview</p>
            </div>

            <div className="topNavbar__searchMainWrapper">
              <div className="searchIcon__wrapper">
                <SearchIcon />
              </div>
              <input type="text" placeholder="Search..." />
            </div>

            <div className="topNavbar__rightWrapper">
              <button className="topNavbar__notificationBtn">
                <NotificationIcon />
              </button>

              <button className="topNavbar__addUserBtn">
                <PluseIcon /> Add Users
              </button>

              <div className="topNavbar__profileWrapper">
                <button
                  className="topNavbar__porfileBtn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <Avatar sx={{ width: 30, height: 30 }} />
                  <div className="nameAndRole__Wrapper">
                    <h4>{decodedToken?.id?.name}</h4>
                    <p>{decodedToken?.id?.role}</p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="topNavbar__dropdownCard">
                    <p>
                      <strong>Name:</strong> {decodedToken?.id?.name}
                    </p>
                    <p>
                      <strong>Role:</strong> {decodedToken?.id?.role}
                    </p>
                    <button className="menu__LogoutBtn" onClick={handleLogout}>
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {children}
        </div>
      </div>

      <style>{`
        .layout__mainWrapper {
          height: 100dvh;
          background-color: var(--primary-color);
          overflow: hidden;
          display: flex;
          justify-content: center;
        }

        .layout__sideBarMainWrapper {
          width: 20%;
          flex-shrink: 0;
          background-color: var(--sideMenu-color);
          padding: 20px;
        }

        .sideMenu__logoWrapper {
          width: 80%;
          height: 4dvw;
          margin: 0 auto;
        }

        .sideMenu__logoWrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .sideMenu__menuWrapper {
          margin-top: 2dvw;
        }

        .sideMenu__subHeading {
          font-size: 1vw;
          color: var(--paraText-color);
          font-family: var(--paraFont);
          font-weight: 400;
        }

        .menuWrapper {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav__links {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-family: var(--mainFont);
          font-size: 1.1dvw;
          font-weight: 400;
          color: var(--paraText-color);
          padding: 10px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .nav__links:hover {
          background-color: var(--activeTab-color);
          color: var(--primary-color);
          font-weight: 600;
        }

        .nav__linksActive {
          background-color: var(--activeTab-color);
          color: var(--primary-color);
          font-weight: 600;
        }

        .menu__LogoutBtn {
          font-family: var(--paraFont);
          color: var(--primary-color);
          background-color: var(--button-color3);
          padding: 10px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1dvw;
        }

        .layout__mainContentViewMainWrapper {
          flex: 1;
        }

        .top__navBarMainWrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(212, 212, 212, 0.5);
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
        }

        .topNavbar__leftWrapper h2 {
          font-family: var(--mainFont);
          font-size: 1.5dvw;
          font-weight: 700;
          color: var(--mainText-color);
        }

        .topNavbar__leftWrapper p {
          font-family: var(--paraFont);
          font-size: 1dvw;
          font-weight: 400;
          color: var(--paraText-color);
        }

        .topNavbar__searchMainWrapper {
          width: 30%;
          background-color: var(--sideMenu-color);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 50px;
        }

        .searchIcon__wrapper {
          width: 2dvw;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .topNavbar__searchMainWrapper input {
          flex: 1;
          border: none;
          outline: none;
          background-color: transparent;
          font-size: 1dvw;
          font-family: var(--paraFont);
          color: var(--paraText-color);
        }

        .topNavbar__rightWrapper {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .topNavbar__notificationBtn {
          border: 1px solid var(--border-color);
          padding: 8px;
          border-radius: 50%;
          background: transparent;
        }

        .topNavbar__addUserBtn {
          background-color: var(--activeTab-color);
          color: var(--primary-color);
          padding: 10px 25px;
          border-radius: 20px;
          border: none;
          font-family: var(--mainFont);
          font-size: 1dvw;
          font-weight: 600;
          cursor: pointer;
        }

        .topNavbar__addUserBtn:hover {
          background-color: var(--button-color1);
        }

        .topNavbar__porfileBtn {
          border: 1px solid var(--border-color);
          padding: 8px 15px;
          border-radius: 25px;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .nameAndRole__Wrapper {
          display: flex;
          flex-direction: column;
          align-items: start;
        }

        .nameAndRole__Wrapper h4 {
          font-size: 0.9dvw;
          font-weight: 600;
          color: var(--mainText-color);
        }

        .nameAndRole__Wrapper p {
          font-size: 0.8dvw;
          font-weight: 400;
          color: var(--paraText-color);
        }

        .topNavbar__profileWrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .topNavbar__dropdownCard {
          position: absolute;
          top: 110%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          z-index: 999;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          animation: fadeIn 0.4s ease-in-out forwards;
        }

        .topNavbar__dropdownCard p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--mainText-color);
          font-family: var(--paraFont);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
