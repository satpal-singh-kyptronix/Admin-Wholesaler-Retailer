import React, { useMemo, useState } from "react";
import "./UserManagement.scss";

import { TopFilterBtn } from "../../common/TopFilters/TopFilterBtn";
import {
  ArrowIcon,
  DelecteIcon,
  FilterIcon,
  SortIcon,
  TotalBuyersIcon,
  TotalManagersIcon,
  TotalSellersIcon,
  TotalUserIcon,
} from "../../../assets/Svgs/AllSvgs";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

export const UserManagement = () => {
  const [rowData, setRowData] = useState([
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
    {
      UserName: "Michael Carter",
      ID: "#05843",
      Role: "Seller",
      PhoneNumber: "+1 384-824-9822",
      EmailID: "example@gmail.com",
      Status: "Online",
      JoinDate: "5 April 2025",
      Action: "View",
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "UserName" },
    { field: "ID" },
    { field: "Role" },
    { field: "PhoneNumber" },
    { field: "EmailID" },
    { field: "Status" },
    { field: "JoinDate" },
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
    <>
      <div className="userMangement__mainWrapper">
        <div className="UM__topHeadingWrapper">
          <h3>User Management</h3>
          <div className="UM__filterWrapper">
            <TopFilterBtn />
            <button className="upload__BTN">Upload CVS</button>
          </div>
        </div>

        <div className="UM__reportMainWrapper">
          <div className="UM__reportCardMainWrapper">
            <div className="reportCard__iconWrapper">
              <TotalUserIcon />
            </div>
            <div className="reportCard__contentMainWrapper">
              <div className="contentBox">
                <p className="">Total Users</p>
                <h3>25,880</h3>
              </div>
              <div className="report__percentWrapperr">
                <span className="report__arrowWrapper up">
                  <ArrowIcon />
                </span>
                <span className="report__span">+ 4.5 %</span>
              </div>
            </div>
          </div>

          <div className="UM__reportCardMainWrapper">
            <div className="reportCard__iconWrapper">
              <TotalSellersIcon />
            </div>
            <div className="reportCard__contentMainWrapper">
              <div className="contentBox">
                <p className="">Total Sellers</p>
                <h3>4,393</h3>
              </div>
              <div className="report__percentWrapperr">
                <span className="report__arrowWrapper fall">
                  <ArrowIcon />
                </span>
                <span className="report__span">+ 4.5 %</span>
              </div>
            </div>
          </div>

          <div className="UM__reportCardMainWrapper">
            <div className="reportCard__iconWrapper">
              <TotalBuyersIcon />
            </div>
            <div className="reportCard__contentMainWrapper">
              <div className="contentBox">
                <p className="">Total Buyers</p>
                <h3>19,455</h3>
              </div>
              <div className="report__percentWrapperr">
                <span className="report__arrowWrapper fall">
                  <ArrowIcon />
                </span>
                <span className="report__span">+ 4.5 %</span>
              </div>
            </div>
          </div>

          <div className="UM__reportCardMainWrapper">
            <div className="reportCard__iconWrapper">
              <TotalManagersIcon />
            </div>
            <div className="reportCard__contentMainWrapper">
              <div className="contentBox">
                <p className="">Total Managers</p>
                <h3>2,032</h3>
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

        <div className="UM__userListMainWrapper">
          <div className="UM__listTopFilterWrapper">
            <button className="allUser__Btn">All Users</button>
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

          <div className="UM__userTableWrapper">
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
    </>
  );
};
