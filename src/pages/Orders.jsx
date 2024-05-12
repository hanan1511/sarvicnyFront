import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Page, ExcelExport, PdfExport, Inject } from '@syncfusion/ej2-react-grids';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Orders = () => {
  let navigate = useNavigate();
  const editing = { allowDeleting: true, allowEditing: true };
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const toolbarOptions = ['Search'];
  
  const handleRowClick = (rowData) => {
    console.log('Clicked Row Data:', rowData);
    navigate(`/admin/orderdet`, { state: { rowData } });
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
        flatOrder['providerFName'] = service.firstName;
      }
      return flatOrder;
    });
  };

  const flattenedOrders = orders ? flattenNestedData(orders) : [];

  const columns = [
    { field: 'orderId', headerText: 'Order ID', width: '200' },
    { field: 'customerId', headerText: 'Customer ID', width: '200' },
    { field: 'customerFN', headerText: 'Customer Name', width: '200' },
    { field: 'orderStatus', headerText: 'Order Status', width: '200' },
    { field: 'providerFName', headerText: 'Provider Name', width: '200' },
    { field: 'orderPrice', headerText: 'Order Price', width: '200' },
    { field: 'serviceID', headerText: 'Service ID', width: '200' },
    { field: 'serviceName', headerText: 'Service Name', width: '200' },
    { field: 'criteriaID', headerText: 'Criteria ID', width: '200' },
    { field: 'criteriaName', headerText: 'Criteria Name', width: '200' },
    { field: 'slotID', headerText: 'Slot ID', width: '200' },
    { field: 'startTime', headerText: 'Start Time', width: '200' },
    { field: 'servicePrice', headerText: 'Service Price', width: '200' },
    {
      field: 'ButtonColumn',
      headerText: 'Action',
      width:'200',
      template: () => (
        <button className="btn btn-success" onClick={() => handleRowClick}>
          Change
        </button>
      ),
    }
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers' Orders" />
      <div style={{ width: '100%' }}>
        <GridComponent
          dataSource={flattenedOrders}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
          allowResizing={true}
          rowSelected={(args) => handleRowClick(args.data)}
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
