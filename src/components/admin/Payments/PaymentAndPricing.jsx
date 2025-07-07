import React, { useMemo, useState } from "react";
import "./PaymentAndPricing.scss";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import {
  CreditCardIcon,
  PaypalIcon,
  WireLessIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Switch } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const PaymentAndPricing = () => {
  const [rowData, setRowData] = useState([
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
    {
      Product: "Cobalt Bottle w/ Spray Top",
      ID: "#05843",
      Sell: "$1.80",
    },
  ]);
  const [rowDate2, setRowData2] = useState([
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
    {
      OrderID: "#05843",
      Buyer: "Michael Carter",
      Date: "1 April 2025",
      Payment: "Paid",
      Total: "$20",
      Items: "2 Items",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "Product" },
    { field: "ID" },
    { field: "Sell" },
  ]);
  const [colDefs2, setColDefs2] = useState([
    {
      field: "OrderID",
    },
    {
      field: "Buyer",
    },
    {
      field: "Date",
    },
    {
      field: "Payment",
    },
    {
      field: "Total",
    },
    {
      field: "Items",
    },
    {
      field: "Action",
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="PaymentPricing__mainWrapper">
      <h3>Pricing and payments</h3>
      <div className="TieredPricing__mainWrapper">
        <div className="TP__topHeadingMainWrapper">
          <h4>Tiered Pricing</h4>
          <button>See all Pricing</button>
        </div>

        <div className="productAndprice__inputMainWrapper">
          <div className="inputLabel__wrapper">
            <label>Product Name</label>
            <select>
              <option>-- Select product --</option>
              <option>Product 1</option>
              <option>Product 2</option>
              <option>Product 3</option>
              <option>Product 4</option>
              <option>Product 5</option>
            </select>
          </div>
          <div className="inputLabel__wrapper">
            <label>Set Price</label>
            <input type="number" placeholder="$1" />
          </div>
          <div className="saveBtn__wrapper">
            <button>Save Changes</button>
          </div>
        </div>

        <div className="productPrice__tableMainWrapper">
          <div className="tableOne__wrapper">
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
          <div className="tableTwo__wrapper">
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

      <div className="paymentMethods__mainWrapper">
        <h4>Payment Methods</h4>
        <div className="methord__cardWrapper">
          <div className="cardWrapper">
            <div className="cardIcon__wrapper">
              <CreditCardIcon />
            </div>
            <div className="cardContent__wrapper">
              <h5>Enable/disable credit card</h5>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch"
                color="#76A13D"
                style={{
                  color: "#76A13D",
                }}
              />
            </div>
          </div>
          <div className="cardWrapper">
            <div className="cardIcon__wrapper payPal">
              <PaypalIcon />
            </div>
            <div className="cardContent__wrapper">
              <h5>Enable/disable Paypal</h5>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch"
                color="#F48B20"
                style={{
                  color: "#F48B20",
                }}
              />
            </div>
          </div>
          <div className="cardWrapper">
            <div className="cardIcon__wrapper wireLess">
              <WireLessIcon />
            </div>
            <div className="cardContent__wrapper">
              <h5>Enable/disable Wire Transfer</h5>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch"
                color="#4d4d4d"
                style={{
                  color: "#4d4d4d",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="discounts__mianWrapper">
        <h4>Discounts</h4>
        <div className="inputLabel__wrapper">
          <label>Create Coupon</label>
          <input placeholder="-Enter Coupon Code-" />
        </div>
        <div className="textarea__wrapper">
          <textarea rows={6} placeholder="Enter Coupon Terms"></textarea>
        </div>

        <button>Create Coupon</button>
      </div>

      <div className="TransactionHistory__mainWrapper">
        <h4>Transaction History</h4>
        <div className="table__wrapper">
          <AgGridReact
            rowData={rowDate2}
            columnDefs={colDefs2}
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
