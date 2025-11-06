import React from "react";
import "./checkbox.css";

export function CheckboxItem({ isMet, label }) {
  return (
    <div className="checkbox-item">
      <div
        className={`checkbox-box ${
          isMet ? "checkbox-ticked" : "checkbox-failed"
        }`}
      >
        {`${isMet ? "✔" : "✖"}`}
      </div>
      <div className="text">{label}</div>
    </div>
  );
}
