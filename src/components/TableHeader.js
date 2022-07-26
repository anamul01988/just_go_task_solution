import React from "react";
import "./TableHeader.module.css";
import ToggleSwitcher from "./ToggleSwitcher";
function TableHeader() {
  return (
    <div>
      <div class="row height fw-bold d-flex justify-content-center align-items-center">
        <div class="col-md-4 col-12">
          <div class="form">
            {/* <i class="fa fa-search"></i> */}
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              class="form-control form-input"
              placeholder="Search anything..."
            />
            <span class="left-pan">
              <i class="fa fa-microphone"></i>
            </span>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <h3 class="inline  mx-2">Filter By :</h3>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
            />
            <label class="form-check-label" for="inlineRadio1">
              All
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
            />
            <label class="form-check-label" for="inlineRadio2">
              Male
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="option3"
            />
            <label class="form-check-label" for="inlineRadio3">
              Female
            </label>
          </div>
        </div>
        <div class="col-md-4 col-12">
       {/* <div className="toggle">
       <input class="toggle-input" type="checkbox" id="switch" />
          <label class="toggle-label" for="switch">Toggle</label>
       </div> */}
       <ToggleSwitcher/>

        </div>
      </div>
    </div>
  );
}

export default TableHeader;
