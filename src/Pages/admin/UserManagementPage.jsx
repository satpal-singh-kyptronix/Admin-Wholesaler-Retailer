import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserManagement } from "../../components/admin/user-management/UserManagement";

export const UserManagementPage = () => {
  return (
    <>
      <Layout>
        <UserManagement />
      </Layout>
    </>
  );
};
