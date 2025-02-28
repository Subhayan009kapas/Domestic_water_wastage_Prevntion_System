import React, { useState } from "react";
import "./ToggleSwitch.css"; // Assuming you will add the CSS separately or inline.

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(true); // Default is checked

  const handleToggle = () => {
    setIsChecked(prevState => !prevState); // Toggle state
  };

  return (
    <div className="container"  >
      <label className="switch" >
        <input
          type="checkbox"
          className="togglesw"
          checked={isChecked} // React controls the checkbox state
          onChange={handleToggle} // Handle toggle on change
        />
        <div className={`indicator left ${isChecked ? 'active' : ''}`}></div>
        <div className={`indicator right ${!isChecked ? 'active' : ''}`}></div>
        <div className={`button ${isChecked ? 'active' : ''}`}></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
