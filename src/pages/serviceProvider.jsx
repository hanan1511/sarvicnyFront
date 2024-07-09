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
  import Swal from 'sweetalert2';
  const ServiceForProv = () => {
    let navigate = useNavigate();
    const [workers, setWorkers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const flattenServices = (workers) => {
      if (!workers) return [];
      return workers.flatMap(worker =>
        worker.services.map(service => ({
          id: worker.id,
          firstName: worker.firstName,
          lastName: worker.lastName,
          isVerified: worker.isVerified,
          serviceID: service.serviceID,
          serviceName: service.serviceName,
          providerServiceId:service.providerServiceID,
          parentServiceID: service.parentServiceID,
          parentServiceName: service.parentServiceName,
          criteriaID: service.criteriaID,
          criteriaName: service.criteriaName,
        }))
      );
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7188/api/Admin/GetProvidersAddtionalServiceRequests'
        );
        const flattenedData = flattenServices(response.data.payload);
        setWorkers(flattenedData);
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
  
    const data = React.useMemo(() => workers || [], [workers]);
  
    const columns = React.useMemo(
      () => [
        { Header: "ID", accessor: "id" },
        { Header: "First Name", accessor: "firstName", sortType: "basic" },
        { Header: "Last Name", accessor: "lastName", sortType: "basic" },
        { Header: "Is Verified", accessor: "isVerified", sortType: "basic", Cell: ({ value }) => (value ? "Yes" : "No") },
        { Header: "Service Name", accessor: "serviceName" },
        { Header: "Parent Service Name", accessor: "parentServiceName", Cell: ({ value }) => (value ? value : "N/A") },
        { Header: "Criteria ID", accessor: "criteriaID", Cell: ({ value }) => (value ? value : "N/A") },
        { Header: "Criteria Name", accessor: "criteriaName", Cell: ({ value }) => (value ? value : "N/A") },
        {
          Header: "Actions",
          accessor: "actions",
          Cell: ({ row }) => (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button
                onClick={() => handleAccept(row.original.id,row.original.providerServiceId)}
                className="btn btn-success"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(row.original.id,row.original.providerServiceId)}
                className="btn" style={{ backgroundColor: '#FF0000' }}
              >
                reject
              </button>
            </div>
          ),
        },
      ],
      []
    );
  
    async function handleAccept(id,serId){
      try {
        setLoading(true);
        const response = await axios.post(`https://localhost:7188/api/Admin/ApproveServiceForProvider?WorkerID=${id}&providerServiceId=${serId}`);
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'Service Accepted',
            text: 'Service Acceptance is done successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally reload the page or update the state to reflect the changes
            window.location.reload();
          });
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  
    const handleReject = async (id,serId) => {
        try {
            setLoading(true);
            const response = await axios.post(`https://localhost:7188/api/Admin/RejectServiceForProvider?WorkerID=${id}&providerServiceId=${serId}`);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Service Rejected',
                text: 'Service is Rejected!',
                confirmButtonText: 'OK'
              }).then(() => {
                // Optionally reload the page or update the state to reflect the changes
                window.location.reload();
              });
          } catch (err) {
            setError(err.response.data.message);
          }
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
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);
  
    const { globalFilter, pageIndex } = state;
  
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Service For Providers request" />
        {loading && <div className={`d-flex justify-content-center `}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
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
  
  export default ServiceForProv;
  