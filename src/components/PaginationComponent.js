import React, { useEffect, useState } from "react";
import "./style.css";
import TableHeader from "./TableHeader";
const renderData = (data) => {
  console.log(data);
  return (
   <div className="mt-3">
     <h1 className="fs-3 fw-bold mb-3">User List</h1>
      <TableHeader/>
     <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              {/* <th>Index</th> */}
              <th>Name</th>
              <th>Registration Date</th>
              <th>Username</th>
            </tr>
          </thead>
          {/* {data.slice(0, 50).map((todo, index) => { */}
          <tbody>
            {data?.slice(0, 50).map((todo, index) => (
              <>
                <tr>
                  {/* <td>{index}</td> */}
                  <td>
                    <div className="tableData d-flex align-items-center">
                      <img className="" src={todo.picture.large} alt="" />
                      <div className="ms-3">
                        <h5 className="bold">{todo.name.first},{todo.name.last}</h5>
                        <p>{todo.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{todo.registered.date}</td>
                  <td>{todo.login.username}</td>
                </tr>
              </>
            ))}
        
          </tbody>
        </table>
      </div>
         {/* {data.slice(0, 50).map((todo, index) => {
            return <th key={index}>{todo.title}</th>;
          })} */}
   </div>
  );
};

function PaginationComponent({tableData, setTableData}) {
  const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(data?.slice(0, 50).length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
 
 
  const renderPageNumbers = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
     <div className="numbers">
        <div className="pagiNumber">
          <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      </div>
     </div>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
      .then((response) => response.json())
    
      .then((data) => {
        console.log(data.results);
        setData(data.results)
      });
  }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  // const handleLoadMore = () => {
  //   setitemsPerPage(itemsPerPage + 5);
  // };

  return (
    <div >
      <>
        {/* <h1>Todo List</h1> <br /> */}
        {renderData(currentItems)}
        <ul className="pageNumbers">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {/* {pageDecrementBtn} */}
          {renderPageNumbers}
          {/* {pageIncrementBtn} */}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages?.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
        {/* <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button> */}
      </>
    </div>
  );
}

export default PaginationComponent;
