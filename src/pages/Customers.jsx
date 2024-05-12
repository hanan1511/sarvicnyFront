import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import Header from '../components/Header.jsx';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { boolean } from "yup";
const Customers = () => {

  let navigate = useNavigate();
  const [workers, setWorkers] = useState(null);
  const [loading, setLoading] = useState(true);
  const unactiveWorkers=[];

  const data = React.useMemo(
    () => {
      if (loading) {
        return [];
      }

      return workers;
    },
    [loading, unactiveWorkers,workers] // Add the dependencies
  );

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "First Name", accessor: "firstName" , sortType: "basic"},
      { Header: "Last Name", accessor: "lastName", sortType: "basic" },
      { Header: "Email", accessor: "email", sortType: "basic" },
      {
        Header: "Is Verified",
        accessor: "isVerified",
        sortType: "basic",
        Cell: ({ value }) => (value ? "Yes" : "No"), // Display "Yes" for true, "No" for false
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (row) => (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button
              onClick={() => handleAccept(row.row.original.id)}
              className="btn btn-success"
             >
              Accept
            </button>
            <button
              onClick={() => handleDetails(row.row.original)}
              className="btn" style={{backgroundColor:'#1daaf1'}}
            >
              Details
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [error, seterror] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7188/api/Admin/GetServiceProvidersRegistrationRequests'
      );
      // Handle the response data
      setWorkers(response.data.payload);
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      seterror('Error fetching data');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  async function handleAccept(id){
        // Navigate to another page and pass the row data as props
        const response = await axios.post(`https://localhost:7188/api/Admin/ApproveServiceProvider?WorkerID=${id}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
      if(response){
        window.alert("the worker accepted");
      }else{
        console.log(error);
      }
    }

    const handleDetails = (row) => {
      // Navigate to another page and pass the row data as props
      navigate('/admin/reqdet', { state: { rowData: row } });
    };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize, // Function to set page size
    pageSize,
  } = useTable({ columns,data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Service Providers" />
      <div className="container-fluid mt-4">
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search table..."
          className="form-control"
        />
      </div>

      <table {...getTableProps()} className="table table-bordered">
        <thead className="thead-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    cursor: "pointer",
                  }}
                  className="text-center"
                >
                  {column.render("Header")}
                  <span className="ml-1">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 d-flex justify-content-between">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="btn btn-outline-secondary"
        >
          {"<< First"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-outline-secondary"
        >
          {"< Previous"}
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-outline-secondary"
        >
          {"Next >"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn btn-outline-secondary"
        >
          {"Last >>"}
        </button>
      </div>
      <div className="d-flex align-items-center">
        <span className="mr-2">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            gotoPage(0);
          }}
          className="form-control w-25"
        >
          {[3, 5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>  
    </div>
  );
};

export default Customers;
