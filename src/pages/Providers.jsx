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

const Providers = () => {
  let navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const unactiveWorkers = [];
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7188/api/Admin/getServiceProviders'
      );
      const verifiedWorkers = response.data.payload.filter(worker => worker.isVerified);
      setWorkers(verifiedWorkers);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = React.useMemo(() => (loading ? [] : workers), [loading, workers]);

  const columns = React.useMemo(() => [
    { Header: "ID", accessor: "id" },
    { Header: "First Name", accessor: "firstName", sortType: "basic" },
    { Header: "Last Name", accessor: "lastName", sortType: "basic" },
    { Header: "Email", accessor: "email", sortType: "basic" },
    {
      Header: "Is Verified",
      accessor: "isVerified",
      sortType: "basic",
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      Header: "Is Blocked",
      accessor: "isBlocked",
      sortType: "basic",
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {!row.row.original.isBlocked &&
            <button
              onClick={() => handleBlock(row.row.original.id)}
              className="btn btn-danger"
            >
              Block
            </button>}
          <button
            onClick={() => handleDetails(row.row.original)}
            className="btn" style={{ backgroundColor: '#1daaf1' }}
          >
            Details
          </button>
        </div>
      ),
    },
  ], []);

  async function handleBlock(id) {
    try {
      const response = await axios.post(`https://localhost:7188/api/Admin/BlockServiceProvider?workerId=${id}`);
      window.alert("The worker has been blocked");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const handleDetails = (row) => {
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
    setPageSize,
    pageSize,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

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
                    style={{ cursor: "pointer" }}
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

export default Providers;
