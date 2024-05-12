import {React,useState} from "react";
import Header from "../components/Header.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function RequestDet() {

    let navigate = useNavigate();
    const location = useLocation();
    const rowData = location.state?.rowData;
    console.log(rowData);
    const [error, seterror] = useState(null);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        criteriaName: '',
        description: '',
    };
  

    async function handleAccept(id){
        // Navigate to another page and pass the row data as props
        const response = await axios.post(`https://localhost:7188/api/Admin/ApproveServiceProvider?WorkerID=${id}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
      if(response){
        window.alert("the worker accepted");
        navigate('/admin/Providers Requests');
      }else{
        console.log(error);
      }
    }

    async function handleReject(id){
        // Navigate to another page and pass the row data as props
        const response = await axios.post(`https://localhost:7188/api/Admin/RejectServiceProvider?WorkerID=${id}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
      if(response){
        window.alert("the worker rejected");
        navigate('/admin/')
      }else{
        console.log(error);
      }
    }

    async function handleBlock(id){
        // Navigate to another page and pass the row data as props
        const response = await axios.post(`https://localhost:7188/api/Admin/BlockServiceProvider?workerId=${id}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
      if(response){
        window.alert("the worker Blocked");
        navigate("/admin/service Providers");
      }else{
        console.log(error);
      }
    }

    async function handleUnblock(id){
        // Navigate to another page and pass the row data as props
        const response = await axios.post(`https://localhost:7188/api/Admin/UnBlockServiceProvider?workerId=${id}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
      if(response){
        window.alert("the worker UnBlocked");
        navigate("/admin/service Providers");
      }else{
        console.log(error);
      }
    }

    return (
        <div class="m-2 m-md-5 mt-5 p-2 p-md-5 bg-white rounded-3xl">
            <Header category="Page" title={rowData.isVerified?"Provider Details":"Request Details"} />
            <Formik initialValues={initialValues}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <div name="firstName" className="form-control" >{rowData.firstName}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <div name="lastName" className="form-control">{rowData.lastName}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div type="email" name="email" className="form-control">{rowData.email}</div>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="service" className="form-label">Services Names</label>
                        {rowData.services[0]? 
                         rowData.services.map((service, index) => (
                            <div name={`service${index}`} className="form-control mb-2"  key={index}>{service.serviceName}</div>
                        )):
                        <div name="service" className="form-control">N/A</div>
                    }
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="price" className="form-label">Service Price</label>
                        <div name="price" className="form-control">{"critria"}</div>
                    </div> */}

                    {rowData.isVerified ? (
                        // If the worker is verified
                        <div className="row d-flex justify-content-center">
                            {rowData.isBlocked ? (
                            // If the worker is blocked, show the "Unblock" button
                            <button className="col-md-4 btn btn-success" onClick={() => handleUnblock(rowData.id)}>Unblock</button>
                            ) : (
                            // If the worker is not blocked, show the "Block" button
                            <button className="col-md-4 btn btn-danger" onClick={() => handleBlock(rowData.id)}>Block</button>
                        )}
                        </div>
                    ) : (
                        // If the worker is not verified, show the "Accept" and "Reject" buttons
                        <div className="row d-flex justify-content-center">
                            <button className="col-md-4 btn btn-success" onClick={() => handleAccept(rowData.id)}>Accept</button>
                            <button className="col-md-4 btn btn-danger ml-5" onClick={() => handleReject(rowData.id)}>Reject</button>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
}
