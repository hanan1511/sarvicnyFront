import Style from "./Profile.module.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'; // Assuming you have toggle icons imported
import Swal from 'sweetalert2';
export default function Profile() {
  let userId = localStorage.getItem('userId');
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avail, setAvail] = useState(null);
  const [image, setImage] = useState(null);
  const [districts, setDistricts] = useState([]);

  async function handleDistrictToggle(id, currentEnable) {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${currentEnable ? 'disable' : 'enable'} this district?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'Cancel',
      });
  
      if (confirmed.isConfirmed) {
        // Call your API to toggle district enable status
        const endpoint = currentEnable ? `DisableDistrict` : `EnableDistrict`;
        const response = await axios.post(`https://localhost:7188/api/District/${endpoint}/${userId}?districtID=${id}`);
        
        if (response && response.data && !response.data.isError) {
          // Update districts state or handle success as needed
          const updatedDistricts = districts.map(district =>
            district.districtID === id ? { ...district, enable: !currentEnable } : district
          );
          setDistricts(updatedDistricts);
  
          Swal.fire('Done!', `District ${currentEnable ? 'disabled' : 'enabled'} successfully.`, 'success');
        } else if (response && response.data && response.data.isError) {
          Swal.fire('Error!', response.data.message, 'error');
        } else {
          Swal.fire('Error!', 'Failed to toggle district.', 'error');
        }
      } else if (confirmed.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Operation cancelled.', 'info');
      }
    } catch (error) {
      console.error('Error toggling district enable status:', error);
      Swal.fire('Error!', error.message, 'error');
    }
  }
  
  async function getProfile() {
    try {
      const response = await axios.get(`https://localhost:7188/api/ServiceProvider/showProviderProfile?providerId=${userId}`);
      if (!response.data.isError) {
        setProfile(response.data.payload);
      }

      const response1 = await axios.get(`https://localhost:7188/api/ServiceProvider/getServiceProviderAvailability/${userId}`);
      if (!response1.data.isError) {
        setAvail(response1.data.payload);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError(error.message);
    }
  }

  async function getImage() {
    try {
      const response = await axios.get(`https://localhost:7188/api/Worker/getWorkerImage?providerId=${userId}`);
      if (response && response.data.payload) {
        setImage(response.data.payload);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setError(error.message);
    }
  }

  async function getDistricts() {
    try {
      const response = await axios.get(`https://localhost:7188/api/District/getProviderDistricts/${userId}`);
      if (!response.data.isError) {
        setDistricts(response.data.payload);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.post(`https://localhost:7188/api/ServiceProvider/removeAvailability?availabilityId=${id}&providerId=${userId}`);
      if (!response.data.isError) {
        alert("Day removed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting availability:', error);
      setError(error.message);
    }
  }

  const base64ToImageUrl = (base64String) => `data:image/jpeg;base64,${base64String}`;

  useEffect(() => {
    getProfile();
    getImage();
    getDistricts();
  }, []);

  return (
    <>
      <div className={`${Style.corners}`}>
        <img src="/upperCorner2.png" className={`${Style.corner3}`} />
      </div>
      <div className="container justify-content-center">
        <div className={`row d-flex justify-content-center align-item-center mb-5 ${Style.headers}`}>
          <div className="col-md-12">
            <p className={`${Style.bigHead}`}>PROFILE</p>
            <p className={`${Style.smallHead}`}>PROFILE</p>
            <p className={`${Style.desc}`}>See all your profile details</p>
          </div>
        </div>

        <div className={`${Style.formCont} col-md-12 `}>
          <div className="col-md-5">
            {avail ?
              avail.map((elem) => (
                <div className={`container d-flex flex-wrap justify-content-center mt-3`} key={elem.providerAvailabilityID}>
                  <div className={`${Style.cards} container position-relative`}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`position-absolute ${Style.icondel}`}
                      style={{ top: '10px', right: '10px', cursor: 'pointer' }}
                      onClick={() => handleDelete(elem.providerAvailabilityID)}
                    />
                    <h5 className="text-center mt-3 col-md-12">{elem.dayOfWeek}</h5>
                    {elem.slots.map((slot, index) => (
                      <div className={`${Style.slot} col-md-4 d-flex m-1 py-1`} key={index}>
                        <p>Start: {slot.startTime} </p>
                        <p>End: {slot.endTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
              :
              <div>Availability is loading...</div>
            }
          </div>

          {profile ?
            <Formik initialValues={{}} onSubmit={() => { }}>
              <div className="col-md-5">
                {image &&
                  <div className="mb-3 col-md-12">
                    <label htmlFor="profileImage" className="form-label">Profile Image</label>
                    <br />
                    <img src={base64ToImageUrl(image)} alt="Profile" className={`${Style.profileImage}`} />
                  </div>
                }
                <Form className={`${Style.form} row`}>
                  <h4 className="text-center">Personal Info</h4>

                  <div className="mb-3 mt-5 col-md-6">
                    <label htmlFor="firstName" className="form-label ">First Name</label>
                    <Field type="text" name="firstName" className="form-control" value={profile.FirstName} />
                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 mt-5 col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <Field type="text" name="lastName" className="form-control" value={profile.LastName} />
                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="email" className="form-label ">Email</label>
                    <Field type="email" name="email" className="form-control " value={profile.Email} />
                    <ErrorMessage name="email" component="div" className="text-danger " />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <Field type="text" name="userName" className="form-control" value={profile.UserName} />
                    <ErrorMessage name="userName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <Field type="text" name="phone" className="form-control" value={profile.PhoneNumber} />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="national" className="form-label">National ID</label>
                    <Field type="text" name="national" className="form-control" value={profile.NationalID} />
                    <ErrorMessage name="national" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3 col-md-12">
                    <label htmlFor="criminal" className="form-label">Average Customer Rate</label>
                    <Field type="text" name="criminal" className="form-control" value={profile.AvgCustomerRate} />
                    <ErrorMessage name="criminal" component="div" className="text-danger" />
                  </div>

                  <div className="mb-5 col-md-12">
                    <label htmlFor="orders" className="form-label">Number of completed orders</label>
                    <Field type="text" name="orders" className="form-control" value={profile.CompletedOrdersCount} />
                    <ErrorMessage name="orders" component="div" className="text-danger" />
                  </div>

                  {/* Rendering Districts with Switch Buttons */}
                  <div className="mb-3 col-md-12">
                    <h4>Districts you serve</h4>
                    {districts.length > 0 ?
                      districts.map((district) => (
                        <div key={district.districtID} className="mb-3 mb-3 d-flex align-items-center">
                          <label className={`${Style.formLabel} form-label`} style={{ minWidth: '100px',fontSize:'20px' }}>{district.districtName}</label>
                          <FontAwesomeIcon
                            icon={district.enable ? faToggleOn : faToggleOff}
                            className={`position-relative ${Style.toggleIcon} ${district.enable ? 'text-success' : 'text-secondary'}`}
                            size="2x" // Adjust size as needed
                            onClick={() => handleDistrictToggle(district.districtID, district.enable)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ))
                      : <div>No districts found.</div>
                    }
                  </div>

                </Form>
              </div>
            </Formik>
            :
            <div>Loading profile...</div>
          }
        </div>
      </div>
      <div className={`${Style.downcorn}`}>
        <img src="/downcorner4.png" className={`${Style.corner2}`} />
      </div>
    </>
  );
}
