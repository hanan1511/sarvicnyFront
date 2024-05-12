import { boolean } from "yup";
import Table from "../Tables/Table";
import Style from "./Landpage.module.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from"../context/AppContext";

function Landpage(){
    let navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [orders,setOrders]=useState(null);
    const {userId} = useAppContext();
    console.log(userId);
    //const workerid="529dba94-89a1-46a4-bdc1-da5f39e6d7c2";
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7188/api/ServiceProvider/getAllOrders?providerID=${userId}`
            );
            setOrders(response.data.payload);
            console.log(response.data);
            console.log(response.data);
        } catch (error) {
          // Handle errors
            console.error('Error fetching data:', error);
          //seterror('Error fetching data');
        }finally {
          //setLoading(false);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleRowClick = (rowData) => {
        console.log('Clicked Row Data:', rowData);
        const id=rowData.orderId;
        navigate(`/worker/reqdetail`,{ state: { id } });
    };

    const flattenNestedData = (data) => {
        return data.map(order => {
          const flatOrder = { ...order.payload };
          flatOrder['orderId'] = order.payload.orderId;
          flatOrder['customerId'] = order.payload.customerId;
          flatOrder['customerFN'] = order.payload.customerFN;
          flatOrder['orderStatus'] = order.payload.orderStatus;
          flatOrder['orderPrice'] = order.payload.orderPrice;
          if (order.payload.orderService && order.payload.orderService.length > 0) {
            const service = order.payload.orderService[0];
            flatOrder['serviceID'] = service.serviceID;
            flatOrder['serviceName'] = service.serviceName;
            flatOrder['criteriaID'] = service.criteriaID;
            flatOrder['criteriaName'] = service.criteriaName;
            flatOrder['slotID'] = service.slotID;
            flatOrder['startTime'] = service.startTime;
            flatOrder['servicePrice'] = service.price;
          }
          return flatOrder;
        });
      };
    
      const flattenedOrders = orders ? flattenNestedData(orders) : [];

      const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  const handleStatusChange = (event) => {
    setSelectedOrderStatus(event.target.value);
  };

  const filteredOrders = selectedOrderStatus === "All"
    ? flattenedOrders
    : flattenedOrders.filter(order => order.orderStatus === selectedOrderStatus);

      const columns = [
        { field: 'customerFN', headerText: 'Customer Name', width: '200' },
        { field: 'orderStatus', headerText: 'Order Status', width: '200' },
        { field: 'orderPrice', headerText: 'Order Price', width: '200' },
        { field: 'serviceName', headerText: 'Service Name', width: '200' },
        { field: 'criteriaName', headerText: 'Criteria Name', width: '200' },
        { field: 'startTime', headerText: 'Start Time', width: '200' },
        { field: 'servicePrice', headerText: 'Service Price', width: '200' },
        {
            field: 'ButtonColumn',
            headerText: 'Action',
            width: '100',
            template: () => (
                <button className={`${Style.button}`} onClick={() => handleRowClick}>
                  Details
                </button>
              ),
            textAlign: 'Center',
          },
    ];
    // const data = [
    //     { CustomerName: 10248, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     { CustomerName: 10249, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     { CustomerName: 10250, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     { CustomerName: 10251, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     { CustomerName: 10252, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     { CustomerName: 10253, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:true },
    //     { CustomerName: 10254, CustomerAddress: 'VINET', OrderTime: 'Vins et alcools Chevalier', OrderDate: '1996-07-04',   OrderStatus:false },
    //     // ... more data
    // ];
    
    return(
        <>
        <div className={`${Style.land}`}>
            <div className="row d-flex justify-content-center align-items-center ">
                <img src="logo2.png" className={`${Style.imgo} col-md-5 img-fluid `}/>
                <p className="col-md-6">Welcome to Employees Section</p>
            </div>
        </div>
        <div className="container py-5">
            <div className="row d-flex justify-content-center align-item-center ">
                <div className="col-md-12">
                    <p className={`${Style.bigHead}`}>Requests</p>
                    <p className={`${Style.smallHead}`}>Requests</p>
                    <p className={`${Style.desc}`}>All Customers Requests for this week</p>
                </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="orderStatus" className="form-label">Select Order Status:</label>
              <select
                id="orderStatus"
                className={`form-select w-90 ${Style.orderstatus}`}
                value={selectedOrderStatus}
                onChange={handleStatusChange}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <div className="row d-flex justify-content-center align-item-center ">
                <Table data={filteredOrders} columns={columns} handleRowClick={handleRowClick} className={`col-md-12 ${Style.table}`}/>
            </div>
        </div>
        </>
    );
}
export default Landpage;