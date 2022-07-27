import React, { useState } from "react";
import "./ToggleSwitch.module.css";
function ToggleSwitcher() {
  const [checked, setChecked] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  return (
    <div className="example">
        <label class="switch">
                  <input onClick={setSwitcher(!switcher)} type="checkbox" />
                  <span class="slider round"></span>
                </label>
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