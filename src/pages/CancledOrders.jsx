import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

const CanceledOrders = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy data
  const dummyData = [
    {
      id: 1,
      district: "District 1",
      customerName: "John Doe",
      workerName: "Jane Smith",
      orderId: "ORD001",
    },
    {
      id: 2,
      district: "District 2",
      customerName: "Alice Johnson",
      workerName: "Bob Brown",
      orderId: "ORD002",
    },
    {
      id: 4,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 5,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 6,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 7,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 8,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 9,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 10,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 11,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 12,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 13,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 14,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 15,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 16,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 17,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
    {
      id: 18,
      district: "District 3",
      customerName: "Charlie Green",
      workerName: "Dave White",
      orderId: "ORD003",
    },
  ];

  const data = useMemo(() => dummyData, []);

  const columns = useMemo(
    () => [
      { Header: "District", accessor: "district", sortType: "basic" },
      { Header: "Customer Name", accessor: "customerName", sortType: "basic" },
      { Header: "Worker Name", accessor: "workerName", sortType: "basic" },
      { Header: "Order ID", accessor: "orderId", sortType: "basic" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!row.original.isBlocked && (
              <button
                onClick={() => handleSuggestions(row.original.id)}
                className="btn btn-success"
              >
                Suggestions
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  );
  const handleSuggestions = (id) => {
    navigate('/admin/suggestedWorkers', { state: { orderId: id } });
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
      <Header category="Page" title="Canceled Orders" />
      <div className="container-fluid mt-4">

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

export default CanceledOrders;
