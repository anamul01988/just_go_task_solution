import { useState } from "react";
import "./App.css";
import PaginationComponent from "./components/PaginationComponent";


function App() {
  
  return (
    <div className="container">
     {/* <Table/> */}
      <PaginationComponent/>
    </div>
  );
} 

export default App;
