import React, { useMemo, useState } from "react";
import "./ShippingAndLogistic.scss";
import {
  AddInventoryIcon,
  ArrowIcon,
  DelecteIcon,
  DispatchShipmentIcon,
  FilterIcon,
  LowerStockIcon,
  PenndingShipment,
  SortIcon,
  TotalBuyersIcon,
  TotalCompletedShipmentIcon,
  TotalInventory,
  TotalShipmentIcon,
} from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const ShippingAndLogistic = () => {
  const [rowData, setRowData] = useState([
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Destination: "20.3.2002",
      ShippedDate: "Seller",
      Payment: "COD",
      Total: "5000",
      Status: "Shipping",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "OrderID" },
    { field: "Buyer" },
    { field: "Destination" },
    { field: "ShippedDate" },
    { field: "Payment" },
    { field: "Total" },
    { field: "Status" },
    { field: "Action" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <div className="shippingAndLogistic__mainWrapper">
      <h3>Shipping & Logistics</h3>

      <div className="SAL__reportMainWrapper">
        <div className="SAL__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <TotalShipmentIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Total Shipments</p>
              <h3>11,430</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper up">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="SAL__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <TotalCompletedShipmentIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Completed Shipments</p>
              <h3>9,870</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper fall">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="SAL__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <PenndingShipment />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Pending Shipments</p>
              <h3>1,058</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper fall">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="SAL__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <DispatchShipmentIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Dispatched Shipment</p>
              <h3>502</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper up">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>
      </div>

      <div className="SAL__userListMainWrapper">
        <div className="SAL__listTopFilterWrapper">
          <button className="allUser__Btn">All Orders</button>
          <div className="filterWrapper">
            <div className="inputWrapper">
              <input type="text" placeholder="Search..." />
            </div>
            <button>
              <SortIcon /> Sort
            </button>
            <button>
              <FilterIcon /> Filter
            </button>
            <button>
              <DelecteIcon />
            </button>
          </div>
        </div>

        <div className="SAL__userTableWrapper">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            // loading={loading}
            defaultColDef={defaultColDef}
            pagination={true}
            rowSelection={rowSelection}
            onSelectionChanged={(event) => console.log("Row Selected!")}
            onCellValueChanged={(event) =>
              console.log(`New Cell Value: ${event.value}`)
            }
          />
        </div>
      </div>
    </div>
  );
};
