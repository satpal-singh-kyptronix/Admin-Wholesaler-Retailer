import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { WholesalerInventory } from "../../components/wholesaler/WholesalerInventory/WholesalerInventory";
import { WholesalerLayout } from "../../components/Layout/WholesalerLayout";

export const WholsalerInventoryManagement = () => {
  return ( 
    <WholesalerLayout>
      <WholesalerInventory />
    </WholesalerLayout>
  );
};
