import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { Inventorymanagement } from "../../components/admin/Inventorymanagement/Inventorymanagement";
import { AdminLayout } from "./AdminLayout";

export const InventoryManagement = () => {
  return (
    <AdminLayout>
      <Inventorymanagement />
    </AdminLayout>
  );
};
