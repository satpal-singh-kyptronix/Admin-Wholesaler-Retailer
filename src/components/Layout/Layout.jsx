import React from "react";
import "./Layout.scss";

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
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
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
                <Link to='/admin/inventory-management' className="nav__links">
                  <InventoryManagementIcon />
                  Inventory Management
                </Link>
                <Link to='/admin/order-management' className="nav__links">
                  <OderManagementIcon /> Order Management
                </Link>
                <Link to='/admin/report-and/analytics' className="nav__links">
                  <ReportsIcon /> Reports & Analytics
                </Link>
                <Link to='/admin/commission' className="nav__links">
                  <ShieldMinus  /> Commissions
                </Link>
              </ul>

              <h3 className="sideMenu__subHeading">Settings</h3>

              <ul className="menuWrapper">
                <Link to='/admin/pricing-and-payment' className="nav__links ">
                  <PriceAndPaymentIcon />
                  Pricing & Payment
                </Link>
                <Link to='/admin/shipping-and-logistics' className="nav__links">
                  <ShippingIcon />
                  Shipping & Logistics
                </Link>
                <Link to='/admin/profile' className="nav__links">
                  <SettingsIcon />
                  Profile
                </Link>
              </ul>

              <button className="menu__LogoutBtn">
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
            <h2>Good Morning, Admin</h2>
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

            <button className="topNavbar__porfileBtn">
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
              <div className="nameAndRole__Wrapper">
                <h4>Ava Richardson</h4>
                <p>Admin</p>
              </div>
            </button>
          </div>
        </nav>

        {children}
      </div>
    </div>
  );
};
