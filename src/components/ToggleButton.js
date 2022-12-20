import React from "react";
import "../App.css";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import Moon from "@iconscout/react-unicons/icons/uil-moon";
// import { themeContext } from "../Context";
// import { useContext } from "react";

function ToggleButton({ theme, toggleTheme }) {
  //   const theme = useContext(themeContext);
  //   const darkMode = theme.state.darkMode;

  return (
    <div className="toggle" onClick={toggleTheme}>
      <Moon className="moon" />
      <Sun className="sun" />

      <div
        className="t-button"
        style={!theme ? { left: "2px" } : { right: "2px" }}
      ></div>
    </div>
  );
}

export default ToggleButton;
