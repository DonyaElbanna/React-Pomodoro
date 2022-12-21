import React from "react";
import "../App.css";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import Moon from "@iconscout/react-unicons/icons/uil-moon";

function ToggleButton({ theme, toggleTheme, volume }) {
  return (
    <div id="toggle-container">
      <div className="toggle" onClick={toggleTheme}>
        <Moon className="moon" />
        <Sun className="sun" />

        <div
          className="t-button"
          style={!theme ? { left: "2px" } : { right: "2px" }}
        ></div>
      </div>
    </div>
  );
}

export default ToggleButton;
