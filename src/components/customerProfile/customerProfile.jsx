import React, { useState, useEffect } from "react";
import Style from "./customerProfile.module.css";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Mission from "../Mission/Mission.jsx";

export default function CustomerProfile() {
  let userId = localStorage.getItem('userId');
  const [profile, setProfile] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [error,setError] = useState(null);
  async function getProfile() {
    const resp = await axios.get(`https://localhost:7188/api/Customer/getCustomerProfile/${userId}`).catch((err) => {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    });
    if (resp) {
      console.log(resp.data);
      setProfile(resp.data.payload);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const compareValues = (values) => {
    if (!profile) return false;
    return Object.keys(profile).some(key => values[key] !== profile[key]);
  };
  async function handleUpdate(values){
   console.log("values",values);
   const resp = await axios.post(`https://localhost:7188/api/Customer/updateCustomerProfile/${userId}`,values).catch((err)=>{
    console.log(err.response.data.message);
    setError(err.response.data.message);
   });
   if(resp){
    window.alert(resp.data.message);
    window.location.reload();
   }
  }

  return (
    <>
    <div className="col-md-12 mt-5">
          <h1 className="text-center mb-1">Profile</h1>
        </div>
        {error == null ? '' : <div className="alert alert-danger col-md-12">{error}</div>}
      <div className={`p-5 ${Style.services}`}>

        {profile ?
          <div className="container bg-white p-5 rounded-2">
            <Formik
              initialValues={profile}
              onSubmit={(values) => {
                handleUpdate(values)
              }}
              validate={(values) => {
                setIsChanged(compareValues(values));
              }}
            >
              {({ handleChange }) => (
                <Form className={`${Style.form} row`}>
                  <div className="mb-3 mt-2 col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, firstName: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 mt-2 col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, lastName: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, email: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <Field
                      type="text"
                      name="userName"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, userName: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="userName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, phoneNumber: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <Field
                      type="text"
                      name="address"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setIsChanged(compareValues({ ...profile, address: e.target.value }));
                      }}
                    />
                    <ErrorMessage name="address" component="div" className="text-danger" />
                  </div>

                  {isChanged ?
                    <div className="col-md-12 text-center">
                      <button
                      type="submit"
                      className={`btn ${Style.btnMainprof} w-100`}
                    >Update</button>
                    </div>:<></>
                  }
                </Form>
              )}
            </Formik>
          </div>
          :
          <div>Loading...</div>
        }
      </div>
      <Mission />
    </>
  );
}
