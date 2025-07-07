import "./App.scss";

import { AdminDashboard } from "./Pages/admin/AdminDashboard";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { UserManagementPage } from "./Pages/admin/UserManagementPage";
import { InventoryManagement } from "./Pages/admin/InventoryManagement";
import { OderManagement } from "./Pages/admin/OderManagement";
import { Analytics } from "./Pages/admin/Analytics";
import { Payments } from "./Pages/admin/Payments";
import { Shipping } from "./Pages/admin/Shipping";
import { Profile } from "./Pages/admin/Profile";
import { Commission } from "./Pages/admin/Commission";
import { Login } from "./Pages/auth/Login/Login";
import { Register } from "./Pages/auth/Register/Register";
import { WholesalerDashboard } from "./Pages/wholesaler/WholesalerDashboard";
import { WholsalerInventoryManagement } from "./Pages/wholesaler/WholsalerInventoryManagement";
import { WholesalerOrderManagement } from "./Pages/wholesaler/WholesalerOrderManagement";
import { WholesalerReports } from "./Pages/wholesaler/WholesalerReports";
import { WholesalerPricingManagement } from "./Pages/wholesaler/WholesalerPricingManagement";
import { DashboardRetailor } from "./Pages/retailor/RetailorDashboard";
import CreateCategoryAdmin from "./Pages/admin/CreateCategoryAdmin";
import { RetailorInventorymanagement } from "./Pages/retailor/RetailorInventoryManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} exact />
        </Routes>
        <Routes>
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/inventory-management"
            element={<InventoryManagement />}
            exact
          />
        </Routes>
           <Routes>
          <Route
            path="/admin/category-management"
            element={<CreateCategoryAdmin />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/order-management"
            element={<OderManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/report-and/analytics"
            element={<Analytics />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/commission"
            element={<Commission />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/pricing-and-payment"
            element={<Payments />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/shipping-and-logistics"
            element={<Shipping />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/admin/profile"
            element={<Profile />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/auth/login"
            element={<Login />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/auth/register"
            element={<Register />}
            exact
          />
        </Routes>

        {/* all wholesaler routes */}
        <Routes>
          <Route
            path="/wholesaler/dashboard"
            element={<WholesalerDashboard />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/wholesaler/invertory-management"
            element={<WholsalerInventoryManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/wholesaler/order-management"
            element={<WholesalerOrderManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/wholesaler/reports-and-analitics"
            element={<WholesalerReports />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/wholesaler/pricing-and-payments"
            element={<WholesalerPricingManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route path="/wholesaler/profile" element={<Profile />} exact />
        </Routes>


        {/* retailer routes */}
        <Routes>
          <Route
            path="/retailer/dashboard"
            element={<DashboardRetailor />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/retailor/inventory-management"
            element={<RetailorInventorymanagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/retailer/order-management"
            element={<WholesalerOrderManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/retailer/reports-and-analitics"
            element={<WholesalerReports />}
            exact
          />
        </Routes>
        <Routes>
          <Route
            path="/retailer/pricing-and-payments"
            element={<WholesalerPricingManagement />}
            exact
          />
        </Routes>
        <Routes>
          <Route path="/retailer/profile" element={<Profile />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
