import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Page, ExcelExport, PdfExport, Inject } from '@syncfusion/ej2-react-grids';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const Orders = () => {
  let navigate = useNavigate();
  const editing = { allowDeleting: true, allowEditing: true };
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");
  const toolbarOptions = ['Search'];

  const flattenNestedData = (data) => {
    return data.map(order => {
      const flatOrder = { ...order.payload };
      flatOrder['orderId'] = order.payload.orderId;
      flatOrder['customerId'] = order.payload.customerId;
      flatOrder['customerFN'] = order.payload.customerFN;
      flatOrder['orderStatus'] = order.payload.orderStatus;
      flatOrder['orderPrice'] = order.payload.orderPrice;
      flatOrder['providerFN'] = order.payload.providerFN;
      flatOrder['startTime'] = order.payload.startTime;
      flatOrder['dayOfWeek'] = order.payload.dayOfWeek;
      flatOrder['requestedDay'] = order.payload.requestedDay;
      if (order.payload.orderService && order.payload.orderService.length > 0) {
        const service = order.payload.orderService[0];
        flatOrder['serviceName'] = service.parentServiceName;;
        flatOrder['criteriaName'] = service.criteriaName;
        flatOrder['servicePrice'] = service.price;
      }
      return flatOrder;
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7188/api/Admin/getAllOrders');
      setOrders(response.data.payload);
    } catch (error) {
      console.error('Error fetching data:', error);
      seterror('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const flattenedOrders = orders ? flattenNestedData(orders) : [];

  const filteredOrders = selectedOrderStatus === "All"
    ? flattenedOrders
    : flattenedOrders.filter(order => order.orderStatus === selectedOrderStatus);

  const handleStatusChange = (event) => {
    setSelectedOrderStatus(event.target.value);
  };

  async function handleDone(rowData){
    setLoading(true);
    const resp = await axios.post(`https://localhost:7188/api/Admin/MarkOrderComplete/${rowData.orderId}`).catch((err)=>{
      seterror(err.response.data.message);
      console.log(err.response.data.message);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Order is not done',
        text: 'ERROR in Making order Done',
        confirmButtonText: 'OK'
      }).then(() => {
        // Optionally reload the page or update the state to reflect the changes
        window.location.reload();
      });
    });
    if(resp){
      Swal.fire({
        icon: 'success',
        title: 'Order is Completed',
        text: 'Order is Completed successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        // Optionally reload the page or update the state to reflect the changes
        window.location.reload();
      });
    }
  }

  const columns = [
    { field: 'orderId', headerText: 'Order ID', width: '200' },
    { field: 'customerId', headerText: 'Customer ID', width: '200' },
    { field: 'customerFN', headerText: 'Customer Name', width: '200' },
    { field: 'orderStatus', headerText: 'Order Status', width: '200' },
    {
      field: 'ButtonColumn',
      headerText: 'MarkDone',
      width: '200',
      template: (props) => (
        props.orderStatus === 'Done' ? (
          <button className="btn btn-success" onClick={() => handleDone(props)}>
            Complete
          </button>
        ) : null
      ),
    },
    { field: 'providerFN', headerText: 'Provider Name', width: '200' },
    { field: 'orderPrice', headerText: 'Order Price', width: '200' },
    { field: 'serviceName', headerText: 'Service Name', width: '200' },
    { field: 'criteriaName', headerText: 'Criteria Name', width: '200' },
    { field: 'requestedDay', headerText: 'Order Date', width: '200' },
    { field: 'startTime', headerText: 'Start Time', width: '200' },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers' Orders" />
      {loading && <div className={`d-flex justify-content-center`}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
      <div className="row mb-3">
        <label htmlFor="orderStatus" className="form-label">Select Order Status:</label>
        <select
          id="orderStatus"
          className="form-select w-90"
          value={selectedOrderStatus}
          onChange={handleStatusChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div style={{ width: '100%' }}>
        <GridComponent
          dataSource={filteredOrders}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
          allowResizing={true}
          rowSelected={(args) => handleDone(args.data)}
        >
          <ColumnsDirective>
            {columns.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Page, ExcelExport, PdfExport]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Orders;
