
// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "./ServiceReg.module.css";
// import { Audio } from "react-loader-spinner";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import upperCorner2 from "../../assets/upperCorner2.png";
// import upperCorner from "../../assets/upperCorner.png";
// import downCorner from "../../assets/downCorner.png";
// import logo from "../../assets/logo.png";
// function ServicReg() {
//   let navigate = useNavigate();
//   const [error, seterror] = useState(null);
//   const [criteriaList, setCriteriaList] = useState([]);
//   const [servicesList, setServicesList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     serviceId: "",
//     Price: 0,
//   });
//   const location = useLocation();
//   let workerId = location.state?.workerIdProp;
//   console.log("id",workerId);
// if(!workerId){
//   workerId="a9954788-6b1f-4deb-b262-66718c0fd89e"
// }
//   async function registerForm() {
//     setIsLoading(true);
//     const response1 = await axios
//       .post(
//         `https://localhost:7188/api/ServiceProvider/RegisterService?workerId=${workerId}&serviceId=${formValues.serviceId}&price=${formValues.Price}`
//       )
//       .catch((err) => {
//         setIsLoading(false);
//         seterror(err.response1.data.message);
//         console.log(response1.data);
//       });

//     if (!response1.isError) {
//       setIsLoading(false);
//       navigate("/provider/waiting");
//       console.log(response1.data);
//     }
//   }

//   async function fetchCriteria() {
//     try {
//       const response = await axios.get(
//         "https://localhost:7188/api/Criteria/GetAll"
//       );

//       if (response.status >= 200 && response.status < 300) {
//         // Filter out criteria with empty services
//         const filteredCriteria = response.data.payload.filter(
//           (criteria) => criteria.services.length > 0
//         );

//         setCriteriaList(filteredCriteria);

//         // Set services initially based on the first criteria (if available)
//         if (filteredCriteria.length > 0) {
//           setServicesList(filteredCriteria[0].services);
//           // Set the default criteriaId in formValues
//           setFormValues((prevValues) => ({
//             ...prevValues,
//             criteriaId: filteredCriteria[0].criteriaID,
//           }));
//         }
//       } else {
//         throw new Error(`Request failed with status code ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching criteria:", error);
//     }
//   }

//   useEffect(() => {
//     fetchCriteria();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formValues);
//     registerForm();
//   };

//   const handleCriteriaChange = (e) => {
//     const selectedCriteriaId = e.target.value;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       criteriaId: selectedCriteriaId,
//     }));

//     // Find the selected criteria and set the services
//     const selectedCriteria = criteriaList.find(
//       (criteria) => criteria.criteriaID === selectedCriteriaId
//     );

//     if (selectedCriteria) {
//       setServicesList(selectedCriteria.services);
//     } else {
//       setServicesList([]); // Clear services if the selected criteria is not found
//     }
//     console.log(selectedCriteria);
//     console.log(servicesList);
//   };

//   return (
//     <>
//       <div className={`${Style.corners}`}>
//         <img src={upperCorner2} className={`${Style.corner3}`} />
//         <img src={upperCorner} className={`${Style.corner}`} />
//       </div>
//       <section className={` ${Style.signUpPage}`}>
//         <div className="container py-5">
//           <div className="row d-flex justify-content-center align-item-center mb-5 ">
//             <div className="col-md-12">
//                     <p className={`${Style.bigHead}`}>ADD SERVICE</p>
//                     <p className={`${Style.smallHead}`}>ADD SERVICE</p>
//                     <p className={`${Style.desc}`}>Add service you want to serve</p>
//               </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <img
//                 src={logo}
//                 className={`${Style.imgo} img-fluid  h-60 `}
//               />
//             </div>
//             <div className="col-md-6">
//               <div
//                 className={` ${Style.signUpForm} p-4 rounded-3`}
//               >
//                 <div className="d-flex justify-content-center align-item-center">
//                   <ul className={`${Style.steps_list}`}>
//                     <li className={`${Style.steps_item}`}>
//                       <span className={`${Style.countCurr}`}>1</span>
//                       <span className={`${Style.infoCurr}`}>Personal info</span>
//                     </li>
//                     <li className={`${Style.steps_item}`}>
//                       <span className={`${Style.count}`}>2</span>
//                       <span className={`${Style.info}`}>Service info</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <h5>Select Service Criteria</h5>
//                       {criteriaList.length > 0 ? (
//                         <select
//                           name="criteriaId"
//                           id="criteriaId"
//                           className="rounded-2 w-100"
//                           value={formValues.criteriaId}
//                           onChange={handleCriteriaChange}
//                         >
//                           <option value=""></option>
//                           {criteriaList.map((criteria) => (
//                             <option
//                               key={criteria.criteriaID}
//                               value={criteria.criteriaID}
//                             >
//                               {criteria.criteriaName}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <p>No criteria with available services.</p>
//                       )}
//                       <h5 className="mt-2">Select service</h5>
//                       {servicesList.length > 0 ? (
//                         <select
//                           name="serviceId"
//                           id="serviceId"
//                           className="rounded-2 w-100"
//                           placeholder="service"
//                           value={formValues.serviceId}
//                           onChange={handleInputChange}
//                         >
//                           <option value=""></option>
//                           {servicesList.map((serviceItem) => (
//                             <option
//                               key={serviceItem.serviceID}
//                               value={serviceItem.serviceID}
//                             >
//                               {serviceItem.serviceName}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <p>No services available for the selected criteria.</p>
//                       )}
//                     </div>
//                     <div className="col-md-12">
//                       <h5 className="mt-2">Service Price</h5>
//                       <input
//                         type="number"
//                         className="rounded-2 w-100"
//                         placeholder="First name"
//                         id="Price"
//                         name="Price"
//                         value={formValues.Price}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="col-md-12 py-3">
//                       <button
//                         type="submit"
//                         className={`btn   ${Style.btnMain} w-100`}
//                         disabled={isLoading}
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div>
//         <img src={downCorner} className={`${Style.corner2}`} />
//       </div>
//     </>
//   );
// }

