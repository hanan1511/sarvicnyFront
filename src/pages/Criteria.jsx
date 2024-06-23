import React, { useState } from "react";
import Header from "../components/Header.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

export default function Criteria() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [districtName, setDistrictName] = useState('');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    criteriaName: Yup.string().required('Criteria Name is required'),
    description: Yup.string().required('Description is required'),
  });

  async function addCriteria(values) {
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7188/api/Criteria', values);
      if (response.data.criteriaID) {
        window.alert("Criteria added successfully");
      } else {
        window.alert("Failed to add criteria");
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addDistrict() {
    setIsLoading(true);
    try {
      const response = await axios.post('https://localhost:7188/api/District', { districtName });
      if (response.data.districtID) {
        window.alert("District added successfully");
        setShowModal(false);
      } else {
        window.alert("Failed to add district");
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    criteriaName: '',
    description: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    const formData = {
      criteriaName: values.criteriaName,
      description: values.description,
    };
    addCriteria(formData);
    setSubmitting(false);
  };

  return (
    <div className="m-2 m-md-5 mt-5 p-2 p-md-5 bg-white rounded-3xl">
      <div className="d-flex justify-content-between align-items-center">
        <Header category="Page" title="Add Criteria" />
        <Button variant="primary" className="text-dark" onClick={() => setShowModal(true)}>Add District</Button>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <Field type="text" name="firstName" className="form-control" />
            <ErrorMessage name="firstName" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <Field type="text" name="lastName" className="form-control" />
            <ErrorMessage name="lastName" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="criteriaName" className="form-label">Criteria Name</label>
            <Field type="text" name="criteriaName" className="form-control" />
            <ErrorMessage name="criteriaName" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <Field as="textarea" name="description" className="form-control" />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary text-dark">Submit</button>
        </Form>
      </Formik>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add District</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="districtName" className="form-label">District Name</label>
            <input
              type="text"
              id="districtName"
              className="form-control"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
            />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="text-dark" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" className="text-dark" onClick={addDistrict} disabled={isLoading}>Add District</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
