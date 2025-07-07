import React from "react";
import "./Profiles.scss";
import {
  CamraIcon,
  CreditCardIcon,
  EditIcon,
  LowStockIcon,
  PaypalIcon,
  WireLessIcon,
} from "../../../assets/Svgs/AllSvgs";
import ProfileImg from "../../../assets/images/ProfileImg.png";
import { Switch } from "@mui/material";

export const Profiles = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="profile__mainWrapper">
      <h3>Profiles</h3>
      <div className="general__mainWrapper">
        <div className="general__headingWrapper">
          <h4>General</h4>
          <button>
            <EditIcon />
            Edit
          </button>
        </div>

        <div className="profileUpdate__mainWrapper">
          <div className="changeProfilePic__wrapper">
            <div className="profileImg__wrapper">
              <img src={ProfileImg} alt="wholesale.com" />
            </div>
            <div className="profileImgInfo__wrapper">
              <h4>Profile Picture</h4>
              <p>Change or remove Your profile Picture</p>
              <button>
                <CamraIcon />
                Change Picture
              </button>
            </div>
          </div>

          <div className="inputs__mainWrapper">
            <div className="inputLabel__wrapper">
              <label>Username</label>
              <input placeholder="Eve Lopez" type="text" />
            </div>
            <div className="inputLabel__wrapper">
              <label>Phone Number</label>
              <input placeholder="+1 384-824-9822" type="number" />
            </div>
            <div className="inputLabel__wrapper">
              <label>Email ID</label>
              <input placeholder="Eveexample@gmail.com" type="email" />
            </div>
          </div>
        </div>
      </div>

      <div className="changePassword__mainWrapper">
        <div className="general__headingWrapper">
          <h4>Update Password</h4>
        </div>

        <div className="changePassword__inputWrapper">
          <div className="inputLabel__wrapper">
            <label> Password</label>
            <input placeholder="**********" type="password" />
          </div>
          <button>Change Password</button>
        </div>
      </div>

      <div className="paymentMethods__mainWrapper">
        <h4>Notifications</h4>
        <div className="methord__cardWrapper">
          <div className="cardWrapper">
            <div className="cardIcon__wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.5062 2.82043L6.96973 6.93091L11.3533 8.82043L20.8897 4.70985L16.5062 2.82043Z"
                  fill="#F4F5F7"
                />
                <path
                  d="M5.64032 6.4204L15.1297 2.20197L11.8838 0.759156C11.7373 0.69404 11.5788 0.6604 11.4186 0.6604C11.2584 0.6604 11.1 0.69404 10.9535 0.759156L1.92969 4.77082L5.64032 6.4204Z"
                  fill="#F4F5F7"
                />
                <path
                  d="M10.8097 10.0143L0.969727 5.70038V16.9619C0.969759 17.1835 1.03484 17.4004 1.15708 17.5862C1.27932 17.772 1.45345 17.9187 1.65834 18.0085L10.8097 22.0204L10.8097 10.0143Z"
                  fill="#F4F5F7"
                />
                <path
                  d="M12.0098 17.7004V22.0204L13.2098 21.4706C12.4292 20.3793 12.0085 19.0576 12.0098 17.7004Z"
                  fill="#F4F5F7"
                />
                <path
                  d="M18.3768 11.4271C19.6106 11.4261 20.8177 11.7804 21.8498 12.4466V5.70038L12.0098 9.99734V17.7004C12.0117 16.0372 12.6831 14.4427 13.8767 13.2666C15.0704 12.0906 16.6887 11.429 18.3768 11.4271Z"
                  fill="#F4F5F7"
                />
                <path
                  d="M18.37 12.6604C17.3494 12.6604 16.3518 12.963 15.5032 13.53C14.6547 14.097 13.9933 14.9029 13.6027 15.8458C13.2122 16.7886 13.11 17.8261 13.3091 18.8271C13.5082 19.828 13.9997 20.7474 14.7213 21.4691C15.4429 22.1907 16.3624 22.6822 17.3633 22.8813C18.3642 23.0803 19.4017 22.9782 20.3446 22.5876C21.2875 22.1971 22.0934 21.5357 22.6603 20.6871C23.2273 19.8386 23.53 18.841 23.53 17.8204C23.53 16.4519 22.9863 15.1394 22.0186 14.1717C21.0509 13.204 19.7385 12.6604 18.37 12.6604ZM20.4953 19.135C20.5496 19.188 20.5928 19.2513 20.6224 19.3211C20.652 19.3909 20.6675 19.4659 20.6679 19.5417C20.6684 19.6176 20.6538 19.6928 20.6249 19.7629C20.5961 19.8331 20.5537 19.8968 20.5 19.9504C20.4464 20.0041 20.3827 20.0465 20.3125 20.0753C20.2424 20.1042 20.1672 20.1188 20.0914 20.1183C20.0155 20.1179 19.9405 20.1024 19.8707 20.0728C19.8009 20.0432 19.7376 20 19.6846 19.9457L18.37 18.6311L17.0553 19.9457C17.0023 20 16.9391 20.0432 16.8693 20.0728C16.7995 20.1024 16.7245 20.1179 16.6486 20.1183C16.5728 20.1188 16.4976 20.1042 16.4275 20.0753C16.3573 20.0465 16.2936 20.0041 16.2399 19.9504C16.1863 19.8968 16.1439 19.8331 16.115 19.7629C16.0862 19.6928 16.0716 19.6176 16.072 19.5417C16.0725 19.4659 16.0879 19.3909 16.1176 19.3211C16.1472 19.2513 16.1904 19.188 16.2446 19.135L17.5593 17.8204L16.2446 16.5058C16.1904 16.4528 16.1472 16.3895 16.1176 16.3197C16.0879 16.2499 16.0725 16.1749 16.072 16.0991C16.0716 16.0232 16.0862 15.948 16.115 15.8779C16.1439 15.8077 16.1863 15.744 16.2399 15.6904C16.2936 15.6367 16.3573 15.5943 16.4275 15.5655C16.4976 15.5366 16.5728 15.522 16.6486 15.5225C16.7245 15.5229 16.7995 15.5384 16.8693 15.568C16.9391 15.5976 17.0023 15.6408 17.0553 15.6951L18.37 17.0097L19.6846 15.6951C19.7376 15.6408 19.8008 15.5976 19.8706 15.568C19.9405 15.5384 20.0155 15.5229 20.0913 15.5225C20.1671 15.522 20.2423 15.5366 20.3125 15.5655C20.3826 15.5943 20.4464 15.6367 20.5 15.6904C20.5536 15.744 20.5961 15.8077 20.6249 15.8779C20.6537 15.948 20.6683 16.0232 20.6679 16.0991C20.6675 16.1749 20.652 16.2499 20.6223 16.3197C20.5927 16.3895 20.5495 16.4528 20.4953 16.5058L19.1807 17.8204L20.4953 19.135Z"
                  fill="#F4F5F7"
                />
              </svg>
            </div>
            <div className="cardContent__wrapper">
              <h5>Low Stock Notifications</h5>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch"
                color="#D21B1B"
                style={{
                  color: "#D21B1B",
                }}
              />
            </div>
          </div>
          <div className="cardWrapper">
            <div className="cardIcon__wrapper payPal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.8059 8.25V20.25C21.8059 20.847 21.569 21.4193 21.1468 21.8408C20.7245 22.263 20.1522 22.5 19.5552 22.5H7.5516C6.95463 22.5 6.38232 22.263 5.96005 21.8408C5.53778 21.4193 5.30093 20.847 5.30093 20.25V14.901C5.6664 14.9662 6.04258 15 6.42627 15C9.9459 15 12.8032 12.1432 12.8032 8.625C12.8032 5.10675 9.9459 2.25 6.42627 2.25C6.23228 2.25 6.04043 2.259 5.8518 2.2755C6.26442 1.80075 6.87318 1.5 7.5516 1.5H15.0538V6C15.0538 6.597 15.2907 7.16925 15.713 7.59075C16.1352 8.013 16.7076 8.25 17.3045 8.25H21.8059ZM9.80228 18.75V18C9.80228 17.586 9.46575 17.25 9.05205 17.25C8.63836 17.25 8.30183 17.586 8.30183 18V18.75C8.30183 19.164 8.63836 19.5 9.05205 19.5C9.46575 19.5 9.80228 19.164 9.80228 18.75ZM12.8032 18.75V15.75C12.8032 15.336 12.4667 15 12.053 15C11.6393 15 11.3027 15.336 11.3027 15.75V18.75C11.3027 19.164 11.6393 19.5 12.053 19.5C12.4667 19.5 12.8032 19.164 12.8032 18.75ZM15.8041 18.75V16.5C15.8041 16.086 15.4675 15.75 15.0538 15.75C14.6402 15.75 14.3036 16.086 14.3036 16.5V18.75C14.3036 19.164 14.6402 19.5 15.0538 19.5C15.4675 19.5 15.8041 19.164 15.8041 18.75ZM18.805 18.75V13.5C18.805 13.086 18.4684 12.75 18.0547 12.75C17.6411 12.75 17.3045 13.086 17.3045 13.5V18.75C17.3045 19.164 17.6411 19.5 18.0547 19.5C18.4684 19.5 18.805 19.164 18.805 18.75ZM16.5543 1.51425C17.0934 1.57575 17.596 1.83075 17.9647 2.2365L21.2207 5.81625C21.464 6.08475 21.6376 6.405 21.7298 6.75H17.3045C17.1052 6.75 16.9144 6.67125 16.774 6.53025C16.6336 6.39 16.5543 6.19875 16.5543 6V1.51425ZM11.2448 9.375C10.8837 11.7098 8.86236 13.5 6.42627 13.5C3.73511 13.5 1.5498 11.3153 1.5498 8.625C1.5498 6.18975 3.34069 4.1685 5.67603 3.80775V7.875C5.67603 8.70375 6.34803 9.375 7.17649 9.375H11.2448ZM7.17649 3.80775C9.26748 4.131 10.9222 5.78475 11.2448 7.875H7.17649V3.80775Z"
                  fill="#F4F5F7"
                />
              </svg>
            </div>
            <div className="cardContent__wrapper">
              <h5>Enable Report Notification</h5>
              <Switch
                {...label}
                defaultChecked
                className="toggleSwitch"
                color="#7F7F7F"
                style={{
                  color: "#7F7F7F",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
