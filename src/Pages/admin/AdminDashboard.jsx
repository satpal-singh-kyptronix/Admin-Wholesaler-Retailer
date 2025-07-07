import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { Dashboard } from "../../components/admin/dashboard/Dashboard";
import { AdminLayout } from "./AdminLayout";

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};
