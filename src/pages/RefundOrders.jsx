import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const RefundOrders = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setData] = useState([]);

  async function getRefund(){
    setLoading(true);
    const resp=await axios.get(`https://localhost:7188/api/Admin/getAllOrdersNeedRefund`).catch((err)=>{
      setError(err.response.data.message);
    });
    if(resp){
      console.log(resp.data.payload);
      setData(resp.data.payload);
      setLoading(false);
    }
  }
  const flattenNestedData = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }
      return data.flatMap(order => {
        const trans=order.transactionPaymentID;
        return order.ordersDetails.map(orderDetail => {
          const payload = orderDetail.payload;
          
          const flatOrder = {
            transactionid: trans,
            orderId: payload.orderId,
            orderDate: payload.orderDate,
            orderStatus: payload.orderStatus,
            customerCancelDate: payload.customerCancelDate,
            customerId: payload.customerId,
            customerFN: payload.customerFN,
            customerLastName: payload.customerLastName,
            providerId: payload.providerId,
            providerFN: payload.providerFN,
            providerLN: payload.providerLN,
            orderPrice: payload.orderPrice,
            requestedSlotID: payload.requestedSlotID,
            requestedDay: payload.requestedDay,
            dayOfWeek: payload.dayOfWeek,
            startTime: payload.startTime,
            districtID: payload.districtID,
            districtName: payload.districtName,
            address: payload.address,
            price: payload.price,
            problem: payload.problem,
            providerRating: payload.providerRating,
            providerComment: payload.providerComment,
            customerRating: payload.customerRating,
            customerComment: payload.customerComment,
            orderService: Array.isArray(payload.orderService) ? payload.orderService.map(service => ({
              serviceId: service.serviceId,
              serviceName: service.serviceName,
              parentServiceID: service.parentServiceID,
              parentServiceName: service.parentServiceName,
              criteriaID: service.criteriaID,
              criteriaName: service.criteriaName,
              price: service.price
            })) : []
          };
    
          return flatOrder;
        });
      });
    
  };

  useEffect(() => {
      getRefund();
  }, []);

  const data = useMemo(() => flattenNestedData(orders), [orders]);

    const columns = useMemo(
    () => [
      { Header: "District", accessor: "districtName", sortType: "basic" },
      { Header: "Customer Name", accessor: "customerFN", sortType: "basic" },
      { Header: "Worker Name", accessor: "providerFN", sortType: "basic" },
      { Header: "Price", accessor: "orderPrice", sortType: "basic" },
      { Header: "Start Time", accessor: "startTime", sortType: "basic" },
      { Header: "Address", accessor: "address", sortType: "basic" },
      { Header: "Problem", accessor: "problem", sortType: "basic" },
      { Header: "Order ID", accessor: "orderId", sortType: "basic" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!row.original.isBlocked && (
              <button
                onClick={() => handleSuggestions(row.original.transactionid)}
                className="btn btn-success"
              >
                Refund
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  async function handleSuggestions(trans){
    setLoading(true);
    const resp = await axios.post(`https://localhost:7188/api/Admin/refund?transactionPaymentId=${trans}`).catch((err)=>{
        setError(err.response.data.message);
        console.log(err.response.data.message);
        setLoading(false);
    });
    if(resp){
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'Refund is Done',
            text: 'Refund is done successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally reload the page or update the state to reflect the changes
            window.location.reload();
        });
    }
  }

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
      
      <Header category="Page" title="Refund Orders" />
      <div className="container-fluid mt-4">
      {loading && <div className={`d-flex justify-content-center`}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
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

export default RefundOrders;
