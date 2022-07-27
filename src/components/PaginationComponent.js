import React, { useEffect, useState } from "react";
import "./style.css";
import "./TableHeader.module.css";
import { FaSearch } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';
import { FaLessThan } from 'react-icons/fa';

function PaginationComponent({ tableData, setTableData }) {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [searchData, setSearchData] = useState(false);
  const [radioData, setradioData] = useState(false);
  const [switcher, setSwitcher] = useState(null);

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
  const searchItems = radioData
    ? data
        ?.filter((item) => item.gender === radioData)
        .filter((it) =>
          searchData
            ? it.name.first.includes(searchData) ||
              it.name.last.includes(searchData) ||
              it?.email.includes(searchData) ||
              it?.registered.date.includes(searchData)
            : it
        )
        .slice(indexOfFirstItem, indexOfLastItem)
    : searchData &&
      data?.filter(
        (item) =>
          item.name.first.includes(searchData) ||
          item.name.last.includes(searchData) ||
          item?.email.includes(searchData) ||
          item?.registered.date.includes(searchData)
      );
  console.log("searchItemssearchItemssearchItems", searchItems);
  useEffect(() => {
    if (searchItems) {
      setPaginationData(searchItems);
    } else if (currentPage) {
      setPaginationData(currentItems);
    } else {
      setPaginationData(data);
    }
  }, [data, currentPage, searchData, radioData]);


  console.log(currentItems);

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
   
    fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
      .then((response) => response.json())

      .then((data) => {
        console.log(data.results);
        setData(data.results);
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
  console.log(switcher);
  return (
    <div>
      <>
        <div className="mt-3">
          <h1 className="fs-3 fw-bold mb-3">User List</h1>
          <div>
            <div class="row height fw-bold d-flex justify-content-center align-items-center">
              <div class="col-md-4 col-12 mt-2">
                <div class="form">
                   <FaSearch class="icon-search"/>
                  <input
                    type="text"
                    class="form-control form-input"
                    placeholder="Search..."
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                  <span class="left-pan">
                    <i class="fa fa-microphone"></i>
                  </span>
                </div>
              </div>
              <div class="col-md-4 col-12 mt-2">
                <h3 class="inline  mx-2">Filter By :</h3>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="all"
                    onChange={(e) => setradioData(null)}
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
                    value="male"
                    onChange={(e) => setradioData(e.target.value)}
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
                    value="female"
                    onChange={(e) => setradioData(e.target.value)}
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    Female
                  </label>
                </div>
              </div>
              <div class="col-md-4 col-12 mt-2 d-flex justify-content-end">
              <label class="mr-2"> Tile View  </label>
                <label class="switch">
                
                  <input
                    checked={switcher}
                    onChange={(e) => setSwitcher(e.target.checked)}
                    type="checkbox"
                  />
                  <span class="slider round"></span>
                </label>
             
              </div>
            </div>
          </div>
          {!switcher ? (
            <>
              <div class="table-responsive pt-4">
                <table class="table ">
                  <thead  class="table-head border-0 border-white">
                    <tr>
                  
                      <th>Name</th>
                      <th>Registration Date</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                
                  <tbody>
                    {paginationData?.slice(0, 50).map((todo, index) => (
                      <>
                        <tr>
                       
                          <td>
                            <div className="tableData d-flex flex-wrap  align-items-center">
                              <img
                                className="rounded-circle mb-2"
                                src={todo.picture.medium}
                                alt="img"
                              />
                              <div className="ms-3">
                                <h5 className="fw-bold sm:inline-block">
                                  {todo.name.first},  {todo.name.last}
                                </h5>
                                <p>{todo.email}</p>
                              </div>
                            </div>
                          </td>
                          <td class="sm:ms-3" >{todo.registered.date}</td>
                          <td>{todo.login.username}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="pageNumbers mt-2 mb-4">
                <li>
                  <button
                    onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false}
                  >
                    <FaLessThan/>
                  </button>
                </li>

                {renderPageNumbers}

                <li>
                  <button
                    onClick={handleNextbtn}
                    disabled={
                      currentPage == pages[pages?.length - 1] ? true : false
                    }
                  >
                    <FaGreaterThan/>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
          

              <div class="row mt-4">
                {paginationData?.slice(0, 50).map((todo, index) => (
                  <div class="col-lg-4 col-md-6 col-12">
                    {" "}
                    <div class="card shadow-md mb-4">
                      <div class="card-body">
                        <div className=" d-flex align-items-center">
                          <img
                            className="rounded-circle"
                            src={todo.picture.large}
                            alt=""
                          />
                          <div className="ms-3">
                            <h5 className="fw-bold">
                              {todo.name.first},{todo.name.last}
                            </h5>
                            <p>{todo.email}</p>
                            <p class="card-text fw-normal">{todo.login.username}</p>

                            <p class="card-text fw-normal">{todo.registered.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ul className="pageNumbers mt-2 mb-4">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
            >
                <FaLessThan/>
            </button>
          </li>

          {renderPageNumbers}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages?.length - 1] ? true : false}
            >
             <FaGreaterThan/>
            </button>
          </li>
        </ul>
            </>

          )}
        </div>

     
      </>
    </div>
  );
}

export default PaginationComponent;
