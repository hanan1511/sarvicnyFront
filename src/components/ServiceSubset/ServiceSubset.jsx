import React, { useState, useEffect } from "react";
import Style from "./ServiceSubset.module.css";
import { useParams } from "react-router-dom";
import Mission from "../Mission/Mission.jsx";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const iconMapping = {
  1: <i className="fa-solid fa-bath fs-1 my-4 text-primary"></i>,
  2: <i className="fa-solid fa-toilet fs-1 my-4 text-primary"></i>,
  3: <i className="fa-solid fa-wrench fs-1 my-4 text-primary"></i>
};

export default function ServiceSubset() {
  // const { id } = useParams();
  let { state } = useLocation();
  const [services,setService]=useState(null);
  const navigate=useNavigate();
  async function getServices(){
    const response=await axios.get(`https://localhost:7188/api/services/GetAllChildForService?serviceId=${state.service.serviceId}`);
    setService(response.data.payload.children);
    console.log(response.data.payload.children);
  }

  const [addedServices, setAddedServices] = useState([]);

  useEffect(() => {
    getServices();
    const storedServices = JSON.parse(localStorage.getItem("addedServices")) || [];
    setAddedServices(storedServices);
  }, []);

  const addService = (service) => {
    // Check if the service already exists in the addedServices array
    const serviceExists = addedServices.some(
      (addedService) => addedService.childServiceID === service.childServiceID
    );
  
    if (!serviceExists) {
      const updatedServices = [...addedServices, service];
      setAddedServices(updatedServices);
      localStorage.setItem("addedServices", JSON.stringify(updatedServices));
      console.log(localStorage.getItem("addedServices"));
    } else {
      console.log('Service already added');
      window.alert('Service already added');
    }
  };
  

  const removeService = (serviceID) => {
    const updatedServices = addedServices.filter(service => service.serviceID !== serviceID);
    setAddedServices(updatedServices);
    localStorage.setItem("addedServices", JSON.stringify(updatedServices));
    console.log(localStorage.getItem("addedServices"));
  };

  function navig(){
    navigate('/service',{state:{services:addedServices,criteria:state.criteriaName,parent:state.service.serviceName}});
  }

  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-4 rounded-2">
          <div className="row">
            <div className="col-md-12">
              <div>
                <h5 className=" fs-1">Added Services</h5>
              </div>
            </div>
            {addedServices.map((service) => (
              <div key={service.childServiceID} className={`col-md-3 mt-4 p-3 rounded-2 ${Style.subset} mx-2`}>
                <h2 className="card-title my-2">{service.childServiceName}</h2>
                {/* <p className="card-text">{service.description}</p> */}
                <i
                  className="fa-regular fa-circle-xmark deletion"
                  onClick={() => removeService(service.serviceID)}
                ></i>
              </div>
            ))}
            {addedServices.length > 0 && (
              <div className="col-md-12 mt-4">
                <button className="btn btn-primary" onClick={()=> navig()}>Proceed</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          {services ? (
            <div className="row">
              <div className="col-md-12">
                <div>
                  <h1 className="fw-bolder fs-1">{state.criteriaName}</h1>
                </div>
              </div>
              {services.map((service) => (
                <div key={service.childServiceID} className="col-md-4 mt-5 text-center">
                  {iconMapping[service.childServiceID]}
                  <h2 className="card-title my-2">{service.childServiceName}</h2>
                  {/* <p className="card-text">{service.description}</p> */}
                  <button
                    className="btn w-100 btn-outline-primary"
                    onClick={() => addService(service)}
                  >
                    Add Me please
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>is loading.......</div>
          )}
        </div>
      </section>
      <Mission/>
    </>
  );
}
