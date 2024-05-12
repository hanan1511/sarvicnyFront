import {React,useState,useEffect} from "react";
import Header from "../components/Header.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function OrderDet(){
    const location = useLocation();
    const rowData = location.state?.rowData;
    console.log(rowData);
    const [workers,setWorkers] = useState(null);
    const [error, seterror] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7188/api/services/GetAllWorkersForService?serviceId=${rowData.serviceID}`
          );
          // Handle the response data
          // *******filter on service id too*********** 
        //   const filteredWorkers = response.data.payload.filter(worker => {
        //     return worker.isVerified && worker.services.some(service => service.serviceID === rowData.serviceID);
        //   });
      
          // Handle the response data
          setWorkers(response.data.payload);
        } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
          seterror('Error fetching data');
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    const initialValues = {
        providerName: '',
        providerID: '',
        email: '',
        criteriaName: '',
        description: '',
    };

    const handleChange=(id)=>{
        console.log("change");
    }
    return (
        <div class="m-2 m-md-5 mt-5 p-2 p-md-5 bg-white rounded-3xl">
            <Header category="Page" title="RE-Assign Worker" />
            <Formik initialValues={initialValues}>
                <Form className="container">
                    <div className="row">
                    <div className="mb-3 col-md-12">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <div name="firstName" className="form-control" >{rowData.customerFN}</div>
                    </div>

                    <div className="mb-3 col-md-12">
                        <label htmlFor="lastName" className="form-label">Customer ID</label>
                        <div name="lastName" className="form-control">{rowData.customerId}</div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="mb-3 col-md-12">
                        <label htmlFor="orderid" className="form-label">Order ID</label>
                        <div name="orderid" className="form-control">{rowData.orderId}</div>
                    </div>
                    </div>

                    <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="serviceName" className="form-label">Service Name</label>
                        <div name="serviceName" className="form-control">{rowData.serviceName}</div>
                    </div>

                    <div className="mb-3 col-md-6">
                        <label htmlFor="serviceprice" className="form-label">Service Price</label>
                        <div name="service" className="form-control">{rowData.orderPrice}</div>
                    </div>
                
                    <div className="mb-3 col-md-12">
                        <label htmlFor="serviceid" className="form-label">Service ID</label>
                        <div name="serviceid" className="form-control">{rowData.serviceID}</div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <div name="stuts" className="form-control">{rowData.orderStatus}</div>
                    </div>

                    <div className="mb-3 col-md-6">
                        <label htmlFor="slotetime" className="form-label">Slot Time</label>
                        <div name="slottime" className="form-control">{rowData.startTime}</div>
                    </div>
                
                    <div className="mb-3 col-md-12">
                        <label htmlFor="slotid" className="form-label">Slot ID</label>
                        <div name="slotid" className="form-control">{rowData.slotID}</div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-12">
                            <label htmlFor="newWorker" className="form-lable">New Avaliable Worker</label>
                            <Field as="select" name="woker" className="form-control">
                                <option value=""/>
                                {Array.isArray(workers) ? (
                                    workers.map((criterion) => (
                                <option key={criterion.criteriaID} value={criterion.criteriaID}>
                                {criterion.firstName}
                                </option>
                                ))
                                ) : (
                                <option value="" disabled>
                                    Loading workers...
                                </option>
                                )}
                            </Field>
                        </div>

                    </div> 
                    <div className="row d-flex justify-content-center">
                        <button className="col-md-4 btn btn-success" onClick={() => handleChange(rowData.id)}>Change</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}