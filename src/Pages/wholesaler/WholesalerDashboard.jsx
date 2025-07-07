import React from "react";
import { DashboardWholesaler } from "../../components/wholesaler/Dashboard/DashboardWholesaler";
import { WholesalerLayout } from "../../components/Layout/WholesalerLayout";

export const WholesalerDashboard = () => {
  return ( 
    <WholesalerLayout>
      <DashboardWholesaler />
    </WholesalerLayout>
  );
};
