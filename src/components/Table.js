import React from "react";
import { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";

function Table() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setTableData(json));
  }, []);
  console.log(tableData);
  
  return (
    <div>
      {/* // console.log(index); // return <li key={index}>{todo.title}</li>; */}
    
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          {/* {data.slice(0, 50).map((todo, index) => { */}
          <tbody>
            {tableData?.map((todo, index) => (
              <>
                <tr>
                  <th>{index}</th>
                  <td>{todo.title}</td>
                  <td>{todo.title}</td>
                  <td>{todo.title}</td>
                </tr>
              </>
            ))}
        
          </tbody>
        </table>
      </div>
      {/* <PaginationComponent tableData={tableData} setTableData={setTableData}/> */}
    </div>
  );
}

export default Table;
