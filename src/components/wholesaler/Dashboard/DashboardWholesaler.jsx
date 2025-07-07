import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DashboardWholesaler.scss";
import {
  ArrowIcon,
  CancelledOrderIcon, 
  CancelOrderIcon,
  CompleteOdersIcon,
  DelecteIcon,
  FilterIcon,
  LowStockIcon,
  NewOrderIcon,
  SortIcon,
  TotalOdersIcon,
  TotalProductsIcon,
} from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const DashboardWholesaler = () => {
  const [rowData, setRowData] = useState([
    {
      product: "Lenovo Idea-pad gaming 3 Laptop",
      stocks: 2000,
      price: 60000,
      sale: 500,
      earning: 120000,
    },
    {
      product: "Lenovo Idea-pad gaming 3 Laptop",
      stocks: 2000,
      price: 60000,
      sale: 500,
      earning: 120000,
    },
    {
      product: "Lenovo Idea-pad gaming 3 Laptop",
      stocks: 2000,
      price: 60000,
      sale: 500,
      earning: 120000,
    },
    {
      product: "Lenovo Idea-pad gaming 3 Laptop",
      stocks: 2000,
      price: 60000,
      sale: 500,
      earning: 120000,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "product" },
    { field: "stocks" },
    { field: "price" },
    { field: "sale" },
    { field: "earning" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <div className="dashboard__mainWrapper">
      {/* top heading start */}
      <div className="dashboard__topHeadingWrapper">
        <h3>Overview</h3>
        <div className="sortingBtn__wrapper">
          <button className="">1 Day</button>
          <button className="active__sortBtn">7 Day</button>
          <button className="">30 Day</button>
          <button className="">Yearly</button>
        </div>
      </div>
      {/* top heading end */}

      {/* reports card start */}
      <div className="reportCards__mainWrapper">
        <div className="reportCard__wrapper">
          <div className="card__iconWrapper iconWrapperBgTp">
            <TotalProductsIcon />
          </div>
          <div className="card__contentMianWrapper">
            <div className="card__textWrapper">
              <h4>Total Product</h4>
              <h3>13,400</h3>
            </div>
            <div className="card__rightWrapper">
              <div className="arrowIcon__Wrapper up">
                <ArrowIcon />
              </div>
              <p>+ 2.5%</p>
            </div>
          </div>
        </div>

        <div className="reportCard__wrapper">
          <div className="card__iconWrapper iconWrapperBgTo">
            <TotalOdersIcon />
          </div>
          <div className="card__contentMianWrapper">
            <div className="card__textWrapper">
              <h4>Total Orders</h4>
              <h3>420</h3>
            </div>
            <div className="card__rightWrapper">
              <div className="arrowIcon__Wrapper up">
                <ArrowIcon />
              </div>
              <p>+ 14.5%</p>
            </div>
          </div>
        </div>

        <div className="reportCard__wrapper">
          <div className="card__iconWrapper iconWrapperBgCo">
            <CompleteOdersIcon />
          </div>
          <div className="card__contentMianWrapper">
            <div className="card__textWrapper">
              <h4>Completed Orders</h4>
              <h3>350</h3>
            </div>
            <div className="card__rightWrapper">
              <div className="arrowIcon__Wrapper fallIn">
                <ArrowIcon />
              </div>
              <p>- 4.5%</p>
            </div>
          </div>
        </div>

        <div className="reportCard__wrapper">
          <div className="card__iconWrapper iconWrapperBgCao">
            <CancelledOrderIcon />
          </div>
          <div className="card__contentMianWrapper">
            <div className="card__textWrapper">
              <h4>Cancelled Orders</h4>
              <h3>32</h3>
            </div>
            <div className="card__rightWrapper">
              <div className="arrowIcon__Wrapper fallIn">
                <ArrowIcon />
              </div>
              <p>-4.5%</p>
            </div>
          </div>
        </div>
      </div>
      {/* reports card end */}

      {/* total revenue graph and card wraper */}
      <div className="totalRevenue__mainWrapper">
        <div className="totalRevenue__cardMainWrapper">
          <div className="totalRevenue__topWrapper">
            <h3>Total Revenue</h3>
            <button>See Details</button>
          </div>
          <div className="totalRevenue__amountWrapper">
            <h2>$24,630</h2>

            <div className="totalRevenue__percentViewWrapper">
              <div className="arrowIcon__Wrapper up">
                <ArrowIcon />
              </div>
              <span>+2.5%</span> | <span>$4,233</span>
            </div>
          </div>

          <div className="totalRevenue__filterMainWrapper">
            <button>1 day</button>
            <button className="active__sortBtn">7 days</button>
            <button>30 days</button>
            <button>Yearly</button>
          </div>
        </div>

        <div className="totalRevenue__cardMainWrapper">
          <div className="totalRevenue__topWrapper">
            <h3>Net Earning</h3>
            <button>See Details</button>
          </div>
          <div className="totalRevenue__amountWrapper">
            <h2>$20,630</h2>

            <div className="totalRevenue__percentViewWrapper">
              <div className="arrowIcon__Wrapper up">
                <ArrowIcon />
              </div>
              <span>+2.5%</span> | <span>$4,233</span>
            </div>
          </div>

          <div className="totalRevenue__filterMainWrapper">
            <button>1 day</button>
            <button className="active__sortBtn">7 days</button>
            <button>30 days</button>
            <button>Yearly</button>
          </div>
        </div>

        <div className="totalRevenue__cardMainWrapper">
          <div className="totalRevenue__topWrapper">
            <h3>Payable Commission</h3>
            <button>See Details</button>
          </div>
          <div className="totalRevenue__amountWrapper">
            <h2>$4,000</h2>

            <div className="totalRevenue__percentViewWrapper">
              <div className="arrowIcon__Wrapper up">
                <ArrowIcon />
              </div>
              <span>+2.5%</span> | <span>$4,233</span>
            </div>
          </div>

          <div className="totalRevenue__filterMainWrapper">
            <button>1 day</button>
            <button className="active__sortBtn">7 days</button>
            <button>30 days</button>
            <button>Yearly</button>
          </div>
        </div>
      </div>
      {/* total revenue graph and card wraper */}

      <div className="productsAndUsers__mainWrapper">
        <div className="topProduct__mainWrapper">
          <div className="tproducts__filtersMainWrapper">
            <div className="tproduct__headingWrapper">
              <h3>Top Products</h3>
            </div>
            <div className="fliters__wrapperr">
              <div className="searchInput__wrapper">
                <input placeholder="Search" />
              </div>
              <button>
                <SortIcon />
                Sort
              </button>
              <button>
                <FilterIcon />
                Filter
              </button>
              <button>
                <DelecteIcon />
              </button>
            </div>
          </div>

          <div className="table__mainWrapper">
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
        <div className="activeUser__mainWrapper">
          <div className="activity__topWrapper">
            <h3>Recent Activity</h3>
            <button>See All</button>
          </div>

          <div className="aleartNotify__mainWrapper">
            <div className="aleart__wrapper">
              <div className="aleartIcon__wrapper">
                <NewOrderIcon />
              </div>
              <div className="aleart__smallInfoWrapper">
                <div className="contentBox">
                  <h4>Ray’s Healthy Living, Kava</h4>
                  <p>John Doe . 12 Mar 25</p>
                </div>
                <button>New Order</button>
              </div>
            </div>

            <div className="aleart__wrapper">
              <div className="aleartIcon__wrapper">
                <LowStockIcon />
              </div>
              <div className="aleart__smallInfoWrapper">
                <div className="contentBox">
                  <h4>Low Stock Alert</h4>
                  <p>Lemon Eucalyptus . 12 Mar 25</p>
                </div>
                <button className="lowStock">Stock: 06</button>
              </div>
            </div>
            <div className="aleart__wrapper">
              <div className="aleartIcon__wrapper">
                <CancelOrderIcon />
              </div>
              <div className="aleart__smallInfoWrapper">
                <div className="contentBox">
                  <h4>Low Stock Alert</h4>
                  <p>Lemon Eucalyptus . 12 Mar 25</p>
                </div>
                <button className="cancelOrder">Refund</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