// export default ServicReg;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Style from "./ServiceReg.module.css";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import { useLocation } from "react-router-dom";
import upperCorner2 from "../../assets/upperCorner2.png";
import upperCorner from "../../assets/upperCorner.png";
import downCorner from "../../assets/downCorner.png";
import logo from "../../assets/logo.png";

function ServicReg() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [criteriaList, setCriteriaList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [childServices, setChildServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    serviceId: "",
    Price: 0,
    childServicePrices: {},
  });
  const location = useLocation();
  let workerId = location.state?.workerIdProp;
  console.log("id", workerId);
  if (!workerId) {
    workerId = "a9954788-6b1f-4deb-b262-66718c0fd89e";
  }

  async function registerForm() {
    setIsLoading(true);
    try {
      // Register parent service
      const response1 = await axios.post(
        `https://localhost:7188/api/ServiceProvider/RegisterService?workerId=${workerId}&serviceId=${formValues.serviceId}&price=${formValues.Price}`
      );
  
      // Check if parent service registration was successful
      if (response1.status >= 200 && response1.status < 300) {
        // Loop through each selected child service and register it
        for (const [childServiceID, price] of Object.entries(
          formValues.childServicePrices
        )) {
          if (price !== null) {
            await axios.post(
              `https://localhost:7188/api/ServiceProvider/RegisterService?workerId=${workerId}&serviceId=${childServiceID}&price=${price}`
            );
          }
        }
  
        // Registration successful, navigate to the waiting page
        setIsLoading(false);
        console.log("Parent and child services registered successfully.");
        navigate("/provider/waiting");
        
      } else {
        throw new Error(`Parent service registration failed: ${response1.data.message}`);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "An error occurred during registration.");
      console.log(err);
    }
  }
  

  async function fetchCriteria() {
    try {
      const response = await axios.get(
        "https://localhost:7188/api/Criteria/GetAll"
      );

      if (response.status >= 200 && response.status < 300) {
        const filteredCriteria = response.data.payload.filter(
          (criteria) => criteria.services.length > 0
        );

        setCriteriaList(filteredCriteria);

        if (filteredCriteria.length > 0) {
          setServicesList(filteredCriteria[0].services);
          setFormValues((prevValues) => ({
            ...prevValues,
            criteriaId: filteredCriteria[0].criteriaID,
          }));
        }
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching criteria:", error);
    }
  }

  async function fetchChildServices(serviceId) {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/services/GetAllChildForService?serviceId=${serviceId}`
      );
      if (response.status >= 200 && response.status < 300) {
        setChildServices(response.data.payload.children);
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching child services:", error);
    }
  }

  useEffect(() => {
    fetchCriteria();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChildServicePriceChange = (childServiceID, price) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      childServicePrices: {
        ...prevValues.childServicePrices,
        [childServiceID]: price,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    registerForm();
  };

  const handleCriteriaChange = (e) => {
    const selectedCriteriaId = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      criteriaId: selectedCriteriaId,
    }));

    const selectedCriteria = criteriaList.find(
      (criteria) => criteria.criteriaID === selectedCriteriaId
    );

    if (selectedCriteria) {
      setServicesList(selectedCriteria.services);
    } else {
      setServicesList([]);
    }
    console.log(selectedCriteria);
    console.log(servicesList);
  };

  const handleServiceChange = (e) => {
    const selectedServiceId = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      serviceId: selectedServiceId,
    }));
    fetchChildServices(selectedServiceId);
  };

  return (
    <>
      <div className={`${Style.corners}`}>
        <img src={upperCorner2} className={`${Style.corner3}`} />
        <img src={upperCorner} className={`${Style.corner}`} />
      </div>
      <section className={` ${Style.signUpPage}`}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-item-center mb-5 ">
            <div className="col-md-12">
              <p className={`${Style.bigHead}`}>ADD SERVICE</p>
              <p className={`${Style.smallHead}`}>ADD SERVICE</p>
              <p className={`${Style.desc}`}>Add service you want to serve</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src={logo} className={`${Style.imgo} img-fluid  h-60 `} />
            </div>
            <div className="col-md-6">
              <div className={` ${Style.signUpForm} p-4 rounded-3`}>
                <div className="d-flex justify-content-center align-item-center">
                  <ul className={`${Style.steps_list}`}>
                    <li className={`${Style.steps_item}`}>
                      <span className={`${Style.countCurr}`}>1</span>
                      <span className={`${Style.infoCurr}`}>Personal info</span>
                    </li>
                    <li className={`${Style.steps_item}`}>
                      <span className={`${Style.count}`}>2</span>
                      <span className={`${Style.info}`}>Service info</span>
                    </li>
                  </ul>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Select Service Criteria</h5>
                      {criteriaList.length > 0 ? (
                        <select
                          name="criteriaId"
                          id="criteriaId"
                          className="rounded-2 w-100"
                          value={formValues.criteriaId}
                          onChange={handleCriteriaChange}
                        >
                          <option value=""></option>
                          {criteriaList.map((criteria) => (
                            <option
                              key={criteria.criteriaID}
                              value={criteria.criteriaID}
                            >
                              {criteria.criteriaName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>No criteria with available services.</p>
                      )}
                      <h5 className="mt-2">Select service</h5>
                      {servicesList.length > 0 ? (
                        <select
                          name="serviceId"
                          id="serviceId"
                          className="rounded-2 w-100"
                          placeholder="service"
                          value={formValues.serviceId}
                          onChange={handleServiceChange}
                        >
                          <option value=""></option>
                          {servicesList.map((serviceItem) => (
                            <option
                              key={serviceItem.serviceID}
                              value={serviceItem.serviceID}
                            >
                              {serviceItem.serviceName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>No services available for the selected criteria.</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <h5 className="mt-2">Service Price</h5>
                      <input
                        type="number"
                        className="rounded-2 w-100"
                        placeholder="Service price"
                        id="Price"
                        name="Price"
                        value={formValues.Price}
                        onChange={handleInputChange}
                      />
                    </div>

                    {childServices.length > 0 && (
                      <div className="col-md-12 mt-3">
                        <h5>Child Services</h5>
                        {childServices.map((childService) => (
                          <div key={childService.childServiceID}>
                            <label>
                              <input
                                type="checkbox"
                                name={`childService_${childService.childServiceID}`}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleChildServicePriceChange(
                                      childService.childServiceID,
                                      ""
                                    );
                                  } else {
                                    handleChildServicePriceChange(
                                      childService.childServiceID,
                                      null
                                    );
                                  }
                                }}
                              />
                              {childService.childServiceName}
                            </label>
                            {formValues.childServicePrices[
                              childService.childServiceID
                            ] !== undefined && (
                              <input
                                type="number"
                                className="rounded-2 w-100"
                                placeholder="Child service price"
                                value={
                                  formValues.childServicePrices[
                                    childService.childServiceID
                                  ]
                                }
                                onChange={(e) =>
                                  handleChildServicePriceChange(
                                    childService.childServiceID,
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`${Style.btnSubmit} btn w-100 rounded-2 mt-4`}
                  >
                    {isLoading ? (
                      <Audio
                        height="50"
                        width="50"
                        radius="9"
                        color="white"
                        ariaLabel="loading"
                      />
                    ) : (
                      <button
                            type="submit"
                            className={`btn ${Style.btnMain} w-100`}
                          >
                            submit
                          </button>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`${Style.corners}`}>
        <img src={downCorner} className={`${Style.corner2}`} />
      </div>
    </>
  );
}

export default ServicReg;
