import React, { useState,useEffect } from "react";
import Header from "../components/Header.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Service() {

  const [error,seterror]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[load,setLoading]=useState(true);
  const[critria,setCritria]=useState(null);
  const[res,setRes]=useState(null);
  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required('Service Name is required'),
    price: Yup.string().required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://localhost:7188/api/Criteria/GetAll'
      );
      // Handle the response data
      setCritria(response.data.payload);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      seterror('Error fetching data');
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  async function addService(values,criteriaID) {
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7188/api/services/AddService', values);
  
      if (!response.data.isError) {
        window.alert("First step done");
        addServiceCritria(criteriaID,response.data.payload.serviceID);
      } else {
        window.alert("Failed to add service");
      }
    } catch (err) {
      if (err.response) {
        console.error('Response data:', err.response.data);
      }
      seterror(err.response?.data?.message || 'Failed to add service');
    }
  }

  async function addServiceCritria(critriaID,serviceID){
    setIsLoading(true);
    const response  = await axios.post(`https://localhost:7188/api/Criteria/addservice?criteriaId=${critriaID}&serviceId=${serviceID}`).catch((err) => {
      seterror(err.response.data.message);
      setIsLoading(false);
    });
    if(!response.data.isError){
      window.alert("Service is add successfuly");
    }else{
      window.alert("failed to add service");
    }
  }

  const initialValues = {
    serviceName: '',
    description: '',
    price: '',
    availabilityStatus: '',
    parentServiceID: '',
  };
  

  const onSubmit = (values, { setSubmitting }) => {
    let formData={};
    if(values.parentServiceID){
      formData = {
        serviceName: values.serviceName,
        description: values.description,
        price: parseInt(values.price),
        availabilityStatus: values.availabilityStatus,
        parentServiceID: values.parentServiceID,
    };
    }
    else{
      formData = {
        serviceName: values.serviceName,
        description: values.description,
        price: parseInt(values.price),
        availabilityStatus: values.availabilityStatus,
    };
    }
    addService(formData,values.criteriaID);
    setSubmitting(false);
    // if(res){
    //     addServiceCritria(values.criteriaID,res);
    //     setSubmitting(false);
    // }
  };
  return (
    <div class="m-2 m-md-5 mt-5 p-2 p-md-5 bg-white rounded-3xl">
      <Header category="Page" title="Add Service" />
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="serviceName" className="form-label">Service Name</label>
          <Field type="text" name="serviceName" className="form-control" />
          <ErrorMessage name="serviceName" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <Field type="text" name="price" className="form-control" />
          <ErrorMessage name="price" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="availabilityStatus" className="form-label">availabilityStatus</label>
          <Field type="text" name="availabilityStatus" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor=" parentServiceID" className="form-label">Parent ServiceID if there</label>
          <Field type="text" name=" parentServiceID" className="form-control" />
        </div>
        <div className="mb-3">
            <label htmlFor="criteriaID" className="form-label">Criteria </label>
            <Field as="select" name="criteriaID" className="form-control">
    <option value=""/>
    {Array.isArray(critria) ? (
      critria.map((criterion) => (
        <option key={criterion.criteriaID} value={criterion.criteriaID}>
          {criterion.criteriaName}
        </option>
      ))
    ) : (
      <option value="" disabled>
        Loading criteria...
      </option>
    )}
  </Field>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <Field as="textarea" name="description" className="form-control" />
          <ErrorMessage name="description" component="div" className="text-danger" />
        </div>

        <button type="submit" id="but" disabled={isLoading} className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
    </div>
  );
}
