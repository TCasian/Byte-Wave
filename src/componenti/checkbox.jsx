import React from "react";
import "./checkbox.css";

export function CheckboxItem({ isMet, label }) {
  // Se vuoi usare l'input checkbox nativo, rendilo 'disabilitato' 
  // e 'controllato' dalla prop isMet per mostrare lo stato.
  return (
    <div className="checkbox-item">
    <div className={`checkbox-box ${isMet ? "checkbox-ticked" : "checkbox-failed"}`}>
       {`${isMet ? "✔" : "✖"}`}
   </div>
    <p className="text">{label}</p>
   </div>
  );
}

