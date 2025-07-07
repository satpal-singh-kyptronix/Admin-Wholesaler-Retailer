import React, { useMemo, useState } from "react";
import "./WholesalerOrder.scss";

import { TopFilterBtn } from "../../common/TopFilters/TopFilterBtn";
import {
  AddInventoryIcon,
  ArrowIcon,
  DelecteIcon, 
  FilterIcon,
  LowerStockIcon,
  OrderCancelleIcon,
  PenndingOrderIcon,
  SortIcon,
  TotalBuyersIcon,
  TotalInventory,
  TotalOdersIcon,
  TotalRevenueIcon,
} from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const WholesalerOrder = () => {
  const [rowData, setRowData] = useState([
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Shipping",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Order Received",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Online",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Online",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Online",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Online",
      Action: "View",
    },
    {
      OrderID: "123654",
      Buyer: "Michael Carter",
      Date: "20.3.2002",
      Role: "Seller",
      Payment: "COD",
      Total: "5000",
      Items: "2",
      Status: "Online",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "OrderID" },
    { field: "Buyer" },
    { field: "Date" },
    { field: "Payment" },
    { field: "Total" },
    { field: "Items" },
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
    <div className="OrderManagement__mainWrapper">
      <div className="OM__topHeadingWrapper">
        <h3>Order Management</h3>
        <div className="OM__filterWrapper">
          <TopFilterBtn />
          {/* <button className="upload__BTN">Upload CVS</button> */}
        </div>
      </div>

      <div className="OM__reportMainWrapper">
        <div className="OM__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <TotalOdersIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Total Orders</p>
              <h3>421</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper up">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="OM__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <TotalRevenueIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Total revenue</p>
              <h3>$8,540</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper fall">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="OM__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <PenndingOrderIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Pending Orders</p>
              <h3>14</h3>
            </div>
            <div className="report__percentWrapperr">
              <span className="report__arrowWrapper fall">
                <ArrowIcon />
              </span>
              <span className="report__span">+ 4.5 %</span>
            </div>
          </div>
        </div>

        <div className="OM__reportCardMainWrapper">
          <div className="reportCard__iconWrapper">
            <OrderCancelleIcon />
          </div>
          <div className="reportCard__contentMainWrapper">
            <div className="contentBox">
              <p className="">Cancelled Orders</p>
              <h3>32</h3>
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

      <div className="OM__userListMainWrapper">
        <div className="OM__listTopFilterWrapper">
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

        <div className="OM__userTableWrapper">
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
