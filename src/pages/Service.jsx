import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Criteria from './../components/Home/criteria/criteria';

export default function Service() {
  const [error, seterror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoading] = useState(true);
  const [criteria, setCriteria] = useState(null);
  const [parentServices, setParentServices] = useState(null);
  const [filteredParentServices, setFilteredParentServices] = useState([]);
  const [res, setRes] = useState(null);

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required('Service Name is required'),
    price: Yup.string().required('Price is required'),
    description: Yup.string().required('Description is required'),
    criteriaID: Yup.string().required('Criteria is required')
  });

  const fetchParentServices = async () => {
    try {
      const res = await axios.get('https://localhost:7188/api/services/GetAllParentServices');
      if (!res.data.isError) {
        setParentServices(res.data.payload);
      }
    } catch (error) {
      console.error('Error fetching parent services:', error);
      seterror('Error fetching parent services');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7188/api/Criteria/GetAll');
      setCriteria(response.data.payload);
      fetchParentServices(); // Fetch parent services after fetching criteria
    } catch (error) {
      console.error('Error fetching criteria:', error);
      seterror('Error fetching criteria');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchParentServices();
  }, []);

  const filterParentServices = (criteriaID) => {
    if (Array.isArray(parentServices)) {
      const filteredServices = parentServices.filter(service => service.criteriaID === criteriaID);
      setFilteredParentServices(filteredServices);
    }
  };

  async function addService(values,CriteriaId) {
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7188/api/services/AddService', values);
      if (!response.data.isError) {
        if(!response.data.payload.criteriaID){
          window.alert("First step done");
        addServiceCriteria(CriteriaId, response.data.payload.serviceID);
        }else{
          window.alert("Service is added successfully");
        }
        
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

  async function addServiceCriteria(criteriaID, serviceID) {
    setIsLoading(true);
    const response = await axios.post(`https://localhost:7188/api/Criteria/addservice?criteriaId=${criteriaID}&serviceId=${serviceID}`).catch((err) => {
      seterror(err.response.data.message);
      setIsLoading(false);
    });
    if (!response.data.isError) {
      window.alert("Service is added successfully");
    } else {
      window.alert("Failed to add service");
    }
  }

  const initialValues = {
    serviceName: '',
    description: '',
    price: '',
    availabilityStatus: '',
    parentServiceID: '',
    criteriaID: ''
  };

  const onSubmit = (values, { setSubmitting }) => {
    let formData = {
      serviceName: values.serviceName,
      description: values.description,
      parentServiceID: values.parentServiceID || null
    };
    addService(formData, values.criteriaID);
    setSubmitting(false);
  };

  return (
    <div class="m-2 m-md-5 mt-5 p-2 p-md-5 bg-white rounded-3xl">
      <Header category="Page" title="Add Service" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
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
              <label htmlFor="availabilityStatus" className="form-label">Availability Status</label>
              <Field type="text" name="availabilityStatus" className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="criteriaID" className="form-label">Criteria</label>
              <Field as="select" name="criteriaID" className="form-control" onChange={(e) => {
                setFieldValue('criteriaID', e.target.value);
                filterParentServices(e.target.value);
              }}>
                <option value="" />
                {Array.isArray(criteria) ? (
                  criteria.map((criterion) => (
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
              <label htmlFor="parentServiceID" className="form-label">Parent Service</label>
              <Field as="select" name="parentServiceID" className="form-control">
                <option value="" />
                {Array.isArray(filteredParentServices) ? (
                  filteredParentServices.map((parent) => (
                    <option key={parent.serviceId} value={parent.serviceId}>
                      {parent.serviceName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading parent services...
                  </option>
                )}
              </Field>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field as="textarea" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <button type="submit" id="but" disabled={isLoading} className="btn btn-primary text-dark">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
