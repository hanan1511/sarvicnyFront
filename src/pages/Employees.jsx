import {React,useState,useEffect} from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { employeesData, employeesGrid } from '../data/dummy';
import  Header  from '../components/Header.jsx';
import axios from 'axios';
const Employees = () => {
  const toolbarOptions = ['Search'];
  const [cutomers,setCustomers]=useState(null);
  const [error,seterror]=useState(null);
  const editing = { allowDeleting: true, allowEditing: true };

  const columns=[
    {
      field:'id',
      headerText:'Customer ID',
      width:'200',
      textAlign:'center'
    },
    {
        field:'firstName',
        headerText:'Customer Name',
        width:'200',
        textAlign:'center'
    },
    {
        field:'lastName',
        headerText:'Last Name',
        width:'200',
        textAlign:'center'
    },
    
    {
      field:'email',
      headerText:'Email',
      width:'200',
      textAlign:'center'
    },
  ]

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7188/api/Admin/getCustomers'
      );
      // Handle the response data
      setCustomers(response.data.payload);
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      seterror('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={cutomers}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {columns.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;
