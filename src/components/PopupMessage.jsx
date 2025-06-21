import React from "react";
import "./PopupMessage.css";

const PopupMessage = ({ type, message, onClose }) => {
  if (!message) return null;

  let headerIcon, headerText, headerClass;
  if (type === "loading") {
    headerIcon = (
      <svg className="popup-icon popup-loading-icon" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeDasharray="60"
          strokeDashoffset="20"
        />
      </svg>
    );
    headerText = "Loading";
    headerClass = "popup-header-loading";
  } else if (type === "success") {
    headerIcon = (
      <svg className="popup-icon" viewBox="0 0 24 24">
        <path
          d="M6 12l5 5l7-9"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
    headerText = "Success";
    headerClass = "popup-header-success";
  } else if (type === "error") {
    headerIcon = (
      <svg className="popup-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#e53935" />
        <text
          x="12"
          y="17"
          textAnchor="middle"
          fontSize="16"
          fill="#fff"
          fontWeight="bold"
        >
          !
        </text>
      </svg>
    );
    headerText = "Error";
    headerClass = "popup-header-error";
  }

  return (
    <div
      className="popup-overlay popup-close"
      onClick={type === "loading" ? undefined : onClose}
    >
      <div className="popup-message">
        <div className={`popup-header ${headerClass}`}>
          {headerIcon}
          <span className="popup-header-text">{headerText}</span>
          {type !== "loading" && (
            <button className="popup-close popup-header-close" title="Close">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#eee" />
                <line
                  x1="6"
                  y1="6"
                  x2="14"
                  y2="14"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="14"
                  y1="6"
                  x2="6"
                  y2="14"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="popup-body">
          <span>{message}</span>
          {type !== "loading" && (
            <button className="popup-close popup-ok-btn">OK</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
