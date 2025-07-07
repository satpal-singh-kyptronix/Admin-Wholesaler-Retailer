import React from "react";
import "./TopFilterBtn.scss";

export const TopFilterBtn = () => {
  return (
    <div className="sortingBtn__wrapper">
      <button className="">1 Day</button>
      <button className="active__sortBtn">7 Day</button>
      <button className="">30 Day</button>
      <button className="">Yearly</button>
    </div>
  );
};
