import React, { useState } from "react";
import "./ToggleSwitch.module.css";
function ToggleSwitcher() {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  return (
    <div className="example">
      <p>
        Tile View{" "}
        <span>
          {checked ? (
            "on"
          ) : (
            "off"
          )}
        </span>
        .
        <switch
          className="react-switch"
          onChange={handleChange}
          checked={checked}
          required
        />
      </p>
    </div>
  );
}

export default ToggleSwitcher;

{/* <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                class="form-check-label"
                for="flexSwitchCheckDefault"
              ></label>
            </div> */}