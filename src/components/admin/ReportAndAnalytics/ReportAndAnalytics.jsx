import React from "react";
import "./ReportAndAnalytics.scss";
import { TopFilterBtn } from "../../common/TopFilters/TopFilterBtn";
import {
  ArrowIcon,
  OrderCancelleIcon,
  PenndingOrderIcon,
  TotalOdersIcon,
  TotalRevenueIcon,
} from "../../../assets/Svgs/AllSvgs";
import { Barchart } from "../../charts/Barchart";
import { Radarchart } from "../../charts/Radarchart";
import { Piechart } from "../../charts/Piechart";
import { Linechart } from "../../charts/Linechart";

export const ReportAndAnalytics = () => {
  return (
    <div className="RAAN__mainWrapper">
      <div className="RAAN__topHeadingWrapper">
        <h3>Reports & Analytics</h3>
        <div className="RAAN__filterWrapper">
          <TopFilterBtn />
          {/* <button className="upload__BTN">Upload CVS</button> */}
        </div>
      </div>

      <div className="RAAN__reportMainWrapper">
        <div className="RAAN__reportCardMainWrapper">
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

        <div className="RAAN__reportCardMainWrapper">
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

        <div className="RAAN__reportCardMainWrapper">
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

        <div className="RAAN__reportCardMainWrapper">
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

      <div className="RAAN__graphMainWrapper">
        <div className="RAAN__salesGraphMainWrapper">
          <div className="salesGraph__topHeading">
            <h3>Sales Report</h3>
            <select>
              <option>Years</option>
              <option>30 days</option>
              <option>7 days</option>
              <option>1 days</option>
            </select>
          </div>

          <div className="barGrapgh__mainWrapper">
            <Barchart />
          </div>
        </div>
        <div className="RAAN__weeklyVisitorMainWrapper">
          <div className="weeklyVisitor__topMainWrapper">
            <h3>Weekly Visitors</h3>
            <button>See all</button>
          </div>
          <div className="graphAndInfoWrapper">
            <div className="rightMainWrapper">
              {[
                {
                  day: "Monday",
                  paraOne: 59,
                  paraTwo: 75,
                },
                {
                  day: "Tuesday",
                  paraOne: 28,
                  paraTwo: 100,
                },
                {
                  day: "Wednesday",
                  paraOne: 94,
                  paraTwo: 49,
                },
                {
                  day: "Thusday",
                  paraOne: 94,
                  paraTwo: 49,
                },
                {
                  day: "Friday",
                  paraOne: 94,
                  paraTwo: 49,
                },
                {
                  day: "Saturday",
                  paraOne: 94,
                  paraTwo: 49,
                },
                {
                  day: "Sunday",
                  paraOne: 94,
                  paraTwo: 49,
                },
              ].map((cur, id) => (
                <div key={id} className="weeksInfoWrapper">
                  <h4>{cur.day}</h4>
                  <div className="infoWrapper">
                    <p className="paraOne">{cur.paraOne}</p>
                    <p className="paraTwo">{cur.paraTwo}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="leftMainWrapper">
              <Radarchart />
            </div>
          </div>
        </div>
      </div>

      <div className="RAAN__topSellingAndRevenueGraphMainWrapper">
        <div className="RAAN__topSellingMainWrapper">
          <div className="topSelling__topMainWrapper">
            <h3>Top Selling Category</h3>
            <button>See all</button>
          </div>

          <div className="graphAndInfo__maiWrapper">
            <div className="graphInfo__wrapper">
              <div className="info__wrapper">
                <div className="info__rightWrapper">
                  <span />
                  <h5>Lotions</h5>
                </div>
                <p>36%</p>
              </div>
              <div className="info__wrapper">
                <div className="info__rightWrapper">
                  <span className="oils" />
                  <h5>Oils</h5>
                </div>
                <p>16%</p>
              </div>
              <div className="info__wrapper">
                <div className="info__rightWrapper">
                  <span className="sprays" />
                  <h5>Sprays</h5>
                </div>
                <p>20%</p>
              </div>
              <div className="info__wrapper">
                <div className="info__rightWrapper">
                  <span className="others" />
                  <h5>Others</h5>
                </div>
                <p>28%</p>
              </div>

              <div className="total__mainWrapper">
                <h5>Total</h5>
                <h4>
                  523 <span>Products</span>
                </h4>
              </div>
            </div>
            <div className="graph__wrapper">
              <Piechart />
            </div>
          </div>
        </div>
        <div className="RAAN__revenueMainWrapper">
          <div className="topSelling__topMainWrapper">
            <h3>Revenue Graph</h3>
            <TopFilterBtn />
          </div>

          <div className="graph__wrapper">
            <Linechart aspectRatio={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
